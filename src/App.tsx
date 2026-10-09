/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  PageView,
  ProductCategory,
  ProductItem,
  ProductVariant,
  StoreConfig,
  GalleryItem,
  TestimonialItem,
  CartItem,
   PRODUCT_CATEGORIES,
} from './types';
import { BrandLogo } from './components/BrandLogo';
import { HomeView } from './components/HomeView';
import { MenuView } from './components/MenuView';
import { CustomCakeView } from './components/CustomCakeView';
import { AboutView, GalleryView, ContactView } from './components/SecondaryPages';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { OwnerStudioModal } from './components/OwnerStudioModal';
import {
  Menu,
  X,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Settings,
} from 'lucide-react';

const FALLBACK_CONFIG: StoreConfig = {
  announcementText:
    'Welcome to Bite of Savour — Pre-orders for weekend pastries & custom celebration cakes are open for request.',
  announcementEnabled: true,
  streetAddress: '[Street Address — Editable by Bakery Owner in Studio Settings]',
  cityCountry: '[City, Country — Editable by Bakery Owner]',
  openingHours: [
    { days: 'Tuesday – Friday', hours: '[Hours Pending Owner Confirmation]' },
    { days: 'Saturday – Sunday', hours: '[Weekend Hours Pending Confirmation]' },
    { days: 'Monday', hours: '[Closed / By Pre-Order Appointment]' },
  ],
  phone: '[Phone Number — Clickable Once Confirmed]',
  whatsappNumber: '',
  email: 'noureddinelassakeur@gmail.com',
  directionsUrl: 'https://maps.google.com',
  instagramHandle: '@biteofsavour',
  instagramUrl: 'https://instagram.com',
  facebookUrl: '',
  pickupAvailable: true,
  deliveryAvailable: false,
  currencySymbol: '$',
  pricesConfirmed: false,
  locationConfirmed: false,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All Products'>(
    'All Products'
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Store Data State
  const [config, setConfig] = useState<StoreConfig>(FALLBACK_CONFIG);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  // Interactive Modals & Cart
  const [activeProductModal, setActiveProductModal] = useState<ProductItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [ownerStudioOpen, setOwnerStudioOpen] = useState(false);
  const [toastNotice, setToastNotice] = useState<string | null>(null);
  
  // Scroll state for header
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize state on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchStoreData = useCallback(async () => {
    try {
      const res = await fetch('/api/store');
      if (res.ok) {
        const data = await res.json();
        if (data.config) setConfig(data.config);
        if (data.products) setProducts(data.products);
        if (data.gallery) setGallery(data.gallery);
        if (data.testimonials) setTestimonials(data.testimonials);
      }
    } catch (err) {
      console.error('Could not fetch store data:', err);
    }
  }, []);

  useEffect(() => {
    fetchStoreData();
  }, [fetchStoreData]);

  // Update document title dynamically per page for SEO
  useEffect(() => {
    const pageTitles: Record<PageView, string> = {
      home: 'Bite of Savour — Artisan Bakery & Patisserie',
      menu: 'Our Menu & Pastries — Bite of Savour',
      'custom-cakes': 'Custom Celebration Cakes — Bite of Savour',
      about: 'Our Story — Bite of Savour Patisserie',
      gallery: 'Bakery & Pastry Gallery — Bite of Savour',
      contact: 'Visit Us & Contact — Bite of Savour',
    };
    document.title = pageTitles[currentPage] || 'Bite of Savour — Artisan Bakery & Patisserie';
  }, [currentPage]);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => {
      setToastNotice((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleNavigate = (page: PageView, category?: ProductCategory | 'All Products') => {
    setCurrentPage(page);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    product: ProductItem,
    quantity: number = 1,
    variant?: ProductVariant
  ) => {
    const chosenVariant =
      variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
    const unitPrice = product.price + (chosenVariant ? chosenVariant.priceDelta : 0);
    const cartItemId = `${product.id}__${chosenVariant?.id || 'default'}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          variant: chosenVariant,
          quantity,
          unitPrice,
        },
      ];
    });

    showToast(`Added ${quantity}x ${product.name} to your order`);
  };

  const handleQuickAdd = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart(product, 1);
  };

  const handleUpdateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks: { id: PageView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'custom-cakes', label: 'Custom Cakes' },
    { id: 'about', label: 'About Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Visit Us' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EC] text-[#352820]">
      {/* SECTION A: THIN EDITABLE ANNOUNCEMENT BAR */}
      {config.announcementEnabled && config.announcementText && (
        <div className="bg-[#352820] text-[#F8F4EC] text-xs py-2 px-4 border-b border-[#B69A68]/25">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <p className="truncate mx-auto text-center font-normal tracking-wide">
              {config.announcementText}
            </p>
            <button
              type="button"
              onClick={() => setOwnerStudioOpen(true)}
              className="text-[11px] text-[#B69A68] hover:underline whitespace-nowrap shrink-0 hidden sm:inline"
            >
              Edit Notice
            </button>
          </div>
        </div>
      )}

      {/* PERSISTENT RESPONSIVE NAVIGATION BAR (Strict 3-Zone Top Bar Contract) */}
      <header 
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'top-0 bg-[#F8F4EC]/95 backdrop-blur-md border-b border-[#352820]/10 translate-y-0 opacity-100 pointer-events-auto shadow-sm' 
            : 'top-0 bg-transparent border-transparent -translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Logo on the left */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('home');
            }}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69A68] rounded"
            aria-label="Bite of Savour Home"
          >
            <BrandLogo variant="header" customLogoUrl={config.customLogoUrl} />
          </a>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#352820]/80"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(link.id);
                  }}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'text-[#352820] border-[#B69A68] font-semibold'
                      : 'border-transparent hover:text-[#352820] hover:border-[#352820]/30'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action ("Order Now" + Mobile Menu Toggle) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#B69A68]" />
              <span>Order Now</span>
              {totalCartItems > 0 && (
                <span className="ml-0.5 tabular-nums font-semibold text-[#EFE6D8]">
                  ({totalCartItems})
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center justify-center p-2.5 rounded border border-[#352820]/20 text-[#352820] hover:bg-[#EFE6D8] transition-colors min-h-[42px] min-w-[42px]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Accessible Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFFCF7] border-b border-[#352820]/15 px-4 pt-3 pb-6 space-y-4 shadow-lg">
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleNavigate(link.id)}
                    className={`w-full text-left px-4 py-3 rounded text-base font-medium transition-colors flex items-center justify-between min-h-[44px] ${
                      isActive
                        ? 'bg-[#EFE6D8] text-[#352820] font-semibold'
                        : 'text-[#352820]/85 hover:bg-[#F8F4EC]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="text-xs text-[#9A6A43] font-normal">Current Page</span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[#352820]/10 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCartDrawerOpen(true);
                }}
                className="py-3 px-4 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded text-center min-h-[44px]"
              >
                Order Basket ({totalCartItems})
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavigate('custom-cakes');
                }}
                className="py-3 px-4 bg-[#EFE6D8] text-[#352820] text-xs font-medium rounded text-center min-h-[44px]"
              >
                Request Custom Cake
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Subtle Toast Notification for Cart Actions */}
      {toastNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 bg-[#352820] text-[#FFFCF7] border border-[#B69A68]/40 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 text-xs"
        >
          <span>{toastNotice}</span>
          <button
            type="button"
            onClick={() => setCartDrawerOpen(true)}
            className="font-semibold text-[#B69A68] underline hover:text-[#EFE6D8] whitespace-nowrap"
          >
            View Basket
          </button>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            config={config}
            products={products}
            testimonials={testimonials}
            gallery={gallery}
            onNavigate={handleNavigate}
            onSelectProduct={(prod) => setActiveProductModal(prod)}
            onQuickAdd={handleQuickAdd}
            onOpenOwnerStudio={() => setOwnerStudioOpen(true)}
          />
        )}

        {currentPage === 'menu' && (
          <MenuView
            products={products}
            config={config}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={(prod) => setActiveProductModal(prod)}
            onQuickAdd={handleQuickAdd}
            onNavigate={handleNavigate}
            onOpenOwnerStudio={() => setOwnerStudioOpen(true)}
          />
        )}

        {currentPage === 'custom-cakes' && <CustomCakeView />}

        {currentPage === 'about' && <AboutView config={config} onNavigate={handleNavigate} />}

        {currentPage === 'gallery' && (
          <GalleryView gallery={gallery} config={config} onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactView config={config} onOpenOwnerStudio={() => setOwnerStudioOpen(true)} />
        )}
      </main>

      {/* SECTION J: DARK ESPRESSO FOOTER WITH CREAM TEXT & SUBTLE GOLD ACCENTS */}
      <footer className="bg-[#352820] text-[#EFE6D8] border-t border-[#B69A68]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#EFE6D8]/15">
            {/* Column 1: Logo & Short Brand Intro */}
            <div className="lg:col-span-4 space-y-4">
              <BrandLogo variant="footer" customLogoUrl={config.customLogoUrl} />
              <p className="text-xs text-[#EFE6D8]/80 leading-relaxed max-w-sm">
                At Bite of Savour, every treat is an invitation to slow down, enjoy the moment, and
                savour something special. Freshly baked pastries, viennoiseries, and custom
                celebration cakes.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#B69A68] hover:text-[#FFFCF7] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{config.instagramHandle}</span>
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-serif-display text-lg font-semibold text-[#FFFCF7] tracking-wide">
                Explore
              </h3>
              <ul className="space-y-2 text-xs text-[#EFE6D8]/80">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => handleNavigate(link.id)}
                      className="hover:text-[#B69A68] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Menu Collections */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-serif-display text-lg font-semibold text-[#FFFCF7] tracking-wide">
                Our Menu
              </h3>
              <ul className="space-y-2 text-xs text-[#EFE6D8]/80">
                {PRODUCT_CATEGORIES.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => handleNavigate('menu', category)}
                      className="hover:text-[#B69A68] transition-colors text-left"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Location, Hours & Contact */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-serif-display text-lg font-semibold text-[#FFFCF7] tracking-wide">
                Visit &amp; Contact
              </h3>
              <div className="space-y-2.5 text-xs text-[#EFE6D8]/80">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B69A68] shrink-0 mt-0.5" />
                  <div>
                    <p>{config.streetAddress}</p>
                    <p>{config.cityCountry}</p>
                    <a
                      href={config.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B69A68] hover:underline inline-block mt-1"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#B69A68] shrink-0" />
                  <a
                    href={`tel:${config.phone.replace(/[^+\d]/g, '')}`}
                    className="hover:text-[#B69A68]"
                  >
                    {config.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#B69A68] shrink-0" />
                  <a href={`mailto:${config.email}`} className="hover:text-[#B69A68] break-all">
                    {config.email}
                  </a>
                </div>

                <div className="pt-2 border-t border-[#EFE6D8]/10 space-y-1">
                  {config.openingHours.map((slot, i) => (
                    <div key={i} className="flex justify-between gap-2 text-[11px]">
                      <span className="text-[#EFE6D8]/90">{slot.days}</span>
                      <span className="text-[#EFE6D8]/70 tabular-nums">{slot.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EFE6D8]/65">
            <p>© {new Date().getFullYear()} Bite of Savour. All rights reserved.</p>
            <button
              type="button"
              onClick={() => setOwnerStudioOpen(true)}
              className="inline-flex items-center gap-1.5 text-[#B69A68] hover:text-[#FFFCF7] transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Bakery Owner Studio (Edit Menu, Prices &amp; Store Info)</span>
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      <ProductModal
        product={activeProductModal}
        currencySymbol={config.currencySymbol}
        pricesConfirmed={config.pricesConfirmed}
        onClose={() => setActiveProductModal(null)}
        onAddToCart={handleAddToCart}
        onNavigate={handleNavigate}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        config={config}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        onNavigate={handleNavigate}
        onOrderSuccess={() => {
          fetchStoreData();
        }}
      />

      <OwnerStudioModal
        isOpen={ownerStudioOpen}
        onClose={() => setOwnerStudioOpen(false)}
        config={config}
        products={products}
        testimonials={testimonials}
        onRefreshStore={fetchStoreData}
      />
    </div>
  );
}
