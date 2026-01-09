import { Text, RichText, Link as SitecoreLink } from '@sitecore-content-sdk/nextjs';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { ThreeImageProps, ThreeImageCard } from './three-image.props';
import { cn } from '@/lib/utils';
import NextImage from 'next/image';

/**
 * Three Image Card Component
 * A luxurious three-column card layout featuring portrait images,
 * elegant typography, and "EXPLORE" call-to-action links.
 * 
 * Design inspired by One&Only Resorts aesthetic.
 */

interface CardItemProps {
  card: ThreeImageCard;
  isPageEditing?: boolean;
}

const CardItem: React.FC<CardItemProps> = ({ card, isPageEditing }) => {
  const { image, title, description, link } = card.fields || {};
  const hasLink = isPageEditing || link?.value?.href;
  const imageSrc = image?.value?.src;
  const imageAlt = typeof image?.value?.alt === 'string' ? image.value.alt : '';

  return (
    <article className="group flex flex-col">
      {/* Image Container - Portrait aspect ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        {imageSrc && (
          <NextImage
            src={imageSrc}
            alt={imageAlt}
            fill
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={imageSrc.includes('unsplash.com')}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-8">
        {/* Title - Uppercase with elegant letter-spacing */}
        {(title?.value || isPageEditing) && (
          <Text
            tag="h3"
            field={title}
            className="font-heading mb-4 text-sm font-normal uppercase tracking-[0.2em] text-neutral-800"
          />
        )}

        {/* Description */}
        {(description?.value || isPageEditing) && (
          <RichText
            field={description}
            className="mb-6 flex-1 text-[15px] leading-relaxed text-neutral-600"
          />
        )}

        {/* Explore Link */}
        {hasLink && (
          <SitecoreLink
            field={link}
            className="inline-flex items-center text-xs font-normal uppercase tracking-[0.2em] text-neutral-800 transition-colors duration-300 hover:text-neutral-500"
          >
            <span className="border-b border-neutral-800 pb-0.5 transition-colors duration-300 group-hover:border-neutral-500">
              {link?.value?.text || 'Explore'}
            </span>
          </SitecoreLink>
        )}
      </div>
    </article>
  );
};

export const ThreeImageDefault: React.FC<ThreeImageProps> = (props) => {
  const { fields, isPageEditing, params } = props;

  // Support both direct cards array and GraphQL datasource structure
  const cards = fields?.cards || fields?.data?.datasource?.children?.results || [];

  if (!fields || (!cards.length && !isPageEditing)) {
    return <NoDataFallback componentName="Three Image" />;
  }

  return (
    <section
      data-component="Three Image"
      className={cn(
        'component three-image',
        'bg-white py-16 md:py-24',
        params?.styles
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Three Column Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {cards.map((card, index) => (
            <CardItem 
              key={card.id || index} 
              card={card} 
              isPageEditing={isPageEditing} 
            />
          ))}

          {/* Placeholder cards for editing mode */}
          {isPageEditing && cards.length < 3 && (
            Array.from({ length: 3 - cards.length }).map((_, index) => (
              <div 
                key={`placeholder-${index}`}
                className="flex flex-col rounded border-2 border-dashed border-neutral-300 bg-neutral-50 p-8"
              >
                <div className="aspect-[4/5] w-full bg-neutral-200" />
                <div className="pt-8">
                  <p className="text-sm text-neutral-500">Add card content</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ThreeImageDefault;

