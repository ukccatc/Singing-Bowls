'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Product } from '@/lib/types';
import { Filter, Search, X } from 'lucide-react';

export interface FilterOptions {
  search: string;
  category: string[];
  priceRange: [number, number];
  materials: string[];
  inStockOnly: boolean;
  handmadeOnly: boolean;
  sortBy: string;
}

interface ShopFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  products: Product[];
  locale: string;
}

export function ShopFilters({ filters, onFiltersChange, products, locale }: ShopFiltersProps) {
  // Extract unique values from products
  const categories = Array.from(new Set(products.map(p => p.category)));
  const materials = Array.from(new Set(products.flatMap(p => p.materials || [])));
  const maxPrice = Math.max(...products.map(p => p.price));

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      category: [],
      priceRange: [0, maxPrice],
      materials: [],
      inStockOnly: false,
      handmadeOnly: false,
      sortBy: 'popularity',
    });
  };

  const hasActiveFilters = 
    filters.search ||
    filters.category.length > 0 ||
    filters.materials.length > 0 ||
    filters.inStockOnly ||
    filters.handmadeOnly ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < maxPrice;

  return (
    <Card className="card-metal">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-charcoal-900">
            <Filter className="h-5 w-5 text-gold-600" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-charcoal-500 hover:text-charcoal-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-charcoal-700">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-400" />
            <Input
              id="search"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="input-metal pl-10"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <Label htmlFor="sort" className="text-charcoal-700">Sort by</Label>
          <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
            <SelectTrigger className="input-metal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
              <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
              <SelectItem value="nameAZ">Name: A to Z</SelectItem>
              <SelectItem value="nameZA">Name: Z to A</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <Label className="text-charcoal-700">Categories</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.category.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilter('category', [...filters.category, category]);
                    } else {
                      updateFilter('category', filters.category.filter(c => c !== category));
                    }
                  }}
                  className="text-gold-600 border-charcoal-300 focus:ring-gold-200"
                />
                <Label htmlFor={`category-${category}`} className="text-sm font-normal text-charcoal-700">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-charcoal-700">Price Range</Label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value)}
              max={maxPrice}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-charcoal-600 mt-2">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Materials */}
        {materials.length > 0 && (
          <div className="space-y-3">
            <Label className="text-charcoal-700">Materials</Label>
            <div className="space-y-2">
              {materials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={`material-${material}`}
                    checked={filters.materials.includes(material)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilter('materials', [...filters.materials, material]);
                      } else {
                        updateFilter('materials', filters.materials.filter(m => m !== material));
                      }
                    }}
                    className="text-bronze-600 border-charcoal-300 focus:ring-bronze-200"
                  />
                  <Label htmlFor={`material-${material}`} className="text-sm font-normal text-charcoal-700">
                    {material}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Options */}
        <div className="space-y-3">
          <Label className="text-charcoal-700">Options</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStockOnly"
                checked={filters.inStockOnly}
                onCheckedChange={(checked) => updateFilter('inStockOnly', checked)}
                className="text-copper-600 border-charcoal-300 focus:ring-copper-200"
              />
              <Label htmlFor="inStockOnly" className="text-sm font-normal text-charcoal-700">
                In Stock Only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="handmadeOnly"
                checked={filters.handmadeOnly}
                onCheckedChange={(checked) => updateFilter('handmadeOnly', checked)}
                className="text-gold-600 border-charcoal-300 focus:ring-gold-200"
              />
              <Label htmlFor="handmadeOnly" className="text-sm font-normal text-charcoal-700">
                Handmade Only
              </Label>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-charcoal-700">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge className="badge-gold text-xs">
                  Search: {filters.search}
                </Badge>
              )}
              {filters.category.map((cat) => (
                <Badge key={cat} className="badge-bronze text-xs">
                  {cat}
                </Badge>
              ))}
              {filters.materials.map((mat) => (
                <Badge key={mat} className="badge-copper text-xs">
                  {mat}
                </Badge>
              ))}
              {filters.inStockOnly && (
                <Badge className="badge-gold text-xs">
                  In Stock
                </Badge>
              )}
              {filters.handmadeOnly && (
                <Badge className="badge-bronze text-xs">
                  Handmade
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
