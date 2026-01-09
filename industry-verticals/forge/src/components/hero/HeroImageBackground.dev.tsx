'use client';

import { useState, useEffect } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { ButtonBase } from '@/components/button-component/ButtonComponent';
import type { HeroProps } from './hero.props';

export const HeroImageBackground: React.FC<HeroProps> = (props) => {
  const { fields, isPageEditing } = props;
  const { title, description, image, bannerCTA } = fields || {};
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (fields) {
    return (
      <section
        data-component="Hero"
        className="@container/herowrapper bg-background text-foreground relative w-full overflow-hidden"
      >
        <div className="relative">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full z-10">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            >
              <source
                src="https://assets.kerzner.com/api/public/content/d4d3136309ce4e51ad8e95c2fa8cda87?v=924a05e1"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Background Image */}
          <ImageWrapper
            image={image}
            wrapperClass="absolute w-full inset-0"
            className="h-full w-full object-cover"
            priority={true}
          />

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30 z-20 pointer-events-none"></div>

          {/* Content - Centered */}
          <div className="relative z-30 mx-auto flex min-h-[60vh] max-w-[1240px] flex-col items-center justify-center px-5 py-20 text-center @md/herowrapper:min-h-[70vh] @md/herowrapper:px-10 @lg/herowrapper:px-24">
            {/* Title */}
            <AnimatedSection
              direction="up"
              className="relative z-20"
              isPageEditing={isPageEditing}
              reducedMotion={prefersReducedMotion}
            >
              <Text
                tag="h1"
                field={title}
                className="font-heading text-white text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight tracking-[0.15em]"
              />
            </AnimatedSection>

            {/* Description */}
            <AnimatedSection
              direction="up"
              isPageEditing={isPageEditing}
              reducedMotion={prefersReducedMotion}
              delay={200}
              className="mt-6"
            >
              {description && (
                <Text
                  tag="p"
                  className="text-white mx-auto max-w-[50ch] text-pretty text-lg leading-relaxed @md/herowrapper:text-xl"
                  field={description}
                />
              )}
            </AnimatedSection>

            {/* CTA Button */}
            {bannerCTA && (
              <AnimatedSection
                direction="up"
                isPageEditing={isPageEditing}
                reducedMotion={prefersReducedMotion}
                delay={400}
                className="mt-8"
              >
                <ButtonBase
                  buttonLink={bannerCTA}
                  variant="outline"
                  isPageEditing={isPageEditing}
                  className="border-white text-white bg-transparent"
                />
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="Hero" />;
}