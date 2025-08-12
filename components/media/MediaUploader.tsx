'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MediaManager, MediaFile, mediaUtils } from '@/lib/media-manager';

interface MediaUploaderProps {
  onUploadComplete?: (media: MediaFile) => void;
  allowedTypes?: ('image' | 'video' | 'audio')[];
  maxFileSize?: number;
  className?: string;
}

export function MediaUploader({
  onUploadComplete,
  allowedTypes = ['image', 'video', 'audio'],
  maxFileSize = 100 * 1024 * 1024, // 100MB default
  className,
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    isPublic: true,
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Validate file type
    const fileType = mediaUtils.getFileType(file);
    if (!allowedTypes.includes(fileType)) {
      toast.error(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
      return;
    }

    // Validate file size
    if (!mediaUtils.validateFileSize(file, maxFileSize)) {
      toast.error(`File too large. Maximum size: ${mediaUtils.formatFileSize(maxFileSize)}`);
      return;
    }

    // Validate form data
    if (!formData.title.trim()) {
      toast.error('Please enter a title for the media');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Create form data for upload
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('title', formData.title);
      uploadFormData.append('description', formData.description);
      uploadFormData.append('tags', JSON.stringify(formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)));
      uploadFormData.append('public', formData.isPublic.toString());

      // Determine upload endpoint based on file type
      let uploadEndpoint = '';
      switch (fileType) {
        case 'image':
          uploadEndpoint = '/api/media/upload-google-drive';
          break;
        case 'video':
          uploadEndpoint = '/api/media/upload-youtube';
          break;
        case 'audio':
          uploadEndpoint = '/api/media/upload-soundcloud';
          break;
      }

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: uploadFormData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();

      // Create MediaFile object
      const mediaFile: MediaFile = {
        id: result.id || result.videoId || result.trackId,
        type: fileType,
        title: formData.title,
        description: formData.description,
        url: result.url || result.streamUrl || result.webContentLink || result.webViewLink || `https://www.youtube.com/watch?v=${result.videoId}`,
        platform: fileType === 'image' ? 'google-drive' : fileType === 'video' ? 'youtube' : 'soundcloud',
        thumbnail: result.thumbnail || result.artworkUrl || result.thumbnailLink,
        duration: result.duration,
        size: file.size,
        metadata: result.metadata || {
          fileId: result.id,
          videoId: result.videoId,
          trackId: result.trackId,
          webViewLink: result.webViewLink,
          webContentLink: result.webContentLink,
          thumbnailLink: result.thumbnailLink,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      toast.success('Media uploaded successfully!');
      onUploadComplete?.(mediaFile);

      // Reset form
      setFormData({
        title: '',
        description: '',
        tags: '',
        isPublic: true,
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [formData, allowedTypes, maxFileSize, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a', '.flac'],
    },
    maxFiles: 1,
    disabled: uploading,
  });

  const getRecommendedPlatform = (file: File) => {
    const fileType = mediaUtils.getFileType(file);
    return mediaUtils.getRecommendedPlatform(fileType);
  };

  const removeFile = () => {
    // Since acceptedFiles is readonly, we need to trigger a re-render
    // by calling onDrop with an empty array
    onDrop([]);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Media
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-gold bg-gold/10'
              : 'border-gray-300 hover:border-gold'
          } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          {isDragActive ? (
            <p className="text-gold">Drop the file here...</p>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Drag & drop a file here, or click to select
              </p>
              <p className="text-xs text-gray-500">
                Allowed types: {allowedTypes.join(', ')} | Max size: {mediaUtils.formatFileSize(maxFileSize)}
              </p>
            </div>
          )}
        </div>

        {/* Selected File Info */}
        {acceptedFiles.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="text-sm font-medium">{acceptedFiles[0].name}</p>
              <p className="text-xs text-gray-500">
                {mediaUtils.formatFileSize(acceptedFiles[0].size)} • 
                Recommended platform: {getRecommendedPlatform(acceptedFiles[0])}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Upload Form */}
        {acceptedFiles.length > 0 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter media title"
                disabled={uploading}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter media description"
                rows={3}
                disabled={uploading}
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="Enter tags separated by commas"
                disabled={uploading}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                disabled={uploading}
                className="rounded"
              />
              <Label htmlFor="isPublic" className="text-sm">
                Make public
              </Label>
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Uploading to {getRecommendedPlatform(acceptedFiles[0])}...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gold h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{uploadProgress}% complete</p>
              </div>
            )}

            {/* Upload Button */}
            <Button
              onClick={() => onDrop(Array.from(acceptedFiles))}
              disabled={uploading || !formData.title.trim()}
              className="w-full"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Media
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
