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
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-cream-100">
      {/* Header */}
      <section className="bg-gradient-to-br from-gold-50 via-bronze-50 to-copper-50 py-16 lg:py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-bronze-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        
        {/* Metal texture overlay */}
        <div className="absolute inset-0 bg-metal-texture opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gradient-gold mb-6 font-serif animate-fade-in-up">
              {t('shop.title', locale)}
            </h1>
            <p className="text-xl text-charcoal-700 animate-fade-in-up animation-delay-200">
              {t('shop.subtitle', locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80">
              <div className="lg:hidden mb-4 animate-fade-in-left">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-outline w-full shadow-md hover:shadow-lg"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
              
              <div className={`lg:block ${showFilters ? 'block animate-slide-down' : 'hidden'}`}>
                <div className="sticky top-24">
                  <ShopFilters
                    filters={filters}
                    onFiltersChange={updateFilters}
                    products={products}
                    locale={locale}
                  />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in-up">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-charcoal-900">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </h2>
                  {filters.search && (
                    <Badge className="badge-gold shadow-sm">
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
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }>
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard
                        product={product}
                        locale={locale}
                        showAudio={true}
                        viewMode={viewMode}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 animate-fade-in-up">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gradient-to-br from-gold-100 to-bronze-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Filter className="h-12 w-12 text-gold-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-charcoal-900 mb-3">
                      No products found
                    </h3>
                    <p className="text-charcoal-600 mb-6 text-lg">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <Button
                      variant="outline"
                      className="btn-primary shadow-md hover:shadow-lg"
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
