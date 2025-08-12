'use client';

import ProductCard from '@/components/product/ProductCard';
import { ShopFilters } from '@/components/shop/ShopFilters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProductFilters } from '@/hooks/useProductFilters';
import { t } from '@/lib/translations';
import { Locale, Product } from '@/lib/types';
import { Filter, Grid, List } from 'lucide-react';
import { useState } from 'react';

interface ShopPageClientProps {
  locale: Locale;
  products: Product[];
}

export default function ShopPageClient({ locale, products }: ShopPageClientProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Use the filter hook
  const { filters, filteredProducts, updateFilters } = useProductFilters(products);

  return (
    <div className="min-h-screen bg-metal-light">
      {/* Header */}
      <section className="bg-gradient-to-br from-gold-50 via-bronze-50 to-copper-50 py-12 relative overflow-hidden">
        {/* Metal texture overlay */}
        <div className="absolute inset-0 bg-metal-texture opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gradient-gold mb-4 font-serif">
              {t('shop.title', locale)}
            </h1>
            <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
              {t('shop.subtitle', locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80">
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-outline w-full"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
              
              <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                <ShopFilters
                  filters={filters}
                  onFiltersChange={updateFilters}
                  products={products}
                  locale={locale}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-charcoal-900">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                  </h2>
                  {filters.search && (
                    <Badge className="badge-gold">
                      Search: "{filters.search}"
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'btn-primary' : 'btn-outline'}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }>
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      locale={locale}
                      showAudio={true}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Filter className="h-8 w-8 text-charcoal-400" />
                    </div>
                    <h3 className="text-lg font-medium text-charcoal-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-charcoal-600 mb-4">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <Button
                      variant="outline"
                      className="btn-outline"
                      onClick={() => updateFilters({
                        search: '',
                        category: [],
                        priceRange: [0, Math.max(...products.map(p => p.price))],
                        materials: [],
                        inStockOnly: false,
                        handmadeOnly: false,
                        sortBy: 'popularity',
                      })}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
