import React, { useState } from 'react';
import { ProductItem, ProductCategory, PRODUCT_CATEGORIES, StoreConfig, PageView } from '../types';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, Sparkles, Settings } from 'lucide-react';

interface MenuViewProps {
  products: ProductItem[];
  config: StoreConfig;
  selectedCategory: ProductCategory | 'All Products';
  onSelectCategory: (category: ProductCategory | 'All Products') => void;
  onSelectProduct: (product: ProductItem) => void;
  onQuickAdd: (product: ProductItem, e: React.MouseEvent) => void;
  onNavigate: (page: PageView) => void;
  onOpenOwnerStudio: () => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  products,
  config,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onQuickAdd,
  onNavigate,
  onOpenOwnerStudio,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('ALL');

  const visibleProducts = products.filter((p) => !p.hidden);

  const filteredProducts = visibleProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAvailability =
      availabilityFilter === 'ALL' || product.availability === availabilityFilter;

    return matchesCategory && matchesSearch && matchesAvailability;
  });

  const categoriesList: (ProductCategory | 'All Products')[] = [
    'All Products',
    ...PRODUCT_CATEGORIES,
  ];

  return (
    <div className="py-12 md:py-20 bg-[#F8F4EC] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#352820]/10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
              Bite of Savour · Patisserie Menu
            </p>
            <h1
              className="font-serif-display text-4xl md:text-5xl font-semibold text-[#352820] mt-2"
              style={{ textWrap: 'balance' }}
            >
              Our Pastries, Viennoiseries &amp; Cakes
            </h1>
            <p className="text-sm md:text-base text-[#352820]/80 mt-3 leading-relaxed">
              Explore our daily selection of flaky croissants, seasonal fruit tarts, cookies, and
              celebration cakes. Select any item to view dietary notes, sizes, or add to your order
              request.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={onOpenOwnerStudio}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FFFCF7] border border-[#352820]/20 text-xs font-medium text-[#352820] rounded hover:bg-[#EFE6D8] transition-colors whitespace-nowrap shrink-0"
            >
              <Settings className="w-3.5 h-3.5 text-[#9A6A43]" />
              <span>Edit Menu Items</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('custom-cakes')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B69A68]" />
              <span>Custom Cake Inquiry</span>
            </button>
          </div>
        </div>

        {/* Interactive Filter Controls & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Segmented Category Filter Buttons */}
            <div
              className="flex items-center gap-1.5 p-1.5 bg-[#EFE6D8] rounded-lg overflow-x-auto"
              role="tablist"
              aria-label="Product category filter"
            >
              {categoriesList.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => onSelectCategory(category)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[38px] ${
                      active
                        ? 'bg-[#FFFCF7] text-[#352820] shadow-xs'
                        : 'text-[#352820]/70 hover:text-[#352820]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Search & Availability Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-[#352820]/45 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search croissants, tarts, cakes..."
                  aria-label="Search menu items"
                  className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FFFCF7] border border-[#352820]/20 rounded-md focus:outline-none focus:border-[#9A6A43] min-h-[40px]"
                />
              </div>

              <div className="inline-flex items-center gap-2 bg-[#FFFCF7] border border-[#352820]/20 rounded-md px-3 py-1.5 min-h-[40px]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#9A6A43] shrink-0" />
                <select
                  aria-label="Filter by availability"
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="text-xs bg-transparent text-[#352820] focus:outline-none"
                >
                  <option value="ALL">All Availability</option>
                  <option value="Available Daily">Available Daily</option>
                  <option value="Pre-Order 24h">Pre-Order 24h</option>
                  <option value="Weekend Special">Weekend Special</option>
                </select>
              </div>
            </div>
          </div>

          {!config.pricesConfirmed && (
            <div className="text-xs text-[#352820]/65 flex items-center justify-between bg-[#EFE6D8]/50 px-4 py-2.5 rounded border border-[#352820]/10">
              <span>
                Note: Sample items and prices are displayed as placeholders until the final menu is
                confirmed by the bakery owner.
              </span>
              <span className="tabular-nums font-medium shrink-0 ml-4">
                Showing {filteredProducts.length} of {visibleProducts.length} items
              </span>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#FFFCF7] border border-[#352820]/10 rounded-lg p-12 text-center space-y-4">
            <h2 className="font-serif-display text-2xl font-semibold text-[#352820]">
              No Menu Items Match Your Filter
            </h2>
            <p className="text-sm text-[#352820]/70 max-w-md mx-auto">
              Try clearing your search query or switching to &ldquo;All Products&rdquo; to browse our
              complete bakery counter.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('All Products');
                setSearchQuery('');
                setAvailabilityFilter('ALL');
              }}
              className="px-5 py-2.5 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors"
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={config.currencySymbol}
                pricesConfirmed={config.pricesConfirmed}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
