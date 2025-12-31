import { Text, RichText } from '@sitecore-content-sdk/nextjs';
import { ButtonBase as Button } from '@/components/button-component/ButtonComponent';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { PromoImageProps } from './promo-image.props';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { useMatchMedia } from '@/hooks/use-match-media';

export const PromoImageDefault: React.FC<PromoImageProps> = (props) => {
  const { fields, isPageEditing } = props;
  const prefersReducedMotion = useMatchMedia('(prefers-reduced-motion: reduce)');

  if (fields) {
    const { image, heading, description, link } = fields;
    const hasLink = isPageEditing || link?.value?.href;

    return (
      <section
        data-component="Promo Image"
        className="@container border-b border-neutral-200"
      >
        <div className="@lg:grid-cols-2 grid min-h-[600px]">
          {/* Content Column */}
          <div className="@lg:py-20 @xl:px-28 @lg:px-16 bg-neutral-50 flex flex-col justify-center overflow-visible px-8 py-16">
            <div className="max-w-[540px] pb-8">
              {heading && (
                <AnimatedSection
                  direction="right"
                  isPageEditing={isPageEditing}
                  reducedMotion={prefersReducedMotion}
                >
                  <Text
                    tag="h2"
                    className="font-heading @lg:text-4xl @xl:text-5xl text-foreground mb-8 text-pretty text-3xl font-light leading-tight tracking-tight"
                    field={heading}
                  />
                </AnimatedSection>
              )}

              {description && (
                <AnimatedSection
                  direction="right"
                  isPageEditing={isPageEditing}
                  reducedMotion={prefersReducedMotion}
                  delay={600}
                >
                  <RichText
                    className="text-foreground @lg:text-base mb-8 max-w-prose text-sm leading-relaxed"
                    field={description}
                  />
                </AnimatedSection>
              )}

              {/* Status badge */}
              <div className="mb-6">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider">
                  RESORT NOW OPEN
                </span>
              </div>

              {hasLink && (
                <AnimatedSection
                  direction="right"
                  isPageEditing={isPageEditing}
                  reducedMotion={prefersReducedMotion}
                  delay={1200}
                >
                  <Button 
                    buttonLink={link} 
                    isPageEditing={isPageEditing}
                    className="border-foreground text-foreground hover:bg-foreground hover:text-background border bg-transparent px-8 py-3 transition-colors duration-200"
                  />
                </AnimatedSection>
              )}
            </div>
          </div>

          {/* Image Column */}
          {image && (
            <div className="@lg:block relative hidden min-h-[600px]">
              <ImageWrapper
                image={image}
                className="h-full w-full object-cover"
                wrapperClass="w-full h-full"
                priority={true}
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="Promo Image" />;
};