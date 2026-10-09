import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { StoreConfig, PageView, ProductCategory } from '../types';

interface SlideData {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    action: () => void;
  };
  secondaryCta?: {
    label: string;
    action: () => void;
  };
}

interface HeroCarouselProps {
  config: StoreConfig;
  onNavigate: (page: PageView, category?: ProductCategory | 'All Products') => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ config, onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const slides: SlideData[] = [
    {
      id: 'slide-1',
      image: '/images/hero_patisserie_showcase_1791574472862.jpg',
      title: 'Made with Love. Baked to Be Savoured.',
      subtitle: 'Discover beautiful pastries, delightful cakes, and freshly baked treats made to bring a little sweetness to every day.',
      primaryCta: {
        label: 'Explore Our Menu',
        action: () => onNavigate('menu', 'All Products'),
      },
      secondaryCta: {
        label: 'Discover Our Story',
        action: () => onNavigate('about'),
      },
    },
    {
      id: 'slide-2',
      image: '/images/product_custom_celebration_cake_1791574516943.jpg',
      title: 'Bespoke Celebration Cakes',
      subtitle: 'Make your special moments memorable with a cake designed around your celebration. Layered perfection for weddings and milestones.',
      primaryCta: {
        label: 'Request Custom Cake',
        action: () => onNavigate('custom-cakes'),
      },
    },
    {
      id: 'slide-3',
      image: '/images/product_croissants_viennoiserie_1791574495450.jpg',
      title: 'Morning Patisserie',
      subtitle: 'Flaky Viennoiseries, golden butter croissants, and seasonal tartlets freshly baked every morning for your delight.',
      primaryCta: {
        label: 'View Pastries',
        action: () => onNavigate('menu', 'Artisan Pastries'),
      },
      secondaryCta: {
        label: 'Plan Your Visit',
        action: () => onNavigate('contact'),
      },
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <section 
      className="relative w-full h-[70vh] md:h-[80vh] min-h-[500px] bg-[#352820] overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
      aria-roledescription="carousel"
      aria-label="Highlighted Content"
    >
      {/* Slides Container */}
      <div 
        className="w-full h-full flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className="w-full h-full shrink-0 relative"
            aria-hidden={currentSlide !== index}
            role="group"
            aria-roledescription="slide"
          >
            {/* Background Image */}
            <img 
              src={slide.image} 
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#352820]/90 via-[#352820]/40 to-transparent md:bg-gradient-to-r md:from-[#352820]/90 md:via-[#352820]/50 md:to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl transform transition-all duration-1000 delay-100"
                     style={{ 
                       opacity: currentSlide === index ? 1 : 0, 
                       transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)'
                     }}
                >
                  <h2 
                    className="font-serif-display font-semibold text-[#FFFCF7] tracking-tight leading-[1.1] mb-4"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', textWrap: 'balance' }}
                  >
                    {slide.title}
                  </h2>
                  <p className="text-base md:text-lg text-[#FFFCF7]/90 leading-relaxed max-w-xl mb-8">
                    {slide.subtitle}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={slide.primaryCta.action}
                      tabIndex={currentSlide === index ? 0 : -1}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#B69A68] text-[#FFFCF7] text-sm font-medium rounded hover:bg-[#9A6A43] transition-colors whitespace-nowrap"
                    >
                      <span>{slide.primaryCta.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {slide.secondaryCta && (
                      <button
                        type="button"
                        onClick={slide.secondaryCta.action}
                        tabIndex={currentSlide === index ? 0 : -1}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-[#FFFCF7] border border-[#FFFCF7]/30 text-sm font-medium rounded hover:bg-[#FFFCF7]/10 hover:border-[#FFFCF7] transition-all whitespace-nowrap"
                      >
                        <span>{slide.secondaryCta.label}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#FFFCF7]/10 hover:bg-[#FFFCF7]/20 text-[#FFFCF7] backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-[#FFFCF7]/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#FFFCF7]/10 hover:bg-[#FFFCF7]/20 text-[#FFFCF7] backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-[#FFFCF7]/20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index 
                ? 'w-8 md:w-10 h-2 bg-[#B69A68]' 
                : 'w-2 h-2 bg-[#FFFCF7]/50 hover:bg-[#FFFCF7]'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
