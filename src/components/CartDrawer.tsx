import React, { useState } from 'react';
import { CartItem, StoreConfig, OrderSubmission, PageView } from '../types';
import { ResilientImage } from './ResilientImage';
import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  config: StoreConfig;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onNavigate: (page: PageView) => void;
  onOrderSuccess: (order: OrderSubmission) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  config,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [collectionDate, setCollectionDate] = useState('');
  const [collectionTime, setCollectionTime] = useState('Morning (9:00 AM – 12:00 PM)');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderSubmission | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Default minimum collection date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim() || !collectionDate) {
      setErrorMsg('Please complete your name, email, telephone number, and preferred date.');
      return;
    }

    if (fulfillmentMethod === 'delivery' && !deliveryAddress.trim()) {
      setErrorMsg('Please provide a delivery address.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          fulfillmentMethod,
          collectionDate,
          collectionTime,
          deliveryAddress: fulfillmentMethod === 'delivery' ? deliveryAddress : undefined,
          specialNotes,
          items: cart.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            variantLabel: item.variant?.label,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
          estimatedTotal: subtotal,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Could not submit order request.');
      }

      setConfirmedOrder(data.order);
      onOrderSuccess(data.order);
      onClearCart();
      setStep('confirmed');
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred while submitting your order.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep('cart');
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#352820]/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Your Bakery Order"
      onClick={resetAndClose}
    >
      <div
        className="bg-[#FFFCF7] w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-[#352820]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#352820]/10 flex items-center justify-between bg-[#F8F4EC]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#9A6A43]" />
            <h2 className="font-serif-display text-2xl font-semibold text-[#352820]">
              {step === 'cart' && 'Your Bakery Basket'}
              {step === 'checkout' && 'Complete Order Request'}
              {step === 'confirmed' && 'Order Request Received'}
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close order drawer"
            className="p-2 text-[#352820]/60 hover:text-[#352820] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'confirmed' && confirmedOrder ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-[#EFE6D8] text-[#9A6A43] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#9A6A43] font-medium">
                  Reference #{confirmedOrder.orderNumber}
                </p>
                <h3 className="font-serif-display text-3xl font-semibold text-[#352820] mt-1">
                  Thank You, {confirmedOrder.customerName}
                </h3>
                <p className="text-sm text-[#352820]/75 mt-2 leading-relaxed">
                  We have received your bakery order request for{' '}
                  <span className="font-medium text-[#352820]">
                    {confirmedOrder.collectionDate} ({confirmedOrder.collectionTime})
                  </span>
                  .
                </p>
              </div>

              <div className="bg-[#F8F4EC] border border-[#352820]/10 rounded-lg p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between font-medium text-[#352820] pb-2 border-b border-[#352820]/10">
                  <span>Status</span>
                  <span className="text-[#9A6A43]">{confirmedOrder.status}</span>
                </div>
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[#352820]/80 py-0.5">
                    <span>
                      {item.quantity}x {item.productName}{' '}
                      {item.variantLabel ? `(${item.variantLabel})` : ''}
                    </span>
                    <span className="tabular-nums font-medium">
                      {config.currencySymbol}
                      {(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold text-sm text-[#352820] pt-2 border-t border-[#352820]/10">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">
                    {config.currencySymbol}
                    {confirmedOrder.estimatedTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#352820]/65 leading-relaxed">
                No online card payment was charged. Our bakery team will review daily availability
                and contact you at <span className="font-medium">{confirmedOrder.customerPhone}</span>{' '}
                or <span className="font-medium">{confirmedOrder.customerEmail}</span> to confirm
                your collection and payment in-store.
              </p>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-3 px-4 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors"
              >
                Return to Bite of Savour
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-10 h-10 text-[#B69A68] stroke-[1.25] mb-3" />
              <h3 className="font-serif-display text-2xl font-semibold text-[#352820]">
                Your Basket is Empty
              </h3>
              <p className="text-sm text-[#352820]/70 mt-1.5 max-w-xs leading-relaxed">
                Explore our freshly baked croissants, seasonal fruit tarts, and signature cakes to
                begin your order.
              </p>
              <button
                type="button"
                onClick={() => {
                  resetAndClose();
                  onNavigate('menu');
                }}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors"
              >
                <span>Browse Our Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : step === 'cart' ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-3.5 p-3 bg-[#F8F4EC] border border-[#352820]/10 rounded-lg"
                >
                  <div className="w-20 h-20 rounded overflow-hidden shrink-0 bg-[#EFE6D8]">
                    <ResilientImage
                      src={item.product.image}
                      alt={item.product.name}
                      aspectClassName="aspect-square"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif-display text-lg font-semibold text-[#352820] leading-tight truncate">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartItemId)}
                        aria-label={`Remove ${item.product.name}`}
                        className="text-[#352820]/45 hover:text-[#352820] p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {item.variant && (
                      <p className="text-xs text-[#9A6A43] mt-0.5">{item.variant.label}</p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-[#352820]/15 rounded bg-[#FFFCF7]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          aria-label="Decrease quantity"
                          className="px-2 py-1 text-[#352820] hover:text-[#9A6A43]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          aria-label="Increase quantity"
                          className="px-2 py-1 text-[#352820] hover:text-[#9A6A43]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-[#352820] tabular-nums">
                        {config.currencySymbol}
                        {(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-3.5 bg-[#EFE6D8]/60 border border-[#352820]/10 rounded text-xs text-[#352820]/75 leading-relaxed">
                Planning a custom wedding or milestone cake? Use our dedicated{' '}
                <button
                  type="button"
                  onClick={() => {
                    resetAndClose();
                    onNavigate('custom-cakes');
                  }}
                  className="font-semibold text-[#9A6A43] underline hover:text-[#352820]"
                >
                  Custom Cake Inquiry Form
                </button>{' '}
                for bespoke flavours, tiers, and design consultations.
              </div>
            </div>
          ) : (
            <form id="order-request-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="p-3.5 bg-[#F8F4EC] border border-[#352820]/10 rounded text-xs text-[#352820]/80 leading-relaxed">
                <strong className="text-[#352820] block mb-0.5">
                  Artisan Bakery Order Request Workflow
                </strong>
                Submit your order below. Our bakers will verify fresh availability for your chosen
                collection time and confirm your order directly. No payment card details are
                collected online.
              </div>

              {errorMsg && (
                <div className="p-3 bg-[#9A6A43]/15 border border-[#9A6A43] rounded text-xs text-[#352820] font-medium">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#352820] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#352820] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#352820] mb-1">
                    Telephone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#352820] mb-1.5">
                  Fulfillment Option
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFulfillmentMethod('pickup')}
                    className={`py-2 px-3 text-xs font-medium rounded border transition-colors ${
                      fulfillmentMethod === 'pickup'
                        ? 'bg-[#352820] text-[#FFFCF7] border-[#352820]'
                        : 'bg-[#FFFCF7] text-[#352820] border-[#352820]/20'
                    }`}
                  >
                    In-Store Pickup
                  </button>
                  <button
                    type="button"
                    disabled={!config.deliveryAvailable}
                    onClick={() => config.deliveryAvailable && setFulfillmentMethod('delivery')}
                    className={`py-2 px-3 text-xs font-medium rounded border transition-colors ${
                      !config.deliveryAvailable
                        ? 'bg-[#EFE6D8]/60 text-[#352820]/40 border-[#352820]/10 cursor-not-allowed'
                        : fulfillmentMethod === 'delivery'
                        ? 'bg-[#352820] text-[#FFFCF7] border-[#352820]'
                        : 'bg-[#FFFCF7] text-[#352820] border-[#352820]/20'
                    }`}
                  >
                    {config.deliveryAvailable ? 'Local Delivery' : 'Delivery (Not Offered)'}
                  </button>
                </div>
              </div>

              {fulfillmentMethod === 'delivery' && config.deliveryAvailable && (
                <div>
                  <label className="block text-xs font-medium text-[#352820] mb-1">
                    Delivery Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Street address, apartment, city"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#352820] mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={minDateStr}
                    value={collectionDate}
                    onChange={(e) => setCollectionDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#352820] mb-1">
                    Preferred Time Window
                  </label>
                  <select
                    value={collectionTime}
                    onChange={(e) => setCollectionTime(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                  >
                    <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="Midday (12:00 PM – 3:00 PM)">Midday (12:00 PM – 3:00 PM)</option>
                    <option value="Afternoon (3:00 PM – 6:00 PM)">Afternoon (3:00 PM – 6:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#352820] mb-1">
                  Order Notes or Allergen Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="Box ribbon message, dietary questions, or collection notes..."
                  className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                />
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && step !== 'confirmed' && (
          <div className="p-6 border-t border-[#352820]/10 bg-[#F8F4EC] space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-sm font-medium text-[#352820]">Estimated Total</span>
                {!config.pricesConfirmed && (
                  <span className="block text-[11px] text-[#352820]/60">
                    Sample prices subject to bakery confirmation
                  </span>
                )}
              </div>
              <span className="font-serif-display text-2xl font-semibold text-[#352820] tabular-nums">
                {config.currencySymbol}
                {subtotal.toFixed(2)}
              </span>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3 px-5 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Proceed to Order Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 border border-[#352820]/25 text-[#352820] text-xs font-medium rounded hover:bg-[#EFE6D8] transition-colors min-h-[44px]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="order-request-form"
                  disabled={submitting}
                  className="flex-1 py-3 px-5 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors disabled:opacity-50 min-h-[44px]"
                >
                  {submitting ? 'Submitting Request...' : 'Submit Order Request'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
