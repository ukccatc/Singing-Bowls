// Google Drive API integration for media management
// This file provides functionality to upload, manage, and retrieve files from Google Drive

// Extend Window interface to include gapi
declare global {
  interface Window {
    gapi?: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (config: any) => Promise<void>;
      };
      auth2: {
        getAuthInstance: () => {
          isSignedIn: {
            get: () => boolean;
          };
          signIn: () => Promise<any>;
          signOut: () => Promise<void>;
          currentUser: {
            get: () => {
              getAuthResponse: () => {
                access_token: string;
              };
            };
          };
        };
      };
    };
  }
}

export interface GoogleDriveConfig {
  clientId: string;
  clientSecret: string;
  apiKey: string;
  scope: string;
  discoveryDocs: string[];
}

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: string;
  webViewLink: string;
  webContentLink: string;
  thumbnailLink?: string;
  parents: string[];
  createdTime: string;
  modifiedTime: string;
  description?: string;
}

export interface GoogleDriveUploadOptions {
  file: File | Buffer;
  name: string;
  mimeType: string;
  description?: string;
  folderId?: string;
  parents?: string[];
}

export class GoogleDriveManager {
  private config: GoogleDriveConfig;
  private accessToken: string | null = null;

  constructor(config: GoogleDriveConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    try {
      await this.loadGoogleAPI();
      await this.authenticate();
    } catch (error) {
      console.error('Failed to initialize Google Drive:', error);
      throw error;
    }
  }

  private async loadGoogleAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && !window.gapi) {
        // Load Google API script
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
          window.gapi?.load('client:auth2', () => {
            window.gapi?.client.init({
              clientId: this.config.clientId,
              apiKey: this.config.apiKey,
              discoveryDocs: this.config.discoveryDocs,
              scope: this.config.scope,
            }).then(() => {
              resolve();
            }).catch(reject);
          });
        };
        script.onerror = reject;
        document.head.appendChild(script);
      } else {
        resolve();
      }
    });
  }

  async authenticate(): Promise<string> {
    if (typeof window === 'undefined') {
      throw new Error('Google Drive authentication is only available in browser environment');
    }

    if (!window.gapi) {
      throw new Error('Google API not loaded');
    }

    const authInstance = window.gapi.auth2.getAuthInstance();
    
    if (!authInstance.isSignedIn.get()) {
      await authInstance.signIn();
    }

    const user = authInstance.currentUser.get();
    if (user) {
      this.accessToken = user.getAuthResponse().access_token;
    }

    if (!this.accessToken) {
      throw new Error('Failed to get access token');
    }

    return this.accessToken;
  }

  async uploadFile(options: GoogleDriveUploadOptions): Promise<GoogleDriveFile> {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }

    const metadata = {
      name: options.name,
      mimeType: options.mimeType,
      description: options.description || '',
      parents: options.folderId ? [options.folderId] : options.parents || [],
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    
    // Handle both File and Buffer types
    if (options.file instanceof File) {
      form.append('file', options.file);
    } else if (Buffer.isBuffer(options.file)) {
      // Convert Buffer to Blob
      const blob = new Blob([options.file], { type: options.mimeType });
      form.append('file', blob, options.name);
    } else {
      throw new Error('Unsupported file type. Expected File or Buffer.');
    }

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
      body: form,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return this.mapToGoogleDriveFile(result);
  }

  async makeFilePublic(fileId: string): Promise<void> {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }

    const permission = {
      type: 'anyone',
      role: 'reader',
    };

    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(permission),
    });

    if (!response.ok) {
      throw new Error(`Failed to make file public: ${response.statusText}`);
    }
  }

  async getFile(fileId: string): Promise<GoogleDriveFile> {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }

    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?fields=id,name,mimeType,size,webViewLink,webContentLink,thumbnailLink,parents,createdTime,modifiedTime,description`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get file: ${response.statusText}`);
    }

    const result = await response.json();
    return this.mapToGoogleDriveFile(result);
  }

  async listFiles(folderId?: string, query?: string): Promise<GoogleDriveFile[]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }

    let url = 'https://www.googleapis.com/drive/v3/files?fields=files(id,name,mimeType,size,webViewLink,webContentLink,thumbnailLink,parents,createdTime,modifiedTime,description)';
    
    if (folderId) {
      url += `&q='${folderId}' in parents`;
    }
    
    if (query) {
      url += `&q=${encodeURIComponent(query)}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to list files: ${response.statusText}`);
    }

    const result = await response.json();
    return result.files.map((file: any) => this.mapToGoogleDriveFile(file));
  }

  async deleteFile(fileId: string): Promise<void> {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }

    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete file: ${response.statusText}`);
    }
  }

  getDownloadUrl(fileId: string): string {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  getThumbnailUrl(fileId: string, size: 'small' | 'medium' | 'large' = 'medium'): string {
    const sizeMap = {
      small: 's',
      medium: 'm',
      large: 'l',
    };
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=${sizeMap[size]}`;
  }

  async createFolder(name: string, parentFolderId?: string): Promise<GoogleDriveFile> {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }

    const metadata = {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId ? [parentFolderId] : [],
    };

    const response = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      throw new Error(`Failed to create folder: ${response.statusText}`);
    }

    const result = await response.json();
    return this.mapToGoogleDriveFile(result);
  }

  isAuthenticated(): boolean {
    return this.accessToken !== null;
  }

  async signOut(): Promise<void> {
    if (typeof window !== 'undefined' && window.gapi) {
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
    }
    this.accessToken = null;
  }

  private mapToGoogleDriveFile(file: any): GoogleDriveFile {
    return {
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      size: file.size || '0',
      webViewLink: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`,
      webContentLink: file.webContentLink || `https://drive.google.com/uc?export=download&id=${file.id}`,
      thumbnailLink: file.thumbnailLink || this.getThumbnailUrl(file.id),
      parents: file.parents || [],
      createdTime: file.createdTime,
      modifiedTime: file.modifiedTime,
      description: file.description || '',
    };
  }
}

// Utility functions
export const googleDriveUtils = {
  // Get file extension from MIME type
  getFileExtension(mimeType: string): string {
    const extensions: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'video/mp4': 'mp4',
      'video/webm': 'webm',
      'audio/mpeg': 'mp3',
      'audio/wav': 'wav',
      'audio/ogg': 'ogg',
      'application/pdf': 'pdf',
    };
    return extensions[mimeType] || 'bin';
  },

  // Format file size
  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  },

  // Validate file type
  isValidFileType(mimeType: string, allowedTypes: string[]): boolean {
    return allowedTypes.includes(mimeType);
  },

  // Get file type category
  getFileTypeCategory(mimeType: string): 'image' | 'video' | 'audio' | 'document' | 'other' {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('application/')) return 'document';
    return 'other';
  },

  // Generate unique filename
  generateUniqueFilename(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop();
    const nameWithoutExtension = originalName.replace(/\.[^/.]+$/, '');
    return `${nameWithoutExtension}_${timestamp}_${random}.${extension}`;
  },
};

// Singleton instance
let googleDriveInstance: GoogleDriveManager | null = null;

export const getGoogleDriveInstance = (config?: GoogleDriveConfig): GoogleDriveManager => {
  if (!googleDriveInstance && config) {
    googleDriveInstance = new GoogleDriveManager(config);
  }
  
  if (!googleDriveInstance) {
    throw new Error('Google Drive not initialized. Call getGoogleDriveInstance(config) first.');
  }
  
  return googleDriveInstance;
};
