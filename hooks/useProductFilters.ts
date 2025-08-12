'use client';

import { FilterOptions } from '@/components/shop/ShopFilters';
import { Product } from '@/lib/types';
import { useMemo, useState } from 'react';

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: [],
    priceRange: [0, Math.max(...products.map(p => p.price))],
    materials: [],
    inStockOnly: false,
    handmadeOnly: false,
    sortBy: 'popularity',
  });

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.en.toLowerCase().includes(searchTerm) ||
        product.name.ru.toLowerCase().includes(searchTerm) ||
        product.name.uk.toLowerCase().includes(searchTerm) ||
        product.description.en.toLowerCase().includes(searchTerm) ||
        product.description.ru.toLowerCase().includes(searchTerm) ||
        product.description.uk.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.materials?.some(material => material.toLowerCase().includes(searchTerm))
      );
    }

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => 
        filters.category.includes(product.category)
      );
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Materials filter
    if (filters.materials.length > 0) {
      filtered = filtered.filter(product => 
        product.materials?.some(material => filters.materials.includes(material))
      );
    }

    // In stock only filter
    if (filters.inStockOnly) {
      filtered = filtered.filter(product => product.inventory > 0);
    }

    // Handmade only filter
    if (filters.handmadeOnly) {
      filtered = filtered.filter(product => product.isHandmade);
    }

    // Sort products
    switch (filters.sortBy) {
      case 'priceLowHigh':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'nameAZ':
        filtered.sort((a, b) => a.name.en.localeCompare(b.name.en));
        break;
      case 'nameZA':
        filtered.sort((a, b) => b.name.en.localeCompare(a.name.en));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popularity':
      default:
        // Sort by featured first, then by name
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return a.name.en.localeCompare(b.name.en);
        });
        break;
    }

    return filtered;
  }, [products, filters]);

  const updateFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: [],
      priceRange: [0, Math.max(...products.map(p => p.price))],
      materials: [],
      inStockOnly: false,
      handmadeOnly: false,
      sortBy: 'popularity',
    });
  };

  return {
    filters,
    filteredProducts,
    updateFilters,
    clearFilters,
  };
}
