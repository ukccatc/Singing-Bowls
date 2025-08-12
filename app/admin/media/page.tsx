'use client';

import { MediaEmbed } from '@/components/media/MediaEmbed';
import { MediaGallery } from '@/components/media/MediaGallery';
import { MediaUploader } from '@/components/media/MediaUploader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MediaFile } from '@/lib/media-manager';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Mock data for demonstration
const mockMedia: MediaFile[] = [
  {
    id: '1',
    type: 'image',
    title: 'Himalayan Singing Bowl - Traditional',
    description: 'Authentic handcrafted singing bowl from Nepal',
    url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop',
    platform: 'cdn',
    thumbnail: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop',
    size: 2048576,
    metadata: {
      width: 800,
      height: 600,
      format: 'jpg',
      tags: ['singing bowl', 'himalayan', 'meditation', 'traditional'],
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    type: 'audio',
    title: 'Singing Bowl Meditation Sound',
    description: 'Peaceful meditation sound from 7-metal singing bowl',
    url: 'https://soundcloud.com/example/singing-bowl-meditation',
    platform: 'soundcloud',
    thumbnail: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop',
    duration: 180,
    size: 5242880,
    metadata: {
      trackId: '123456789',
      streamUrl: 'https://soundcloud.com/example/singing-bowl-meditation',
      tags: ['meditation', 'sound healing', 'singing bowl', 'relaxation'],
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    type: 'video',
    title: 'How to Use Your Singing Bowl',
    description: 'Complete tutorial on proper singing bowl technique',
    url: 'https://www.youtube.com/watch?v=example',
    platform: 'youtube',
    thumbnail: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop',
    duration: 420,
    size: 10485760,
    metadata: {
      videoId: 'example123',
      channelId: 'UC123456789',
      tags: ['tutorial', 'how-to', 'singing bowl', 'technique'],
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

export default function MediaManagementPage() {
  const [media, setMedia] = useState<MediaFile[]>(mockMedia);
  const [filteredMedia, setFilteredMedia] = useState<MediaFile[]>(mockMedia);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);

  // Filter media based on search and filters
  useEffect(() => {
    let filtered = media;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.metadata?.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    // Filter by platform
    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(item => item.platform === selectedPlatform);
    }

    setFilteredMedia(filtered);
  }, [media, searchTerm, selectedType, selectedPlatform]);

  const handleUploadComplete = (newMedia: MediaFile) => {
    setMedia(prev => [newMedia, ...prev]);
    toast.success('Media uploaded successfully!');
  };

  const handleDeleteMedia = (deletedMedia: MediaFile) => {
    setMedia(prev => prev.filter(item => item.id !== deletedMedia.id));
    if (selectedMedia?.id === deletedMedia.id) {
      setSelectedMedia(null);
    }
  };

  const handleEditMedia = (media: MediaFile) => {
    setSelectedMedia(media);
    // In a real app, you would open an edit modal or navigate to edit page
    toast.info('Edit functionality would open here');
  };

  const getStats = () => {
    const total = media.length;
    const images = media.filter(item => item.type === 'image').length;
    const videos = media.filter(item => item.type === 'video').length;
    const audio = media.filter(item => item.type === 'audio').length;
    const totalSize = media.reduce((sum, item) => sum + (item.size || 0), 0);

    return { total, images, videos, audio, totalSize };
  };

  const stats = getStats();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your media files across different platforms
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Media</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm">📁</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Images</p>
                <p className="text-2xl font-bold text-gray-900">{stats.images}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-sm">🖼️</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Videos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.videos}</p>
              </div>
              <div className="h-8 w-8 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 text-sm">🎥</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Audio</p>
                <p className="text-2xl font-bold text-gray-900">{stats.audio}</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-sm">🎵</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gallery" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gallery">Media Gallery</TabsTrigger>
          <TabsTrigger value="upload">Upload Media</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search media..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="cdn">CDN</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="soundcloud">SoundCloud</SelectItem>
                    <SelectItem value="vimeo">Vimeo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Media Gallery */}
          <MediaGallery
            media={filteredMedia}
            onDelete={handleDeleteMedia}
            onEdit={handleEditMedia}
          />
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MediaUploader
              onUploadComplete={handleUploadComplete}
              allowedTypes={['image', 'video', 'audio']}
              maxFileSize={100 * 1024 * 1024} // 100MB
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Upload Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Recommended Platforms</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>Images:</strong> CDN (Cloudinary) for optimal performance</li>
                    <li>• <strong>Videos:</strong> YouTube for global delivery and SEO</li>
                    <li>• <strong>Audio:</strong> SoundCloud for streaming and sharing</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">File Size Limits</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>Images:</strong> Up to 10MB</li>
                    <li>• <strong>Videos:</strong> Up to 100MB</li>
                    <li>• <strong>Audio:</strong> Up to 500MB</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Supported Formats</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>Images:</strong> JPG, PNG, GIF, WebP</li>
                    <li>• <strong>Videos:</strong> MP4, AVI, MOV, WMV, FLV</li>
                    <li>• <strong>Audio:</strong> MP3, WAV, OGG, M4A, FLAC</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          {selectedMedia ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Media Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <MediaEmbed
                    media={selectedMedia}
                    width={800}
                    height={450}
                    controls={true}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Media Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Title</p>
                      <p className="text-gray-900">{selectedMedia.title}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Type</p>
                      <Badge variant="secondary">{selectedMedia.type}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Platform</p>
                      <Badge variant="secondary">{selectedMedia.platform}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Size</p>
                      <p className="text-gray-900">
                        {selectedMedia.size ? `${(selectedMedia.size / 1024 / 1024).toFixed(2)} MB` : 'Unknown'}
                      </p>
                    </div>
                    {selectedMedia.duration && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Duration</p>
                        <p className="text-gray-900">
                          {Math.floor(selectedMedia.duration / 60)}:{(selectedMedia.duration % 60).toString().padStart(2, '0')}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-600">Created</p>
                      <p className="text-gray-900">
                        {selectedMedia.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {selectedMedia.description && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-600">Description</p>
                      <p className="text-gray-900">{selectedMedia.description}</p>
                    </div>
                  )}
                  
                  {selectedMedia.metadata?.tags && selectedMedia.metadata.tags.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedMedia.metadata.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">Select a media item from the gallery to preview it here</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
