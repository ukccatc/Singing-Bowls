'use client';

import { MediaEmbed } from '@/components/media/MediaEmbed';
import { MediaUploader } from '@/components/media/MediaUploader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { sampleProducts } from '@/lib/data/products';
import { MediaFile } from '@/lib/media-manager';
import { ProductAudio, ProductCategory, ProductVideo } from '@/lib/types';
import { extractYouTubeVideoId, isValidYouTubeUrl } from '@/lib/utils';
import { ArrowLeft, Image, Music, Plus, Save, Video, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: {
      en: '',
      ru: '',
      uk: '',
    },
    description: {
      en: '',
      ru: '',
      uk: '',
    },
    slug: '',
    price: '',
    currency: 'USD',
    category: ProductCategory.SINGING_BOWLS,
    inventory: '',
    images: [] as any[],
    specifications: [] as any[],
    tags: [] as string[],
    // New media fields
    youtubeVideo: null as ProductVideo | null,
    soundcloudAudio: null as ProductAudio | null,
    youtubeUrl: '', // New field for YouTube URL
  });

  const [newTag, setNewTag] = useState('');
  const [newSpecName, setNewSpecName] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  useEffect(() => {
    // Find the product by ID
    const foundProduct = sampleProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setFormData({
        name: {
          en: foundProduct.name.en || '',
          ru: foundProduct.name.ru || '',
          uk: foundProduct.name.uk || '',
        },
        description: {
          en: foundProduct.description.en || '',
          ru: foundProduct.description.ru || '',
          uk: foundProduct.description.uk || '',
        },
        slug: foundProduct.slug,
        price: foundProduct.price.toString(),
        currency: foundProduct.currency,
        category: foundProduct.category,
        inventory: foundProduct.inventory.toString(),
        images: foundProduct.images,
        specifications: foundProduct.specifications,
        tags: foundProduct.tags,
        // Load media data
        youtubeVideo: foundProduct.youtubeVideo || null,
        soundcloudAudio: foundProduct.soundcloudAudio || null,
      });
    }
  }, [productId]);

  const handleInputChange = (field: string, value: string, locale?: string) => {
    if (locale) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...(prev[field as keyof typeof prev] as any),
          [locale]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addSpecification = () => {
    if (newSpecName.trim() && newSpecValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: [...prev.specifications, {
          name: { en: newSpecName.trim(), ru: '', uk: '' },
          value: { en: newSpecValue.trim(), ru: '', uk: '' },
          unit: ''
        }]
      }));
      setNewSpecName('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  // Media handling functions
  const handleYouTubeUrl = () => {
    const url = formData.youtubeUrl.trim();
    if (!url) return;
    
    if (!isValidYouTubeUrl(url)) {
      alert('Please enter a valid YouTube URL');
      return;
    }
    
    const videoId = extractYouTubeVideoId(url);
    if (!videoId) {
      alert('Could not extract video ID from URL');
      return;
    }
    
    const video: ProductVideo = {
      id: `youtube_${videoId}`,
      videoId: videoId,
      title: `YouTube Video ${videoId}`,
      description: 'Product demonstration video',
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      duration: '',
      url: `https://www.youtube.com/watch?v=${videoId}`,
      platform: 'youtube',
      isEmbeddable: true,
      privacyStatus: 'public',
      createdAt: new Date().toISOString(),
    };
    
    setFormData(prev => ({
      ...prev,
      youtubeVideo: video,
      youtubeUrl: '' // Clear the input after processing
    }));
  };

  const handleSoundCloudUpload = (media: MediaFile) => {
    const audio: ProductAudio = {
      id: media.id,
      trackId: media.metadata?.trackId || media.id,
      title: media.title,
      description: media.description,
      streamUrl: media.url,
      artworkUrl: media.thumbnail,
      duration: media.duration || 0,
      genre: 'Meditation',
      tags: media.metadata?.tags || [],
      platform: 'soundcloud',
      isPublic: true,
      downloadable: false,
      createdAt: new Date().toISOString(),
    };
    
    setFormData(prev => ({
      ...prev,
      soundcloudAudio: audio
    }));
  };

  const handleImageUpload = (media: MediaFile) => {
    const image = {
      id: media.id,
      url: media.url,
      alt: { en: media.title, ru: '', uk: '' },
      width: 800,
      height: 600,
      isPrimary: formData.images.length === 0,
      is360: false,
    };
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, image]
    }));
  };

  const removeYouTubeVideo = () => {
    setFormData(prev => ({
      ...prev,
      youtubeVideo: null
    }));
  };

  const removeSoundCloudAudio = () => {
    setFormData(prev => ({
      ...prev,
      soundcloudAudio: null
    }));
  };

  const removeImage = (imageId: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // В реальном проекте здесь будет API call
      console.log('Updating product:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to products list
      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500">Product not found</p>
          <Button onClick={() => router.push('/admin/products')} className="mt-2">
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600">Update product information</p>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential product details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name-en">Product Name (English)</Label>
                <Input
                  id="name-en"
                  value={formData.name.en}
                  onChange={(e) => handleInputChange('name', e.target.value, 'en')}
                  placeholder="Enter product name in English"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name-ru">Product Name (Russian)</Label>
                <Input
                  id="name-ru"
                  value={formData.name.ru}
                  onChange={(e) => handleInputChange('name', e.target.value, 'ru')}
                  placeholder="Enter product name in Russian"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name-uk">Product Name (Ukrainian)</Label>
              <Input
                id="name-uk"
                value={formData.name.uk}
                onChange={(e) => handleInputChange('name', e.target.value, 'uk')}
                placeholder="Enter product name in Ukrainian"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Product Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="product-slug"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>Detailed product description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description-en">Description (English)</Label>
              <Textarea
                id="description-en"
                value={formData.description.en}
                onChange={(e) => handleInputChange('description', e.target.value, 'en')}
                placeholder="Enter product description in English"
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description-ru">Description (Russian)</Label>
              <Textarea
                id="description-ru"
                value={formData.description.ru}
                onChange={(e) => handleInputChange('description', e.target.value, 'ru')}
                placeholder="Enter product description in Russian"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description-uk">Description (Ukrainian)</Label>
              <Textarea
                id="description-uk"
                value={formData.description.uk}
                onChange={(e) => handleInputChange('description', e.target.value, 'uk')}
                placeholder="Enter product description in Ukrainian"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Inventory</CardTitle>
            <CardDescription>Product pricing and stock information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inventory">Stock Quantity</Label>
                <Input
                  id="inventory"
                  type="number"
                  value={formData.inventory}
                  onChange={(e) => handleInputChange('inventory', e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ProductCategory.SINGING_BOWLS}>Singing Bowls</SelectItem>
                  <SelectItem value={ProductCategory.MEDITATION_BELLS}>Meditation Bells</SelectItem>
                  <SelectItem value={ProductCategory.GONGS}>Gongs</SelectItem>
                  <SelectItem value={ProductCategory.ACCESSORIES}>Accessories</SelectItem>
                  <SelectItem value={ProductCategory.GIFT_SETS}>Gift Sets</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Add tags to help customers find this product</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
            <CardDescription>Add product specifications and details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                value={newSpecName}
                onChange={(e) => setNewSpecName(e.target.value)}
                placeholder="Specification name"
              />
              <Input
                value={newSpecValue}
                onChange={(e) => setNewSpecValue(e.target.value)}
                placeholder="Specification value"
              />
              <Button type="button" onClick={addSpecification} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {formData.specifications.map((spec, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{spec.name.en}</span>
                    <span className="text-gray-500">:</span>
                    <span>{spec.value.en}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpecification(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Media Section */}
        <Card>
          <CardHeader>
            <CardTitle>Product Media</CardTitle>
            <CardDescription>Manage YouTube videos, SoundCloud audio, and product images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* YouTube Video */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-red-500" />
                <h3 className="font-medium">YouTube Video</h3>
              </div>
              {formData.youtubeVideo ? (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{formData.youtubeVideo.title}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeYouTubeVideo}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <MediaEmbed
                    media={{
                      id: formData.youtubeVideo.id,
                      type: 'video',
                      title: formData.youtubeVideo.title,
                      description: formData.youtubeVideo.description,
                      url: formData.youtubeVideo.url,
                      platform: 'youtube',
                      thumbnail: formData.youtubeVideo.thumbnail,
                      duration: formData.youtubeVideo.duration,
                      size: 0,
                      metadata: { videoId: formData.youtubeVideo.videoId },
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    }}
                    width={400}
                    height={225}
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="youtube-url">YouTube Video URL</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="youtube-url"
                        type="url"
                        value={formData.youtubeUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={handleYouTubeUrl}
                        disabled={!formData.youtubeUrl.trim()}
                        variant="outline"
                      >
                        Add Video
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Supports: youtube.com/watch?v=, youtu.be/, youtube.com/embed/
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* SoundCloud Audio */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-orange-500" />
                <h3 className="font-medium">SoundCloud Audio</h3>
              </div>
              {formData.soundcloudAudio ? (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{formData.soundcloudAudio.title}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeSoundCloudAudio}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <MediaEmbed
                    media={{
                      id: formData.soundcloudAudio.id,
                      type: 'audio',
                      title: formData.soundcloudAudio.title,
                      description: formData.soundcloudAudio.description,
                      url: formData.soundcloudAudio.streamUrl,
                      platform: 'soundcloud',
                      thumbnail: formData.soundcloudAudio.artworkUrl,
                      duration: formData.soundcloudAudio.duration,
                      size: 0,
                      metadata: { trackId: formData.soundcloudAudio.trackId },
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    }}
                    width={400}
                    height={166}
                  />
                </div>
              ) : (
                <MediaUploader
                  onUploadComplete={handleSoundCloudUpload}
                  allowedTypes={['audio']}
                  maxFileSize={500 * 1024 * 1024} // 500MB
                />
              )}
            </div>

            <Separator />

            {/* Product Images */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Product Images</h3>
              </div>
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {formData.images.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt={image.alt.en}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImage(image.id)}
                          className="opacity-0 group-hover:opacity-100 text-white hover:text-red-300"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      {image.isPrimary && (
                        <Badge className="absolute top-2 left-2 text-xs">Primary</Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <MediaUploader
                onUploadComplete={handleImageUpload}
                allowedTypes={['image']}
                maxFileSize={10 * 1024 * 1024} // 10MB
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
