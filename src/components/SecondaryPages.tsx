import React, { useState } from 'react';
import { PageView, StoreConfig, GalleryItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { ResilientImage } from './ResilientImage';
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  MessageCircle,
  CheckCircle2,
  Settings,
  X,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* ABOUT US PAGE                                                              */
/* -------------------------------------------------------------------------- */

interface AboutViewProps {
  config?: StoreConfig;
  onNavigate: (page: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ config, onNavigate }) => {
  const pillars = [
    {
      number: '01.',
      title: 'Attention to Every Layer',
      description:
        'From the golden, shattering crust of a morning croissant to the smooth finish of a celebration cake, every creation is prepared with care, patience, and visual grace.',
    },
    {
      number: '02.',
      title: 'A Welcoming Sanctuary',
      description:
        'Designed around warm natural light, inviting pastry counters, and unhurried hospitality, our bakery is a place to pause and enjoy a quiet moment of sweetness.',
    },
    {
      number: '03.',
      title: 'Made for Everyday & Milestones',
      description:
        'Whether you are stopping in for your daily coffee pairing or commissioning a bespoke cake for a cherished gathering, we treat every order as an occasion.',
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[#F8F4EC] space-y-20">
      {/* Editorial Story Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <BrandLogo variant="hero" customLogoUrl={config?.customLogoUrl} />
            <p className="text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
              About Bite of Savour
            </p>
            <h1
              className="font-serif-display text-4xl md:text-5xl font-semibold text-[#352820] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              A Little Moment of Sweetness, Baked to Be Savoured.
            </h1>
            <p className="text-base text-[#352820]/85 leading-relaxed">
              At Bite of Savour, every treat is an invitation to slow down, enjoy the moment, and
              savour something special. From everyday favorites to cakes for life&apos;s sweetest
              celebrations, discover the pleasure of a beautiful bite.
            </p>
            <p className="text-sm text-[#352820]/75 leading-relaxed">
              Inspired by the warmth and refinement of boutique patisseries, our counter brings
              together freshly baked viennoiseries, delicate fruit tarts, rich cookies, and
              thoughtfully designed celebration cakes in a calm, welcoming atmosphere.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('custom-cakes')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FFFCF7] text-[#352820] border border-[#352820]/20 text-xs font-medium rounded hover:border-[#9A6A43] transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
              >
                <span>Inquire About a Custom Cake</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-lg overflow-hidden border border-[#352820]/10 shadow-xs bg-[#EFE6D8]">
              <ResilientImage
                src="/src/assets/images/bakery_interior_storefront_1791574484471.jpg"
                alt="Bite of Savour bakery interior and pastry counter"
                fallbackTitle="Bite of Savour Interior"
                aspectClassName="aspect-[16/10]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden border border-[#352820]/10 bg-[#EFE6D8]">
                <ResilientImage
                  src="/src/assets/images/product_croissants_viennoiserie_1791574495450.jpg"
                  alt="Golden laminated croissants at Bite of Savour"
                  fallbackTitle="Viennoiseries"
                  aspectClassName="aspect-[4/3]"
                />
              </div>
              <div className="rounded-lg overflow-hidden border border-[#352820]/10 bg-[#EFE6D8]">
                <ResilientImage
                  src="/src/assets/images/product_artisan_pastries_tarts_1791574505960.jpg"
                  alt="Seasonal fruit tarts at Bite of Savour"
                  fallbackTitle="Artisan Tarts"
                  aspectClassName="aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Numbered Pillars */}
      <div className="bg-[#EFE6D8] border-y border-[#352820]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
              What Guides Us
            </p>
            <h2 className="font-serif-display text-3xl md:text-4xl font-semibold text-[#352820] mt-2">
              The Art of the Counter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-[#FFFCF7] border border-[#352820]/10 rounded-lg p-7 space-y-3"
              >
                <span className="font-serif-display text-2xl font-semibold text-[#B69A68]">
                  {pillar.number}
                </span>
                <h3 className="font-serif-display text-2xl font-semibold text-[#352820]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#352820]/80 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* GALLERY PAGE                                                               */
/* -------------------------------------------------------------------------- */

interface GalleryViewProps {
  gallery: GalleryItem[];
  config: StoreConfig;
  onNavigate: (page: PageView) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ gallery, config, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', ...Array.from(new Set(gallery.map((g) => g.category)))];
  const filtered =
    selectedCategory === 'All'
      ? gallery
      : gallery.filter((g) => g.category === selectedCategory);

  return (
    <div className="py-12 md:py-20 bg-[#F8F4EC] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#352820]/10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
              Visual Lookbook
            </p>
            <h1
              className="font-serif-display text-4xl md:text-5xl font-semibold text-[#352820] mt-2"
              style={{ textWrap: 'balance' }}
            >
              Inside Bite of Savour
            </h1>
            <p className="text-sm md:text-base text-[#352820]/80 mt-3 leading-relaxed">
              A closer look at our sunlit bakery interior, flaky laminated viennoiseries, seasonal
              fruit tarts, and custom celebration cakes.
            </p>
          </div>

          <a
            href={config.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors self-start md:self-auto whitespace-nowrap shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow {config.instagramHandle}</span>
          </a>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#EFE6D8] rounded-lg w-fit max-w-full overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#FFFCF7] text-[#352820] shadow-xs'
                  : 'text-[#352820]/70 hover:text-[#352820]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Balanced Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((item) => (
            <article
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group bg-[#FFFCF7] border border-[#352820]/10 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="overflow-hidden bg-[#EFE6D8]">
                <ResilientImage
                  src={item.image}
                  alt={item.title}
                  fallbackTitle={item.title}
                  aspectClassName="aspect-[4/3]"
                  className="transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <div className="text-xs text-[#9A6A43] mb-1">{item.category}</div>
                <h2 className="font-serif-display text-xl font-semibold text-[#352820]">
                  {item.title}
                </h2>
                <p className="text-xs text-[#352820]/75 mt-1.5 leading-relaxed">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="p-6 bg-[#EFE6D8] border border-[#352820]/10 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif-display text-2xl font-semibold text-[#352820]">
              Inspired by Something You See?
            </h3>
            <p className="text-xs text-[#352820]/75 mt-0.5">
              Browse our daily menu or request a custom cake tailored to your upcoming celebration.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="px-4 py-2.5 bg-[#FFFCF7] border border-[#352820]/20 text-xs font-medium text-[#352820] rounded hover:bg-[#F8F4EC]"
            >
              View Menu
            </button>
            <button
              type="button"
              onClick={() => onNavigate('custom-cakes')}
              className="px-4 py-2.5 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43]"
            >
              Request Custom Cake
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#352820]/75 backdrop-blur-[2px]"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="bg-[#FFFCF7] border border-[#352820]/15 rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-[#EFE6D8]">
              <ResilientImage
                src={lightboxItem.image}
                alt={lightboxItem.title}
                aspectClassName="aspect-[16/10]"
              />
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Close image preview"
                className="absolute top-3 right-3 p-2 rounded-full bg-[#FFFCF7]/90 text-[#352820] hover:bg-[#FFFCF7]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <span className="text-xs text-[#9A6A43]">{lightboxItem.category}</span>
              <h3 className="font-serif-display text-2xl font-semibold text-[#352820] mt-1">
                {lightboxItem.title}
              </h3>
              <p className="text-sm text-[#352820]/80 mt-2">{lightboxItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* CONTACT & VISIT US PAGE                                                    */
/* -------------------------------------------------------------------------- */

interface ContactViewProps {
  config: StoreConfig;
  onOpenOwnerStudio: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ config, onOpenOwnerStudio }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Bakery Inquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const cleanWhatsapp = config.whatsappNumber.replace(/[^\d]/g, '');
  const whatsappHref = cleanWhatsapp
    ? `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
        'Hello Bite of Savour! I would like to inquire about your pastries and cakes.'
      )}`
    : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please enter your name, email address, and message.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not send message.');
      }
      setSentSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#F8F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#352820]/10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
              Contact &amp; Visit Us
            </p>
            <h1
              className="font-serif-display text-4xl md:text-5xl font-semibold text-[#352820] mt-2"
              style={{ textWrap: 'balance' }}
            >
              Come In for Something Wonderful.
            </h1>
            <p className="text-sm md:text-base text-[#352820]/80 mt-3 leading-relaxed">
              We would love to welcome you to Bite of Savour or assist with your upcoming order.
              Reach out by telephone, WhatsApp, email, or the message form below.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenOwnerStudio}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FFFCF7] border border-[#352820]/20 text-xs font-medium text-[#352820] rounded hover:bg-[#EFE6D8] transition-colors self-start md:self-auto whitespace-nowrap shrink-0"
          >
            <Settings className="w-3.5 h-3.5 text-[#9A6A43]" />
            <span>Update Editable Store Details</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Store Information, Hours, Directions, WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFCF7] border border-[#352820]/10 rounded-lg overflow-hidden">
              <ResilientImage
                src="/src/assets/images/bakery_interior_storefront_1791574484471.jpg"
                alt="Bite of Savour bakery storefront and interior"
                fallbackTitle="Bite of Savour Storefront"
                aspectClassName="aspect-[16/9]"
              />
              <div className="p-6 md:p-7 space-y-5">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-4 h-4 text-[#9A6A43] shrink-0 mt-1" />
                  <div className="text-sm">
                    <h2 className="font-semibold text-[#352820]">Bakery Address</h2>
                    <p className="text-[#352820]/80 mt-0.5">{config.streetAddress}</p>
                    <p className="text-[#352820]/80">{config.cityCountry}</p>
                    <a
                      href={config.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9A6A43] hover:underline mt-2"
                    >
                      <span>Open in Google Maps / Directions</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-4 border-t border-[#352820]/10">
                  <Phone className="w-4 h-4 text-[#9A6A43] shrink-0 mt-1" />
                  <div className="text-sm">
                    <h2 className="font-semibold text-[#352820]">Telephone (Clickable on Mobile)</h2>
                    <a
                      href={`tel:${config.phone.replace(/[^+\d]/g, '')}`}
                      className="text-[#9A6A43] font-medium hover:underline block mt-0.5"
                    >
                      {config.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-4 border-t border-[#352820]/10">
                  <Mail className="w-4 h-4 text-[#9A6A43] shrink-0 mt-1" />
                  <div className="text-sm">
                    <h2 className="font-semibold text-[#352820]">Email Address</h2>
                    <a
                      href={`mailto:${config.email}`}
                      className="text-[#9A6A43] hover:underline block mt-0.5 break-all"
                    >
                      {config.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-4 border-t border-[#352820]/10">
                  <Clock className="w-4 h-4 text-[#9A6A43] shrink-0 mt-1" />
                  <div className="text-sm w-full">
                    <h2 className="font-semibold text-[#352820] mb-1.5">Opening Hours</h2>
                    <div className="space-y-1 text-xs text-[#352820]/80">
                      {config.openingHours.map((slot, idx) => (
                        <div key={idx} className="flex justify-between gap-2">
                          <span className="font-medium">{slot.days}</span>
                          <span className="tabular-nums text-right">{slot.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WhatsApp & Instagram Direct Links */}
                <div className="pt-4 border-t border-[#352820]/10 flex flex-wrap gap-3">
                  {whatsappHref ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors min-h-[42px]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={onOpenOwnerStudio}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#EFE6D8] text-[#352820] text-xs font-medium rounded hover:bg-[#E5D8C5] transition-colors min-h-[42px]"
                    >
                      <MessageCircle className="w-4 h-4 text-[#9A6A43]" />
                      <span>Set WhatsApp Number (Owner)</span>
                    </button>
                  )}

                  <a
                    href={config.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#352820]/20 text-[#352820] text-xs font-medium rounded hover:bg-[#EFE6D8] transition-colors min-h-[42px]"
                  >
                    <Instagram className="w-4 h-4 text-[#9A6A43]" />
                    <span>{config.instagramHandle}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFCF7] border border-[#352820]/10 rounded-lg p-6 sm:p-8 md:p-10">
              {sentSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#EFE6D8] text-[#9A6A43] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif-display text-3xl font-semibold text-[#352820]">
                    Message Received
                  </h2>
                  <p className="text-sm text-[#352820]/80 max-w-md mx-auto leading-relaxed">
                    Thank you for writing to Bite of Savour. Your message has been recorded for our
                    bakery team and we will reply to your email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSentSuccess(false)}
                    className="px-6 py-2.5 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-[#352820]/10 pb-4">
                    <h2 className="font-serif-display text-2xl md:text-3xl font-semibold text-[#352820]">
                      Send a Message to the Bakery
                    </h2>
                    <p className="text-xs text-[#352820]/70 mt-1">
                      Have a question about today&apos;s counter, allergen details, or special event
                      catering? Write to us below.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-[#9A6A43]/15 border border-[#9A6A43] rounded text-xs text-[#352820] font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1.5">
                        Telephone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1.5">
                        Subject
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                      >
                        <option value="General Bakery Inquiry">General Bakery Inquiry</option>
                        <option value="Daily Pastry Availability">Daily Pastry Availability</option>
                        <option value="Catering & Event Box Request">
                          Catering &amp; Event Box Request
                        </option>
                        <option value="Dietary & Allergen Question">
                          Dietary &amp; Allergen Question
                        </option>
                        <option value="Guest Feedback">Guest Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#352820] mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help make your day a little sweeter?"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 bg-[#352820] text-[#FFFCF7] text-sm font-medium rounded hover:bg-[#9A6A43] transition-colors disabled:opacity-50 min-h-[46px]"
                  >
                    {submitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
