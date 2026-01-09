import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Text, ImageField } from '@sitecore-content-sdk/nextjs';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { ButtonBase } from '@/components/button-component/ButtonComponent';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { HeroProps } from './hero.props';
import Image from 'next/image';

// Default hero image fallback
const FALLBACK_HERO_IMAGE =
  'https://starter-verticals.sitecoresandbox.cloud/api/public/content/00c24fd6f70e426aacb6149748ba5bbd?v=65e51b51';

export const HeroImageRight: React.FC<HeroProps> = (props) => {
  const { fields, isPageEditing } = props;
  const { title, description, bannerCTA, image } = fields || {};
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (fields) {
    // Get the image source - use Sitecore image or fallback
    const heroImageSrc = (image as ImageField)?.value?.src || FALLBACK_HERO_IMAGE;
    const heroImageAlt = (image as ImageField)?.value?.alt || 'Hero background';

    return (
      <section
        data-component="Hero"
        className="@container/herowrapper relative w-full overflow-hidden"
      >
        {/* Full-bleed Hero Image with Centered Text Overlay */}
        <div className="relative w-full">
          {/* Hero Background Image */}
          <div
            className={cn(
              'relative w-full',
              'h-[60vh] min-h-[450px] @md/herowrapper:h-[75vh] @lg/herowrapper:h-[85vh] @lg/herowrapper:min-h-[600px]'
            )}
          >
            <Image
              src={heroImageSrc}
              alt={heroImageAlt as string}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              unoptimized
            />
          </div>

          {/* Subtle gradient overlay for text readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

          {/* Centered Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <AnimatedSection
              direction="up"
              isPageEditing={isPageEditing}
              reducedMotion={prefersReducedMotion}
            >
              <Text
                tag="h1"
                field={title}
                className={cn(
                  'font-serif text-white',
                  'text-base @sm/herowrapper:text-lg @md/herowrapper:text-xl @lg/herowrapper:text-2xl',
                  'font-light tracking-[0.4em] uppercase',
                  'drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
                )}
              />
            </AnimatedSection>

            {description && (
              <AnimatedSection
                direction="up"
                isPageEditing={isPageEditing}
                reducedMotion={prefersReducedMotion}
                delay={200}
              >
                <Text
                  tag="p"
                  field={description}
                  className={cn(
                    'mt-4 max-w-2xl text-white',
                    'text-sm @sm/herowrapper:text-sm @md/herowrapper:text-base @lg/herowrapper:text-base',
                    'font-light leading-relaxed',
                    'drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]'
                  )}
                />
              </AnimatedSection>
            )}

            {bannerCTA?.value?.href && (
              <AnimatedSection
                direction="up"
                isPageEditing={isPageEditing}
                reducedMotion={prefersReducedMotion}
                delay={400}
                className="mt-10"
              >
                <ButtonBase
                  buttonLink={bannerCTA}
                  variant="secondary"
                  isPageEditing={isPageEditing}
                  className="border-white/80 bg-transparent text-white hover:bg-white hover:text-black"
                />
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="Hero" />;
};
