'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Text,
  RichText,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Field,
  ImageField,
  LinkField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// ============================================================================
// Types & Interfaces
// ============================================================================

interface SlideFields {
  title?: Field<string>;
  subtitle?: Field<string>;
  description?: Field<string>;
  image?: ImageField;
  videoUrl?: Field<string>;
  link?: LinkField;
  linkText?: Field<string>;
}

interface FeatureCardFields {
  title?: Field<string>;
  subtitle?: Field<string>;
  description?: Field<string>;
  image?: ImageField;
  link?: LinkField;
}

interface HomepageFields {
  // Brand
  brandName?: Field<string>;
  brandLogo?: ImageField;

  // Hero Carousel Slides
  heroSlides?: {
    results?: SlideFields[];
  };

  // Fallback hero (single slide)
  heroTitle?: Field<string>;
  heroSubtitle?: Field<string>;
  heroImage?: ImageField;
  heroVideoUrl?: Field<string>;
  heroCta?: LinkField;

  // Feature Cards
  featureCards?: {
    results?: FeatureCardFields[];
  };

  // Newsletter Section
  newsletterTitle?: Field<string>;
  newsletterSubtitle?: Field<string>;
  newsletterDescription?: Field<string>;
}

interface HomepageProps {
  params?: { [key: string]: string };
  fields?: {
    data?: {
      datasource?: HomepageFields;
    };
  };
}

// ============================================================================
// Custom Hooks
// ============================================================================

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function useCarousel(totalSlides: number, autoPlayInterval = 6000) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, autoPlayInterval, totalSlides]);

  return { currentSlide, nextSlide, prevSlide, goToSlide, isPaused, setIsPaused };
}

// ============================================================================
// Sub-Components
// ============================================================================

/**
 * Animated Section Wrapper with fade-in effect
 */
function AnimatedReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-1000 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * Brand Logo - Elegant script-style display
 */
function BrandLogo({
  fields,
  isEditing,
  variant = 'light',
}: {
  fields: HomepageFields;
  isEditing: boolean;
  variant?: 'light' | 'dark';
}) {
  const textColor = variant === 'light' ? 'text-white' : 'text-stone-900';

  if (fields.brandLogo?.value?.src || isEditing) {
    return (
      <div className="h-10 w-auto">
        <ContentSdkImage
          field={fields.brandLogo}
          className={cn('h-full w-auto object-contain', variant === 'light' && 'brightness-0 invert')}
        />
      </div>
    );
  }

  return (
    <Text
      tag="span"
      field={fields.brandName}
      className={cn(
        'font-serif text-2xl italic tracking-wide',
        textColor
      )}
    />
  );
}

/**
 * Hero Slide Component
 */
function HeroSlide({
  slide,
  isActive,
  isEditing,
}: {
  slide: SlideFields;
  isActive: boolean;
  isEditing: boolean;
}) {
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={cn(
        'absolute inset-0 transition-opacity duration-1000',
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      )}
    >
      {/* Video Background */}
      {slide.videoUrl?.value && (
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={slide.videoUrl.value} type="video/mp4" />
          </video>
          {/* Video Controls */}
          <button
            onClick={() => {
              if (videoRef.current) {
                if (videoPlaying) {
                  videoRef.current.pause();
                } else {
                  videoRef.current.play();
                }
                setVideoPlaying(!videoPlaying);
              }
            }}
            className="absolute bottom-8 right-8 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            {videoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </button>
        </div>
      )}

      {/* Image Background */}
      {!slide.videoUrl?.value && (slide.image?.value?.src || isEditing) && (
        <div className="absolute inset-0">
          <ContentSdkImage
            field={slide.image}
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
        </div>
      )}

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Content */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-end pb-32 px-6 text-center transition-all duration-700 delay-300',
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        {/* Subtitle */}
        {(slide.subtitle?.value || isEditing) && (
          <Text
            tag="span"
            field={slide.subtitle}
            className="mb-4 block font-sans text-xs font-light uppercase tracking-[0.35em] text-white/80"
          />
        )}

        {/* Title */}
        {(slide.title?.value || isEditing) && (
          <Text
            tag="h1"
            field={slide.title}
            className="font-serif text-3xl font-light leading-tight tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl"
          />
        )}

        {/* Description */}
        {(slide.description?.value || isEditing) && (
          <RichText
            field={slide.description}
            className="mt-6 max-w-xl font-sans text-sm font-light leading-relaxed text-white/80"
          />
        )}

        {/* CTA Button */}
        {slide.link && (slide.link.value?.href || isEditing) && (
          <div className="mt-8">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="group border-white/40 bg-transparent px-10 py-5 text-xs font-normal uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all duration-500 hover:border-white hover:bg-white hover:text-stone-900"
            >
              <ContentSdkLink field={slide.link}>
                {slide.linkText?.value || 'Reserve Now'}
              </ContentSdkLink>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Hero Section with Carousel
 */
function HeroSection({
  fields,
  isEditing,
}: {
  fields: HomepageFields;
  isEditing: boolean;
}) {
  // Get slides from carousel or create single slide from fallback fields
  const slides: SlideFields[] = fields.heroSlides?.results?.length
    ? fields.heroSlides.results
    : [
        {
          title: fields.heroTitle,
          subtitle: fields.heroSubtitle,
          image: fields.heroImage,
          videoUrl: fields.heroVideoUrl,
          link: fields.heroCta,
        },
      ];

  const { currentSlide, nextSlide, prevSlide, goToSlide } = useCarousel(slides.length);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-950">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6">
        {/* Menu Button */}
        <button className="flex flex-col gap-1.5 p-2">
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
        </button>

        {/* Logo */}
        <BrandLogo fields={fields} isEditing={isEditing} variant="light" />

        {/* Placeholder for right side balance */}
        <div className="w-10" />
      </header>

      {/* Slides */}
      {slides.map((slide, index) => (
        <HeroSlide
          key={index}
          slide={slide}
          isActive={index === currentSlide}
          isEditing={isEditing}
        />
      ))}

      {/* Navigation Arrows (only show if multiple slides) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 z-20 -translate-y-1/2 p-2 text-white/60 transition-colors hover:text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8" strokeWidth={1} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 z-20 -translate-y-1/2 p-2 text-white/60 transition-colors hover:text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8" strokeWidth={1} />
          </button>
        </>
      )}

      {/* Dot Navigation */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-300',
                index === currentSlide
                  ? 'bg-white scale-110'
                  : 'bg-white/40 hover:bg-white/60'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Vertical Navigation Bar (decorative) */}
      <div className="absolute right-0 top-0 bottom-0 z-20 flex w-12 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/**
 * Feature Card - Elegant image-focused design
 */
function FeatureCard({
  fields,
  index,
  isEditing,
}: {
  fields: FeatureCardFields;
  index: number;
  isEditing: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedReveal delay={index * 100}>
      <article
        className="group relative cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <div
            className={cn(
              'absolute inset-0 transition-transform duration-700 ease-out',
              isHovered ? 'scale-105' : 'scale-100'
            )}
          >
            {(fields.image?.value?.src || isEditing) && (
              <ContentSdkImage
                field={fields.image}
                className="h-full w-full object-cover"
                width={600}
                height={750}
              />
            )}
          </div>

          {/* Gradient Overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500',
              isHovered ? 'opacity-80' : 'opacity-60'
            )}
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          {/* Subtitle */}
          {(fields.subtitle?.value || isEditing) && (
            <Text
              tag="span"
              field={fields.subtitle}
              className="mb-2 block text-xs font-light uppercase tracking-[0.2em] text-white/70"
            />
          )}

          {/* Title */}
          {(fields.title?.value || isEditing) && (
            <Text
              tag="h3"
              field={fields.title}
              className="font-serif text-xl font-light leading-snug tracking-wide text-white md:text-2xl"
            />
          )}

          {/* Description (reveals on hover) */}
          <div
            className={cn(
              'overflow-hidden transition-all duration-500 ease-out',
              isHovered ? 'mt-4 max-h-32 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            {(fields.description?.value || isEditing) && (
              <RichText
                field={fields.description}
                className="text-sm font-light leading-relaxed text-white/80"
              />
            )}
          </div>

          {/* Link */}
          {fields.link && (fields.link.value?.href || isEditing) && (
            <div
              className={cn(
                'mt-4 transition-all duration-500',
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              )}
            >
              <ContentSdkLink
                field={fields.link}
                className="inline-flex items-center text-xs font-light uppercase tracking-[0.15em] text-white transition-colors hover:text-amber-200"
              >
                Explore
                <span className="ml-2 text-lg">→</span>
              </ContentSdkLink>
            </div>
          )}
        </div>
      </article>
    </AnimatedReveal>
  );
}

/**
 * Features Grid Section
 */
function FeaturesSection({
  fields,
  isEditing,
}: {
  fields: HomepageFields;
  isEditing: boolean;
}) {
  const cards = fields.featureCards?.results || [];

  if (cards.length === 0 && !isEditing) return null;

  return (
    <section className="bg-stone-50 px-6 py-20 md:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {cards.map((card, index) => (
            <FeatureCard key={index} fields={card} index={index} isEditing={isEditing} />
          ))}

          {/* Placeholder cards for editing mode */}
          {isEditing && cards.length === 0 && (
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex aspect-[4/5] items-center justify-center border border-dashed border-stone-300 bg-stone-100"
                >
                  <span className="text-sm text-stone-400">Feature Card {i}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Newsletter/Stay Connected Section
 */
function NewsletterSection({
  fields,
  isEditing,
}: {
  fields: HomepageFields;
  isEditing: boolean;
}) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="relative overflow-hidden bg-stone-900 px-6 py-20 md:px-12 lg:py-28">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-xl text-center">
        <AnimatedReveal>
          {/* Logo/Brand Element */}
          <div className="mb-8 flex justify-center">
            <BrandLogo fields={fields} isEditing={isEditing} variant="light" />
          </div>

          {/* Title */}
          <h2 className="font-serif text-2xl font-light tracking-wide text-white md:text-3xl">
            {fields.newsletterTitle?.value || 'Stay connected'}
          </h2>

          {/* Subtitle */}
          {(fields.newsletterSubtitle?.value || isEditing) && (
            <Text
              tag="p"
              field={fields.newsletterSubtitle}
              className="mt-3 font-sans text-sm font-light text-stone-400"
            />
          )}

          {/* Description */}
          {(fields.newsletterDescription?.value || isEditing) && (
            <RichText
              field={fields.newsletterDescription}
              className="mt-4 font-sans text-sm font-light leading-relaxed text-stone-400"
            />
          )}
        </AnimatedReveal>

        {/* Newsletter Form */}
        <AnimatedReveal delay={150} className="mt-10">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="w-full max-w-sm">
                <Button
                  type="button"
                  onClick={() => {
                    // In a real implementation, this would open a modal or expand the form
                    const emailInput = document.getElementById('newsletter-email');
                    if (emailInput) {
                      emailInput.focus();
                    }
                  }}
                  className="w-full border border-stone-700 bg-transparent px-8 py-6 text-xs font-light uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-stone-500 hover:bg-stone-800"
                >
                  Sign Up
                </Button>
              </div>

              {/* Hidden email input - could be expanded with animation */}
              <div className="mt-4 w-full max-w-sm opacity-0 h-0 overflow-hidden transition-all duration-300 focus-within:opacity-100 focus-within:h-auto focus-within:overflow-visible">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border-b border-stone-700 bg-transparent px-4 py-3 text-sm font-light text-white placeholder-stone-500 focus:border-stone-400 focus:outline-none"
                  required
                />
              </div>
            </form>
          ) : (
            <div className="rounded border border-stone-700 bg-stone-800/50 px-6 py-5">
              <p className="font-light tracking-wide text-stone-300">
                Thank you for subscribing.
              </p>
            </div>
          )}
        </AnimatedReveal>
      </div>
    </section>
  );
}

/**
 * Footer Section
 */
function FooterSection({
  fields,
  isEditing,
}: {
  fields: HomepageFields;
  isEditing: boolean;
}) {
  return (
    <footer className="bg-stone-950 px-6 py-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Logo */}
        <div className="flex justify-center">
          <BrandLogo fields={fields} isEditing={isEditing} variant="light" />
        </div>

        {/* Social Links Placeholder */}
        <div className="mt-8 flex justify-center gap-6">
          {['Facebook', 'Instagram', 'Twitter', 'YouTube', 'Pinterest'].map((social) => (
            <button
              key={social}
              className="text-stone-500 transition-colors hover:text-white"
              aria-label={social}
            >
              <div className="h-5 w-5 rounded-full bg-current" />
            </button>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-8 text-center text-xs font-light tracking-wide text-stone-600">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}

// ============================================================================
// Main Component Export
// ============================================================================

/**
 * Luxury Homepage Component
 * Inspired by One&Only Resorts - sophisticated, cinematic design with
 * full-screen hero carousel, elegant typography, and refined interactions
 */
export const Default: React.FC<HomepageProps> = (props) => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields: propsFields, params } = props;

  const { data } = propsFields || {};
  const { datasource } = data || {};
  const fields = datasource || {};

  if (!propsFields) {
    return <NoDataFallback componentName="Homepage" />;
  }

  return (
    <main
      data-component="Homepage"
      className={cn('min-h-screen bg-stone-950', params?.styles)}
    >
      <HeroSection fields={fields} isEditing={isEditing} />
      <FeaturesSection fields={fields} isEditing={isEditing} />
      <NewsletterSection fields={fields} isEditing={isEditing} />
      <FooterSection fields={fields} isEditing={isEditing} />
    </main>
  );
};

/**
 * Minimal Variant - Hero only with clean aesthetic
 */
export const Minimal: React.FC<HomepageProps> = (props) => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields: propsFields, params } = props;

  const { data } = propsFields || {};
  const { datasource } = data || {};
  const fields = datasource || {};

  if (!propsFields) {
    return <NoDataFallback componentName="Homepage" />;
  }

  return (
    <main
      data-component="Homepage"
      className={cn('min-h-screen bg-stone-950', params?.styles)}
    >
      <HeroSection fields={fields} isEditing={isEditing} />
    </main>
  );
};

/**
 * Full Variant - All sections with enhanced styling
 */
export const Full: React.FC<HomepageProps> = (props) => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields: propsFields, params } = props;

  const { data } = propsFields || {};
  const { datasource } = data || {};
  const fields = datasource || {};

  if (!propsFields) {
    return <NoDataFallback componentName="Homepage" />;
  }

  return (
    <main
      data-component="Homepage"
      className={cn('min-h-screen bg-stone-950', params?.styles)}
    >
      <HeroSection fields={fields} isEditing={isEditing} />
      <FeaturesSection fields={fields} isEditing={isEditing} />
      <NewsletterSection fields={fields} isEditing={isEditing} />
      <FooterSection fields={fields} isEditing={isEditing} />
    </main>
  );
};

/**
 * Light Variant - Light background theme
 */
export const Light: React.FC<HomepageProps> = (props) => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields: propsFields, params } = props;

  const { data } = propsFields || {};
  const { datasource } = data || {};
  const fields = datasource || {};

  if (!propsFields) {
    return <NoDataFallback componentName="Homepage" />;
  }

  return (
    <main
      data-component="Homepage"
      className={cn('min-h-screen bg-stone-50', params?.styles)}
    >
      <HeroSection fields={fields} isEditing={isEditing} />
      <FeaturesSection fields={fields} isEditing={isEditing} />
      <NewsletterSection fields={fields} isEditing={isEditing} />
      <FooterSection fields={fields} isEditing={isEditing} />
    </main>
  );
};
