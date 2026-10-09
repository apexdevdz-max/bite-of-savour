import React, { useState, useEffect } from 'react';
import {
  StoreConfig,
  ProductItem,
  PRODUCT_CATEGORIES,
  ProductCategory,
  TestimonialItem,
  OrderSubmission,
  CustomCakeInquiry,
  ContactMessage,
} from '../types';
import {
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Check,
  Store,
  Utensils,
  ClipboardList,
  MessageSquareQuote,
} from 'lucide-react';

interface OwnerStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StoreConfig;
  products: ProductItem[];
  testimonials: TestimonialItem[];
  onRefreshStore: () => Promise<void>;
}

export const OwnerStudioModal: React.FC<OwnerStudioModalProps> = ({
  isOpen,
  onClose,
  config,
  products,
  testimonials,
  onRefreshStore,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'products' | 'orders' | 'testimonials'>('settings');
  const [formConfig, setFormConfig] = useState<StoreConfig>(config);
  const [savingConfig, setSavingConfig] = useState(false);
  const [configSavedNotice, setConfigSavedNotice] = useState(false);

  // New / Edit Product state
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem> | null>(null);
  const [savingProduct, setSavingProduct] = useState(false);

  // Admin records state
  const [orders, setOrders] = useState<OrderSubmission[]>([]);
  const [inquiries, setInquiries] = useState<CustomCakeInquiry[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(false);

  // New Testimonial state
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerContext, setNewCustomerContext] = useState('');
  const [newCustomerQuote, setNewCustomerQuote] = useState('');

  useEffect(() => {
    setFormConfig(config);
  }, [config]);

  useEffect(() => {
    if (isOpen && activeTab === 'orders') {
      fetchAdminRecords();
    }
  }, [isOpen, activeTab]);

  const fetchAdminRecords = async () => {
    setLoadingRecords(true);
    try {
      const res = await fetch('/api/admin/records');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
        setInquiries(data.cakeInquiries || []);
        setMessages(data.contactMessages || []);
      }
    } catch (e) {
      console.error('Error loading admin records:', e);
    } finally {
      setLoadingRecords(false);
    }
  };

  if (!isOpen) return null;

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingConfig(true);
    setConfigSavedNotice(false);
    try {
      await fetch('/api/store/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formConfig),
      });
      await onRefreshStore();
      setConfigSavedNotice(true);
      setTimeout(() => setConfigSavedNotice(false), 3000);
    } finally {
      setSavingConfig(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.category) return;
    setSavingProduct(true);
    try {
      const payload: ProductItem = {
        id: editingProduct.id || `prod-${Date.now()}`,
        name: editingProduct.name,
        category: editingProduct.category as ProductCategory,
        shortDescription: editingProduct.shortDescription || '',
        fullDescription: editingProduct.fullDescription || editingProduct.shortDescription || '',
        price: Number(editingProduct.price) || 0,
        priceNote: editingProduct.priceNote || 'Sample price',
        image:
          editingProduct.image ||
          '/src/assets/images/product_croissants_viennoiserie_1791574495450.jpg',
        availability: editingProduct.availability || 'Available Daily',
        featured: Boolean(editingProduct.featured),
        hidden: Boolean(editingProduct.hidden),
        dietaryNotes: editingProduct.dietaryNotes || ['Vegetarian'],
        allergens: editingProduct.allergens || ['Wheat / Gluten', 'Dairy', 'Eggs'],
        variants: editingProduct.variants || [{ id: 'v-default', label: 'Standard', priceDelta: 0 }],
      };
      await fetch('/api/store/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      await onRefreshStore();
      setEditingProduct(null);
    } finally {
      setSavingProduct(false);
    }
  };

  const handleToggleProductHidden = async (product: ProductItem) => {
    await fetch('/api/store/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, hidden: !product.hidden }),
    });
    await onRefreshStore();
  };

  const handleDeleteProduct = async (id: string) => {
    await fetch(`/api/store/products/${id}`, { method: 'DELETE' });
    await onRefreshStore();
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim() || !newCustomerQuote.trim()) return;
    await fetch('/api/store/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: newCustomerName,
        context: newCustomerContext || 'Verified Bakery Guest',
        quote: newCustomerQuote,
      }),
    });
    setNewCustomerName('');
    setNewCustomerContext('');
    setNewCustomerQuote('');
    await onRefreshStore();
  };

  const handleDeleteTestimonial = async (id: string) => {
    await fetch(`/api/store/testimonials/${id}`, { method: 'DELETE' });
    await onRefreshStore();
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderSubmission['status']) => {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    await fetchAdminRecords();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#352820]/65 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Bakery Owner Studio & Store Management"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFCF7] border border-[#352820]/15 rounded-lg max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#352820] text-[#F8F4EC] flex items-center justify-between">
          <div>
            <h2 className="font-serif-display text-2xl font-semibold">
              Bite of Savour · Bakery Owner Studio
            </h2>
            <p className="text-xs text-[#EFE6D8]/75">
              Update editable shop details, menu products, prices, verified testimonials, and review incoming orders.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close owner studio"
            className="p-2 text-[#EFE6D8]/70 hover:text-[#FFFCF7] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 bg-[#F8F4EC] border-b border-[#352820]/10 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'settings'
                ? 'border-[#9A6A43] text-[#352820]'
                : 'border-transparent text-[#352820]/65 hover:text-[#352820]'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Store Details & Hours</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'products'
                ? 'border-[#9A6A43] text-[#352820]'
                : 'border-transparent text-[#352820]/65 hover:text-[#352820]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Menu & Products ({products.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'orders'
                ? 'border-[#9A6A43] text-[#352820]'
                : 'border-transparent text-[#352820]/65 hover:text-[#352820]'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Orders & Cake Inquiries</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('testimonials')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'testimonials'
                ? 'border-[#9A6A43] text-[#352820]'
                : 'border-transparent text-[#352820]/65 hover:text-[#352820]'
            }`}
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Verified Reviews ({testimonials.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveConfig} className="space-y-6 max-w-3xl">
              <div className="p-4 bg-[#F8F4EC] border border-[#352820]/10 rounded-lg space-y-4">
                <h3 className="font-serif-display text-xl font-semibold text-[#352820]">
                  Business Logo (Displayed Across Header, Hero &amp; Footer)
                </h3>
                <p className="text-xs text-[#352820]/75">
                  The website uses the signature gold script &amp; croissant <strong>Bite &amp; Savor</strong> logo by default. You can also upload your own PNG/JPG logo file here to override it across the entire website.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] cursor-pointer transition-colors">
                    <span>Upload Custom Logo Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            setFormConfig({ ...formConfig, customLogoUrl: reader.result });
                          }
                        };
                        reader.readAsDataURL(file);
                      }}
                      className="hidden"
                    />
                  </label>
                  {formConfig.customLogoUrl && (
                    <div className="flex items-center gap-3">
                      <img
                        src={formConfig.customLogoUrl}
                        alt="Uploaded custom logo preview"
                        referrerPolicy="no-referrer"
                        className="h-12 w-auto object-contain bg-[#FFFCF7] px-2 py-1 rounded border border-[#352820]/15"
                      />
                      <button
                        type="button"
                        onClick={() => setFormConfig({ ...formConfig, customLogoUrl: '' })}
                        className="text-xs text-[#9A6A43] hover:underline"
                      >
                        Reset to Default Gold Script Logo
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-[#F8F4EC] border border-[#352820]/10 rounded-lg space-y-4">
                <h3 className="font-serif-display text-xl font-semibold text-[#352820]">
                  Announcement Bar
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    id="announcement-toggle"
                    type="checkbox"
                    checked={formConfig.announcementEnabled}
                    onChange={(e) =>
                      setFormConfig({ ...formConfig, announcementEnabled: e.target.checked })
                    }
                    className="rounded border-[#352820]/30"
                  />
                  <label htmlFor="announcement-toggle" className="text-xs font-medium text-[#352820]">
                    Display top announcement bar on website
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#352820] mb-1">
                    Announcement Message
                  </label>
                  <input
                    type="text"
                    value={formConfig.announcementText}
                    onChange={(e) =>
                      setFormConfig({ ...formConfig, announcementText: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#F8F4EC] border border-[#352820]/10 rounded-lg space-y-4">
                <h3 className="font-serif-display text-xl font-semibold text-[#352820]">
                  Physical Bakery Location & Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#352820] mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={formConfig.streetAddress}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, streetAddress: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#352820] mb-1">
                      City & Country
                    </label>
                    <input
                      type="text"
                      value={formConfig.cityCountry}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, cityCountry: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#352820] mb-1">
                      Confirmed Telephone Number
                    </label>
                    <input
                      type="text"
                      value={formConfig.phone}
                      onChange={(e) => setFormConfig({ ...formConfig, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#352820] mb-1">
                      WhatsApp Number (Digits only, e.g. 15551234567)
                    </label>
                    <input
                      type="text"
                      value={formConfig.whatsappNumber}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, whatsappNumber: e.target.value })
                      }
                      placeholder="Leave empty if not yet confirmed"
                      className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#352820] mb-1">
                      Business Email Address
                    </label>
                    <input
                      type="email"
                      value={formConfig.email}
                      onChange={(e) => setFormConfig({ ...formConfig, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#352820] mb-1">
                      Google Maps / Directions Link
                    </label>
                    <input
                      type="url"
                      value={formConfig.directionsUrl}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, directionsUrl: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#352820] mb-1">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      value={formConfig.instagramHandle}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, instagramHandle: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#352820] mb-1">
                      Instagram Profile URL
                    </label>
                    <input
                      type="url"
                      value={formConfig.instagramUrl}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, instagramUrl: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                    />
                  </div>
                </div>

                {/* Opening Hours Editor */}
                <div className="pt-3 border-t border-[#352820]/10 space-y-2">
                  <label className="block text-xs font-medium text-[#352820]">
                    Opening Hours Schedule
                  </label>
                  {formConfig.openingHours.map((slot, index) => (
                    <div key={index} className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={slot.days}
                        onChange={(e) => {
                          const updated = [...formConfig.openingHours];
                          updated[index] = { ...slot, days: e.target.value };
                          setFormConfig({ ...formConfig, openingHours: updated });
                        }}
                        className="px-3 py-1.5 text-xs bg-[#FFFCF7] border border-[#352820]/20 rounded"
                      />
                      <input
                        type="text"
                        value={slot.hours}
                        onChange={(e) => {
                          const updated = [...formConfig.openingHours];
                          updated[index] = { ...slot, hours: e.target.value };
                          setFormConfig({ ...formConfig, openingHours: updated });
                        }}
                        className="px-3 py-1.5 text-xs bg-[#FFFCF7] border border-[#352820]/20 rounded"
                      />
                    </div>
                  ))}
                </div>

                {/* Confirmation Toggles */}
                <div className="pt-3 border-t border-[#352820]/10 flex flex-wrap gap-6">
                  <label className="inline-flex items-center gap-2 text-xs text-[#352820]">
                    <input
                      type="checkbox"
                      checked={formConfig.pricesConfirmed}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, pricesConfirmed: e.target.checked })
                      }
                    />
                    <span>Mark menu prices as officially confirmed (hides sample price note)</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs text-[#352820]">
                    <input
                      type="checkbox"
                      checked={formConfig.deliveryAvailable}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, deliveryAvailable: e.target.checked })
                      }
                    />
                    <span>Enable local delivery option in order requests</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={savingConfig}
                  className="px-5 py-2.5 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors"
                >
                  {savingConfig ? 'Saving Changes...' : 'Save Bakery Configuration'}
                </button>
                {configSavedNotice && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9A6A43]">
                    <Check className="w-4 h-4" />
                    Configuration updated across website
                  </span>
                )}
              </div>
            </form>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#352820]/75">
                  Add, edit, hide, or remove menu items without changing the website code.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setEditingProduct({
                      name: '',
                      category: 'Croissants & Viennoiseries',
                      shortDescription: '',
                      fullDescription: '',
                      price: 5.0,
                      availability: 'Available Daily',
                      featured: true,
                      hidden: false,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Product</span>
                </button>
              </div>

              {editingProduct && (
                <form
                  onSubmit={handleSaveProduct}
                  className="p-5 bg-[#F8F4EC] border border-[#9A6A43]/40 rounded-lg space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-display text-xl font-semibold text-[#352820]">
                      {editingProduct.id ? 'Edit Product' : 'New Bakery Product'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="text-xs text-[#352820]/60 hover:text-[#352820]"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name || ''}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, name: e.target.value })
                        }
                        className="w-full px-3 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1">
                        Category *
                      </label>
                      <select
                        value={editingProduct.category || 'Croissants & Viennoiseries'}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            category: e.target.value as ProductCategory,
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                      >
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1">
                        Price ({config.currencySymbol}) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={editingProduct.price ?? 0}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                        }
                        className="w-full px-3 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1">
                        Short Description
                      </label>
                      <input
                        type="text"
                        value={editingProduct.shortDescription || ''}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            shortDescription: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1">
                        Availability Status
                      </label>
                      <select
                        value={editingProduct.availability || 'Available Daily'}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            availability: e.target.value as ProductItem['availability'],
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-[#FFFCF7] border border-[#352820]/20 rounded"
                      >
                        <option value="Available Daily">Available Daily</option>
                        <option value="Pre-Order 24h">Pre-Order 24h</option>
                        <option value="Weekend Special">Weekend Special</option>
                        <option value="Sold Out">Sold Out</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2 text-xs text-[#352820]">
                      <input
                        type="checkbox"
                        checked={Boolean(editingProduct.featured)}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, featured: e.target.checked })
                        }
                      />
                      <span>Feature in Homepage “A Taste of Our Favorites”</span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={savingProduct}
                    className="px-5 py-2 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43]"
                  >
                    {savingProduct ? 'Saving...' : 'Save Product'}
                  </button>
                </form>
              )}

              <div className="divide-y divide-[#352820]/10 border border-[#352820]/10 rounded-lg bg-[#FFFCF7]">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-[#F8F4EC]/50"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#9A6A43]">
                        <span>{product.category}</span>
                        <span>·</span>
                        <span>{product.availability}</span>
                        {product.hidden && (
                          <>
                            <span>·</span>
                            <span className="text-[#352820]/50 font-semibold">Hidden from Menu</span>
                          </>
                        )}
                      </div>
                      <h4 className="font-serif-display text-lg font-semibold text-[#352820]">
                        {product.name} — {config.currencySymbol}
                        {product.price.toFixed(2)}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(product)}
                        className="px-3 py-1.5 text-xs font-medium border border-[#352820]/20 rounded hover:bg-[#EFE6D8]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleProductHidden(product)}
                        className="p-1.5 text-[#352820]/70 hover:text-[#352820] border border-[#352820]/15 rounded"
                        title={product.hidden ? 'Show on menu' : 'Hide from menu'}
                      >
                        {product.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1.5 text-[#352820]/50 hover:text-[#352820] border border-[#352820]/15 rounded"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-8">
              {loadingRecords ? (
                <p className="text-sm text-[#352820]/70">Loading submitted orders and inquiries...</p>
              ) : (
                <>
                  <div>
                    <h3 className="font-serif-display text-2xl font-semibold text-[#352820] mb-3">
                      Online Order Requests ({orders.length})
                    </h3>
                    {orders.length === 0 ? (
                      <p className="text-xs text-[#352820]/65 p-4 bg-[#F8F4EC] rounded border border-[#352820]/10">
                        No online order requests have been submitted yet.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="p-4 bg-[#F8F4EC] border border-[#352820]/10 rounded-lg flex flex-col md:flex-row justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs text-[#9A6A43] font-medium">
                                <span>#{order.orderNumber}</span>
                                <span>·</span>
                                <span>{order.collectionDate} ({order.collectionTime})</span>
                                <span>·</span>
                                <span className="uppercase">{order.fulfillmentMethod}</span>
                              </div>
                              <h4 className="font-serif-display text-lg font-semibold text-[#352820]">
                                {order.customerName} — {order.customerPhone} ({order.customerEmail})
                              </h4>
                              <div className="text-xs text-[#352820]/80 space-y-0.5 pt-1">
                                {order.items.map((it, idx) => (
                                  <div key={idx}>
                                    {it.quantity}x {it.productName}{' '}
                                    {it.variantLabel ? `(${it.variantLabel})` : ''}
                                  </div>
                                ))}
                              </div>
                              {order.specialNotes && (
                                <p className="text-xs text-[#352820]/65 pt-1">
                                  Notes: {order.specialNotes}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-end justify-between gap-2">
                              <span className="font-semibold text-sm tabular-nums text-[#352820]">
                                {config.currencySymbol}
                                {order.estimatedTotal.toFixed(2)}
                              </span>
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  handleUpdateOrderStatus(
                                    order.id,
                                    e.target.value as OrderSubmission['status']
                                  )
                                }
                                className="px-3 py-1.5 text-xs bg-[#FFFCF7] border border-[#352820]/20 rounded"
                              >
                                <option value="Pending Bakery Confirmation">
                                  Pending Bakery Confirmation
                                </option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif-display text-2xl font-semibold text-[#352820] mb-3">
                      Custom Cake Inquiries ({inquiries.length})
                    </h3>
                    {inquiries.length === 0 ? (
                      <p className="text-xs text-[#352820]/65 p-4 bg-[#F8F4EC] rounded border border-[#352820]/10">
                        No custom cake inquiries have been submitted yet.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {inquiries.map((inq) => (
                          <div
                            key={inq.id}
                            className="p-4 bg-[#F8F4EC] border border-[#352820]/10 rounded-lg space-y-1.5"
                          >
                            <div className="flex items-center gap-2 text-xs text-[#9A6A43] font-medium">
                              <span>#{inq.inquiryNumber}</span>
                              <span>·</span>
                              <span>Event Date: {inq.desiredDate}</span>
                              <span>·</span>
                              <span>{inq.occasion}</span>
                            </div>
                            <h4 className="font-serif-display text-lg font-semibold text-[#352820]">
                              {inq.customerName} — {inq.phoneOrWhatsapp} ({inq.email})
                            </h4>
                            <p className="text-xs text-[#352820]/80">
                              <strong>Servings:</strong> {inq.servings} · <strong>Flavour:</strong>{' '}
                              {inq.preferredFlavor}{' '}
                              {inq.budgetRange ? `· Budget: ${inq.budgetRange}` : ''}
                            </p>
                            <p className="text-xs text-[#352820]/80">
                              <strong>Design:</strong> {inq.designDescription}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif-display text-2xl font-semibold text-[#352820] mb-3">
                      Contact Form Messages ({messages.length})
                    </h3>
                    {messages.length === 0 ? (
                      <p className="text-xs text-[#352820]/65 p-4 bg-[#F8F4EC] rounded border border-[#352820]/10">
                        No contact messages submitted yet.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {messages.map((m) => (
                          <div
                            key={m.id}
                            className="p-4 bg-[#F8F4EC] border border-[#352820]/10 rounded-lg space-y-1"
                          >
                            <div className="text-xs text-[#9A6A43] font-medium">{m.subject}</div>
                            <h4 className="font-serif-display text-base font-semibold text-[#352820]">
                              {m.name} ({m.email}) {m.phone ? `· ${m.phone}` : ''}
                            </h4>
                            <p className="text-xs text-[#352820]/80">{m.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-6 max-w-2xl">
              <p className="text-xs text-[#352820]/75 leading-relaxed">
                Add verified customer feedback here. In accordance with our authenticity standards,
                no fabricated customer names or ratings are displayed on the website.
              </p>

              <form
                onSubmit={handleAddTestimonial}
                className="p-4 bg-[#F8F4EC] border border-[#352820]/10 rounded-lg space-y-3"
              >
                <h4 className="font-serif-display text-lg font-semibold text-[#352820]">
                  Publish a Verified Customer Review
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Customer Name *"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    className="px-3 py-2 text-xs bg-[#FFFCF7] border border-[#352820]/20 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Order Context (e.g. Custom Wedding Cake, Morning Croissants)"
                    value={newCustomerContext}
                    onChange={(e) => setNewCustomerContext(e.target.value)}
                    className="px-3 py-2 text-xs bg-[#FFFCF7] border border-[#352820]/20 rounded"
                  />
                </div>
                <textarea
                  rows={2}
                  required
                  placeholder="Genuine customer quote *"
                  value={newCustomerQuote}
                  onChange={(e) => setNewCustomerQuote(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FFFCF7] border border-[#352820]/20 rounded"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43]"
                >
                  Publish Verified Review
                </button>
              </form>

              <div className="space-y-2.5">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 bg-[#FFFCF7] border border-[#352820]/10 rounded-lg flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm italic text-[#352820]">“{t.quote}”</p>
                      <p className="text-xs text-[#9A6A43] mt-1">
                        {t.customerName} · {t.context}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteTestimonial(t.id)}
                      className="text-[#352820]/45 hover:text-[#352820] p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
