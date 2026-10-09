import React, { useState } from 'react';
import { ProductItem, ProductVariant, PageView } from '../types';
import { ResilientImage } from './ResilientImage';
import { X, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';

interface ProductModalProps {
  product: ProductItem | null;
  currencySymbol: string;
  pricesConfirmed: boolean;
  onClose: () => void;
  onAddToCart: (product: ProductItem, quantity: number, variant?: ProductVariant) => void;
  onNavigate: (page: PageView) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currencySymbol,
  pricesConfirmed,
  onClose,
  onAddToCart,
  onNavigate,
}) => {
  if (!product) return null;

  const variants = product.variants && product.variants.length > 0 ? product.variants : undefined;
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    variants ? variants[0].id : ''
  );
  const [quantity, setQuantity] = useState<number>(1);

  const selectedVariant = variants?.find((v) => v.id === selectedVariantId) || variants?.[0];
  const unitPrice = product.price + (selectedVariant ? selectedVariant.priceDelta : 0);
  const totalPrice = unitPrice * quantity;
  const isSoldOut = product.availability === 'Sold Out';

  const handleAdd = () => {
    if (isSoldOut) return;
    onAddToCart(product, quantity, selectedVariant);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#352820]/60 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFCF7] border border-[#352820]/15 rounded-lg max-w-3xl w-full overflow-hidden shadow-xl max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Product Photography */}
        <div className="md:w-1/2 bg-[#EFE6D8] flex flex-col">
          <ResilientImage
            src={product.image}
            alt={product.name}
            fallbackTitle={product.name}
            aspectClassName="aspect-[4/3] md:aspect-auto md:h-full"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-1.5 text-xs text-[#9A6A43]">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.availability}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close product details"
                className="p-1.5 text-[#352820]/60 hover:text-[#352820] rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2
              id="product-modal-title"
              className="font-serif-display text-2xl md:text-3xl font-semibold text-[#352820] mt-2"
            >
              {product.name}
            </h2>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl font-semibold text-[#352820] tabular-nums">
                {currencySymbol}
                {unitPrice.toFixed(2)}
              </span>
              {!pricesConfirmed && (
                <span className="text-xs text-[#352820]/60">
                  (Sample placeholder price — confirmed upon order review)
                </span>
              )}
            </div>

            <p className="text-sm text-[#352820]/80 mt-4 leading-relaxed">
              {product.fullDescription || product.shortDescription}
            </p>

            {/* Variant Selection */}
            {variants && variants.length > 0 && (
              <div className="mt-6">
                <label className="block text-xs font-medium text-[#352820] mb-2">
                  Select Size or Box Option
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {variants.map((variant) => {
                    const vPrice = product.price + variant.priceDelta;
                    const isSelected = variant.id === (selectedVariant?.id || '');
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded border text-xs font-medium transition-colors ${
                          isSelected
                            ? 'border-[#9A6A43] bg-[#F8F4EC] text-[#352820]'
                            : 'border-[#352820]/15 bg-[#FFFCF7] text-[#352820]/75 hover:border-[#352820]/30'
                        }`}
                      >
                        <span>{variant.label}</span>
                        <span className="tabular-nums font-semibold">
                          {currencySymbol}
                          {vPrice.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dietary & Allergen Information */}
            <div className="mt-6 pt-4 border-t border-[#352820]/10 space-y-1.5 text-xs text-[#352820]/70">
              {product.dietaryNotes && product.dietaryNotes.length > 0 && (
                <div>
                  <span className="font-medium text-[#352820]">Dietary: </span>
                  <span>{product.dietaryNotes.join(' · ')}</span>
                </div>
              )}
              {product.allergens && product.allergens.length > 0 && (
                <div>
                  <span className="font-medium text-[#352820]">Allergens: </span>
                  <span>{product.allergens.join(', ')}</span>
                </div>
              )}
              <p className="text-[11px] text-[#352820]/55 pt-1">
                Prepared in an artisan kitchen that handles wheat, dairy, eggs, and tree nuts.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#352820]/10 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="inline-flex items-center border border-[#352820]/20 rounded bg-[#F8F4EC]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2.5 text-[#352820] hover:text-[#9A6A43] transition-colors min-h-[42px]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-semibold tabular-nums text-[#352820]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="p-2.5 text-[#352820] hover:text-[#9A6A43] transition-colors min-h-[42px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                disabled={isSoldOut}
                onClick={handleAdd}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 min-h-[42px] ${
                  isSoldOut
                    ? 'bg-[#EFE6D8] text-[#352820]/40 cursor-not-allowed'
                    : 'bg-[#352820] text-[#FFFCF7] hover:bg-[#9A6A43]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {isSoldOut
                    ? 'Currently Sold Out'
                    : `Add to Order · ${currencySymbol}${totalPrice.toFixed(2)}`}
                </span>
              </button>
            </div>

            {product.category === 'Cakes & Celebration Cakes' && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('custom-cakes');
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-[#9A6A43] hover:text-[#352820] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Looking for a bespoke multi-tier or custom event cake? Request a Custom Cake</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
