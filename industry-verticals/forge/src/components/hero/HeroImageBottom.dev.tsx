'use client';

import { useState, useEffect } from 'react';
import { Text, ImageField } from '@sitecore-content-sdk/nextjs';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { ButtonBase } from '@/components/button-component/ButtonComponent';
import type { HeroProps } from './hero.props';

// Default image for development/preview
const defaultImage: ImageField = {
  value: {
    src: '/hero-image-bottom-lifestyle.webp',
    alt: 'Woman wearing sunglasses relaxing in open-top car on adventure',
    width: 1920,
    height: 1080,
  },
};

export const HeroImageBottom: React.FC<HeroProps> = (props) => {
  const { fields, isPageEditing } = props;
  const { title, description, image, bannerCTA } = fields || {};
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Use default image if no Sitecore image is provided
  const heroImage = image?.value?.src ? image : defaultImage;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (fields) {
    return (
      <section
        data-component="HeroImageBottom"
        className="@container/herowrapper bg-background text-foreground relative w-full overflow-hidden"
      >
        <div className="relative">
          {/* Background Image - Elegant resort-style presentation */}
          <ImageWrapper
            image={heroImage}
            wrapperClass="absolute w-full inset-0"
            className="h-full w-full object-cover object-center"
            priority={true}
          />

          {/* Gradient overlay - sophisticated dark-to-transparent for luxury feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 pointer-events-none"></div>

          {/* Decorative accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent pointer-events-none"></div>

          {/* Content - Compact checkout-style hero */}
          <div className="relative z-10 mx-auto flex min-h-[40vh] max-w-[1240px] flex-col items-start justify-end px-5 pb-12 pt-20 text-left @md/herowrapper:min-h-[45vh] @md/herowrapper:px-10 @md/herowrapper:pb-16 @lg/herowrapper:px-24">
            {/* Title - Refined typography */}
            <AnimatedSection
              direction="up"
              className="relative z-20"
              isPageEditing={isPageEditing}
              reducedMotion={prefersReducedMotion}
            >
              <Text
                tag="h1"
                field={title}
                className="font-heading text-white text-[clamp(1.75rem,4vw,2.75rem)] font-extralight uppercase leading-tight tracking-[0.2em]"
              />
            </AnimatedSection>

            {/* Decorative divider */}
            <AnimatedSection
              direction="up"
              isPageEditing={isPageEditing}
              reducedMotion={prefersReducedMotion}
              delay={100}
              className="mt-4"
            >
              <div className="h-px w-16 bg-amber-400/80"></div>
            </AnimatedSection>

            {/* Description */}
            <AnimatedSection
              direction="up"
              isPageEditing={isPageEditing}
              reducedMotion={prefersReducedMotion}
              delay={200}
              className="mt-4"
            >
              {description && (
                <Text
                  tag="p"
                  className="text-white/90 max-w-[45ch] text-pretty text-base font-light leading-relaxed tracking-wide @md/herowrapper:text-lg"
                  field={description}
                />
              )}
            </AnimatedSection>

            {/* CTA Button - Elegant styling */}
            {bannerCTA && (
              <AnimatedSection
                direction="up"
                isPageEditing={isPageEditing}
                reducedMotion={prefersReducedMotion}
                delay={300}
                className="mt-6"
              >
                <ButtonBase
                  buttonLink={bannerCTA}
                  variant="outline"
                  isPageEditing={isPageEditing}
                  className="border-amber-400/60 text-white hover:bg-amber-400/10 hover:border-amber-400 bg-transparent px-8 py-2 text-sm uppercase tracking-[0.15em] transition-all duration-300"
                />
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="HeroImageBottom" />;
};

