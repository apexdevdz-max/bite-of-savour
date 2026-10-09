import React from 'react';
import { ProductItem } from '../types';
import { ResilientImage } from './ResilientImage';
import { Plus, Eye } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  currencySymbol: string;
  pricesConfirmed: boolean;
  onSelectProduct: (product: ProductItem) => void;
  onQuickAdd: (product: ProductItem, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currencySymbol,
  pricesConfirmed,
  onSelectProduct,
  onQuickAdd,
}) => {
  const isSoldOut = product.availability === 'Sold Out';

  return (
    <article
      onClick={() => onSelectProduct(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectProduct(product);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}`}
      className="group bg-[#FFFCF7] border border-[#352820]/10 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69A68] cursor-pointer text-left"
    >
      <div>
        <div className="relative overflow-hidden bg-[#EFE6D8]">
          <ResilientImage
            src={product.image}
            alt={`${product.name} — ${product.category} at Bite of Savour`}
            fallbackTitle={product.name}
            aspectClassName="aspect-[4/3]"
            loading="lazy"
            className="transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#352820]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-end p-3">
            <span className="inline-flex items-center gap-1.5 bg-[#FFFCF7]/95 text-[#352820] text-xs font-medium px-3 py-1.5 rounded shadow-sm whitespace-nowrap shrink-0">
              <Eye className="w-3.5 h-3.5 text-[#9A6A43]" />
              View Details
            </span>
          </div>
        </div>

        <div className="p-5">
          {/* Clean unboxed metadata with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-[#9A6A43] mb-1.5">
            <span className="truncate">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap shrink-0">{product.availability}</span>
          </div>

          <h3 className="font-serif-display text-xl font-semibold text-[#352820] group-hover:text-[#9A6A43] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-sm text-[#352820]/75 mt-2 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-[#352820]/8 flex items-center justify-between gap-4">
        <div>
          <span className="text-base font-semibold text-[#352820] tabular-nums">
            {currencySymbol}
            {product.price.toFixed(2)}
          </span>
          {!pricesConfirmed && (
            <span className="block text-[11px] text-[#352820]/55">
              Sample menu price
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={isSoldOut}
          onClick={(e) => onQuickAdd(product, e)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
            isSoldOut
              ? 'bg-[#EFE6D8] text-[#352820]/40 cursor-not-allowed'
              : 'bg-[#352820] text-[#FFFCF7] hover:bg-[#9A6A43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69A68]'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isSoldOut ? 'Unavailable' : 'Add to Order'}</span>
        </button>
      </div>
    </article>
  );
};
