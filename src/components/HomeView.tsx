import React from 'react';
import {
  PageView,
  ProductItem,
  ProductCategory,
  StoreConfig,
  TestimonialItem,
  GalleryItem,
} from '../types';
import { BrandLogo } from './BrandLogo';
import { ResilientImage } from './ResilientImage';
import { ProductCard } from './ProductCard';
import {
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Sparkles,
  Utensils,
  MessageSquareQuote,
  Settings,
} from 'lucide-react';

interface HomeViewProps {
  config: StoreConfig;
  products: ProductItem[];
  testimonials: TestimonialItem[];
  gallery: GalleryItem[];
  onNavigate: (page: PageView, category?: ProductCategory | 'All Products') => void;
  onSelectProduct: (product: ProductItem) => void;
  onQuickAdd: (product: ProductItem, e: React.MouseEvent) => void;
  onOpenOwnerStudio: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  config,
  products,
  testimonials,
  gallery,
  onNavigate,
  onSelectProduct,
  onQuickAdd,
  onOpenOwnerStudio,
}) => {
  const featuredProducts = products.filter((p) => !p.hidden && p.featured).slice(0, 6);

  const visualCategories: {
    title: string;
    subtitle: string;
    targetCategory: ProductCategory | 'Custom';
    image: string;
  }[] = [
    {
      title: 'Cakes',
      subtitle: 'Signature layered cakes & intimate celebration centerpieces',
      targetCategory: 'Cakes & Celebration Cakes',
      image: '/src/assets/images/product_custom_celebration_cake_1791574516943.jpg',
    },
    {
      title: 'Pastries',
      subtitle: 'Seasonal fruit tarts & delicate patisserie creations',
      targetCategory: 'Artisan Pastries',
      image: '/src/assets/images/product_artisan_pastries_tarts_1791574505960.jpg',
    },
    {
      title: 'Viennoiseries',
      subtitle: 'Golden butter croissants, almond croissants & pain au chocolat',
      targetCategory: 'Croissants & Viennoiseries',
      image: '/src/assets/images/product_croissants_viennoiserie_1791574495450.jpg',
    },
    {
      title: 'Cookies & Desserts',
      subtitle: 'Fleur de sel dark chocolate cookies, brownies & sweet bites',
      targetCategory: 'Cookies & Sweet Treats',
      image: '/src/assets/images/product_cookies_sweet_treats_1791574529763.jpg',
    },
    {
      title: 'Custom Orders',
      subtitle: 'Bespoke cakes tailored to weddings, birthdays & milestones',
      targetCategory: 'Custom',
      image: '/src/assets/images/product_custom_celebration_cake_1791574516943.jpg',
    },
  ];

  return (
    <div className="space-y-0">
      {/* SECTION B: HERO SECTION */}
      <section className="relative bg-[#F8F4EC] border-b border-[#352820]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Editorial Copy Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="flex items-center justify-start">
                <BrandLogo variant="hero" customLogoUrl={config.customLogoUrl} />
              </div>

              <h1
                className="font-serif-display font-semibold text-[#352820] tracking-tight leading-[1.08]"
                style={{ fontSize: 'clamp(2.35rem, 4vw, 3.75rem)', textWrap: 'balance' }}
              >
                Made with Love. Baked to Be Savoured.
              </h1>

              <p className="text-base md:text-lg text-[#352820]/80 leading-relaxed max-w-xl">
                Discover beautiful pastries, delightful cakes, and freshly baked treats made to
                bring a little sweetness to every day.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('menu', 'All Products')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#352820] text-[#FFFCF7] text-sm font-medium rounded hover:bg-[#9A6A43] transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FFFCF7] text-[#352820] border border-[#352820]/20 text-sm font-medium rounded hover:border-[#9A6A43] hover:text-[#9A6A43] transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
                >
                  <span>Discover Our Story</span>
                </button>
              </div>

              <div className="pt-4 border-t border-[#352820]/10 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#9A6A43]">
                <span>Viennoiseries &amp; Artisan Pastries</span>
                <span aria-hidden="true">·</span>
                <span>Custom Celebration Cakes</span>
                <span aria-hidden="true">·</span>
                <span>Fresh Daily Counter</span>
              </div>
            </div>

            {/* Hero Photography Column */}
            <div className="lg:col-span-6 flex">
              <div className="relative w-full rounded-lg overflow-hidden border border-[#352820]/10 shadow-sm bg-[#EFE6D8] flex">
                <ResilientImage
                  src="/src/assets/images/hero_patisserie_showcase_1791574472862.jpg"
                  alt="Freshly baked golden croissants and pain au chocolat on warm travertine counter at Bite of Savour"
                  fallbackTitle="Bite of Savour Morning Showcase"
                  aspectClassName="aspect-[16/10] lg:aspect-auto lg:h-full"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#352820]/65 via-transparent to-transparent flex items-end p-6">
                  <div className="text-[#FFFCF7]">
                    <p className="text-xs tracking-widest uppercase text-[#EFE6D8]/90">
                      Morning Patisserie Counter
                    </p>
                    <p className="font-serif-display text-xl md:text-2xl font-medium mt-0.5">
                      Flaky Viennoiseries, Tartlets &amp; Sweet Creations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: SIGNATURE FAVORITES ("A Taste of Our Favorites") */}
      <section className="py-16 md:py-24 bg-[#F8F4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
                Curated From Our Counter
              </p>
              <h2
                className="font-serif-display text-3xl md:text-4xl font-semibold text-[#352820] mt-2"
                style={{ textWrap: 'balance' }}
              >
                A Taste of Our Favorites
              </h2>
              {!config.pricesConfirmed && (
                <p className="text-xs text-[#352820]/65 mt-2">
                  Sample menu items and illustrative prices shown below — easily editable by the
                  bakery owner in Studio Settings.
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onNavigate('menu', 'All Products')}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#352820] hover:text-[#9A6A43] transition-colors self-start md:self-auto whitespace-nowrap shrink-0"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
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
        </div>
      </section>

      {/* SECTION D: BRAND STORY ("A Little Moment of Sweetness") */}
      <section className="py-16 md:py-24 bg-[#EFE6D8] border-y border-[#352820]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="rounded-lg overflow-hidden border border-[#352820]/10 shadow-sm bg-[#F8F4EC]">
                <ResilientImage
                  src="/src/assets/images/bakery_interior_storefront_1791574484471.jpg"
                  alt="Warm sunlit interior and pastry display counter at Bite of Savour"
                  fallbackTitle="Bite of Savour Bakery Interior"
                  aspectClassName="aspect-[16/10]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
                Our Philosophy
              </p>
              <h2
                className="font-serif-display text-3xl md:text-4xl font-semibold text-[#352820] leading-tight"
                style={{ textWrap: 'balance' }}
              >
                A Little Moment of Sweetness.
              </h2>
              <p className="text-base text-[#352820]/85 leading-relaxed">
                At Bite of Savour, every treat is an invitation to slow down, enjoy the moment, and
                savour something special. From everyday favorites to cakes for life&apos;s sweetest
                celebrations, discover the pleasure of a beautiful bite.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
                >
                  <span>Read More About Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#FFFCF7] text-[#352820] border border-[#352820]/20 text-xs font-medium rounded hover:border-[#9A6A43] transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
                >
                  <span>Plan Your Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: VISUAL PRODUCT CATEGORIES */}
      <section className="py-16 md:py-24 bg-[#F8F4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
              Explore By Collection
            </p>
            <h2
              className="font-serif-display text-3xl md:text-4xl font-semibold text-[#352820] mt-2"
              style={{ textWrap: 'balance' }}
            >
              Crafted for Morning Rituals &amp; Grand Gatherings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {visualCategories.map((cat, idx) => {
              const spanClass = idx < 2 ? 'md:col-span-3' : 'md:col-span-2';
              return (
                <button
                  key={cat.title}
                  type="button"
                  onClick={() => {
                    if (cat.targetCategory === 'Custom') {
                      onNavigate('custom-cakes');
                    } else {
                      onNavigate('menu', cat.targetCategory);
                    }
                  }}
                  className={`${spanClass} group relative rounded-lg overflow-hidden border border-[#352820]/10 bg-[#EFE6D8] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69A68]`}
                >
                  <ResilientImage
                    src={cat.image}
                    alt={`${cat.title} collection at Bite of Savour`}
                    fallbackTitle={cat.title}
                    aspectClassName="aspect-[16/10]"
                    loading="lazy"
                    className="transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#352820]/85 via-[#352820]/35 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-serif-display text-2xl font-semibold text-[#FFFCF7]">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-[#EFE6D8]/90 mt-1 line-clamp-1">
                          {cat.subtitle}
                        </p>
                      </div>
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#FFFCF7]/95 text-[#352820] group-hover:bg-[#B69A68] group-hover:text-[#FFFCF7] transition-colors shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION F: CUSTOM CAKE FEATURE ("Your Celebration, Made Sweeter.") */}
      <section className="py-16 md:py-24 bg-[#EFE6D8] border-y border-[#352820]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFCF7] border border-[#352820]/10 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-6 p-8 md:p-12 lg:p-14 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#B69A68]" />
                  <span>Bespoke Patisserie &amp; Events</span>
                </div>

                <h2
                  className="font-serif-display text-3xl md:text-4xl font-semibold text-[#352820] leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Your Celebration, Made Sweeter.
                </h2>

                <p className="text-base text-[#352820]/80 leading-relaxed">
                  Make your special moments memorable with a cake designed around your celebration.
                  Share your event date, preferred flavours, guest count, and design inspiration,
                  and our bakery team will review availability for your occasion.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('custom-cakes')}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#352820] text-[#FFFCF7] text-sm font-medium rounded hover:bg-[#9A6A43] transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
                  >
                    <span>Request a Custom Cake</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-[#352820]/60">
                  Note: Submitting an inquiry initiates a personal consultation. Availability is
                  confirmed directly by the bakery upon review.
                </p>
              </div>

              <div className="lg:col-span-6 bg-[#EFE6D8] flex">
                <ResilientImage
                  src="/src/assets/images/product_custom_celebration_cake_1791574516943.jpg"
                  alt="Two-tier ivory buttercream celebration cake with delicate botanicals and gold leaf accents"
                  fallbackTitle="Custom Celebration Cakes"
                  aspectClassName="aspect-[4/3] lg:aspect-auto lg:h-full"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G: VISIT OUR BAKERY ("Come In for Something Wonderful.") */}
      <section className="py-16 md:py-24 bg-[#F8F4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex">
              <div className="w-full rounded-lg overflow-hidden border border-[#352820]/10 bg-[#EFE6D8] flex">
                <ResilientImage
                  src="/src/assets/images/bakery_interior_storefront_1791574484471.jpg"
                  alt="Bite of Savour bakery interior, sunlit windows, and glass pastry counter"
                  fallbackTitle="Visit Bite of Savour"
                  aspectClassName="aspect-[16/10] lg:aspect-auto lg:h-full"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FFFCF7] border border-[#352820]/10 rounded-lg p-7 md:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
                    Visit Our Storefront
                  </p>
                  <h2
                    className="font-serif-display text-3xl font-semibold text-[#352820] mt-1.5"
                    style={{ textWrap: 'balance' }}
                  >
                    Come In for Something Wonderful.
                  </h2>
                </div>

                <div className="space-y-4 pt-2 border-t border-[#352820]/10 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#9A6A43] shrink-0 mt-1" />
                    <div>
                      <span className="font-medium text-[#352820] block">Bakery Location</span>
                      <span className="text-[#352820]/80 block">{config.streetAddress}</span>
                      <span className="text-[#352820]/80 block">{config.cityCountry}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#9A6A43] shrink-0 mt-1" />
                    <div className="w-full">
                      <span className="font-medium text-[#352820] block mb-1">Opening Hours</span>
                      <div className="space-y-1 text-xs text-[#352820]/80">
                        {config.openingHours.map((slot, i) => (
                          <div key={i} className="flex justify-between gap-2">
                            <span className="font-medium">{slot.days}</span>
                            <span className="tabular-nums text-right">{slot.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#9A6A43] shrink-0 mt-1" />
                    <div>
                      <span className="font-medium text-[#352820] block">Telephone &amp; Direct Contact</span>
                      <a
                        href={`tel:${config.phone.replace(/[^+\d]/g, '')}`}
                        className="text-[#9A6A43] hover:underline block"
                      >
                        {config.phone}
                      </a>
                      <a
                        href={`mailto:${config.email}`}
                        className="text-xs text-[#352820]/75 hover:underline block mt-0.5"
                      >
                        {config.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#352820]/10 flex flex-wrap items-center gap-3">
                <a
                  href={config.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
                <button
                  type="button"
                  onClick={onOpenOwnerStudio}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 border border-[#352820]/20 text-[#352820] text-xs font-medium rounded hover:bg-[#EFE6D8] transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
                  title="Edit address, hours, and phone number"
                >
                  <Settings className="w-3.5 h-3.5 text-[#9A6A43]" />
                  <span>Edit Store Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: CUSTOMER TESTIMONIALS (Honest, Zero Fabricated Reviews) */}
      <section className="py-16 md:py-20 bg-[#EFE6D8] border-y border-[#352820]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
                Guest Reflections
              </p>
              <h2 className="font-serif-display text-3xl md:text-4xl font-semibold text-[#352820] mt-1.5">
                Words From Our Community
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenOwnerStudio}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9A6A43] hover:text-[#352820] transition-colors self-start md:self-auto"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>Manage Verified Guest Reviews</span>
            </button>
          </div>

          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((item) => (
                <blockquote
                  key={item.id}
                  className="bg-[#FFFCF7] border border-[#352820]/10 rounded-lg p-6 flex flex-col justify-between space-y-4"
                >
                  <p className="font-serif-display text-xl italic text-[#352820] leading-relaxed">
                    “{item.quote}”
                  </p>
                  <footer className="text-xs text-[#9A6A43] pt-3 border-t border-[#352820]/10">
                    <strong className="font-semibold text-[#352820]">{item.customerName}</strong>
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <span>{item.context}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          ) : (
            <div className="bg-[#FFFCF7] border border-[#352820]/10 rounded-lg p-8 md:p-10 text-center max-w-3xl mx-auto space-y-4">
              <Utensils className="w-7 h-7 text-[#B69A68] mx-auto stroke-[1.5]" />
              <h3 className="font-serif-display text-2xl font-semibold text-[#352820]">
                Reserved for Genuine Guest Reviews
              </h3>
              <p className="text-sm text-[#352820]/75 leading-relaxed max-w-xl mx-auto">
                We believe in authentic hospitality and never display fabricated quotations or
                ratings. As guests share their experiences with Bite of Savour, verified customer
                reflections will be curated here.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors"
                >
                  Share Your Experience With Us
                </button>
                <button
                  type="button"
                  onClick={onOpenOwnerStudio}
                  className="px-4 py-2.5 border border-[#352820]/20 text-[#352820] text-xs font-medium rounded hover:bg-[#EFE6D8] transition-colors"
                >
                  Publish a Verified Review (Owner)
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION I: INSTAGRAM AND SOCIAL GALLERY */}
      <section className="py-16 md:py-24 bg-[#F8F4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
                From Our Kitchen &amp; Counter
              </p>
              <h2 className="font-serif-display text-3xl md:text-4xl font-semibold text-[#352820] mt-1.5">
                Follow Along {config.instagramHandle}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('gallery')}
                className="px-4 py-2.5 border border-[#352820]/20 text-[#352820] text-xs font-medium rounded hover:bg-[#EFE6D8] transition-colors whitespace-nowrap shrink-0"
              >
                Open Full Gallery
              </button>
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors whitespace-nowrap shrink-0"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {gallery.slice(0, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('gallery')}
                className="group relative rounded-lg overflow-hidden border border-[#352820]/10 bg-[#EFE6D8] cursor-pointer"
              >
                <ResilientImage
                  src={item.image}
                  alt={item.title}
                  fallbackTitle={item.title}
                  aspectClassName="aspect-[4/3]"
                  loading="lazy"
                  className="transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#352820]/80 via-[#352820]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
                  <span className="text-[11px] text-[#EFE6D8]/85">{item.category}</span>
                  <h3 className="font-serif-display text-lg font-medium text-[#FFFCF7]">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
