'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Plus, X, Upload } from 'lucide-react';
import { ProductCategory } from '@/lib/types';

export default function NewProduct() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    stock: '',
    images: [] as any[],
    specifications: [] as any[],
    tags: [] as string[],
  });

  const [newTag, setNewTag] = useState('');
  const [newSpecName, setNewSpecName] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // В реальном проекте здесь будет API call
      console.log('Creating product:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to products list
      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600">Create a new product for your catalog</p>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? 'Creating...' : 'Create Product'}
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
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', e.target.value)}
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

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>Upload product images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Drag and drop images here, or click to select</p>
              <Button type="button" variant="outline" className="mt-2">
                Select Images
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
