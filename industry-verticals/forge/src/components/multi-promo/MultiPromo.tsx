import { useState, useEffect, useRef } from 'react';
import { debounce } from 'radash';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { MultiPromoItemProps, MultiPromoProps } from './multi-promo.props';
import { Default as MultiPromoItem } from './MultiPromoItem.dev';

export const Default: React.FC<MultiPromoProps> = (props) => {
  const { fields, params } = props;
  const { numColumns } = params || {};
  const { children } = fields?.data?.datasource || {};
  const [api, setApi] = useState<CarouselApi>();
  const [announcement, setAnnouncement] = useState('');
  const carouselRef = useRef<HTMLDivElement>(null);

  // General slide handling
  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      const newIndex = api.selectedScrollSnap();

      // Announce slide change
      setAnnouncement(`Slide ${newIndex + 1} of ${children?.results.length}`);
    });

    // Add mousewheel event listener and keyboard event listener
    const debouncedHandleWheel = debounce({ delay: 100 }, (event: WheelEvent) => {
      if (event.deltaX > 0) {
        api.scrollNext();
      } else if (event.deltaX < 0) {
        api.scrollPrev();
      }
    });

    const debouncedHandleKeyDown = debounce({ delay: 100 }, (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        api?.scrollPrev();
      } else if (event.key === 'ArrowRight') {
        api?.scrollNext();
      }
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); // Prevent default scrolling behavior
        debouncedHandleKeyDown(event);
      }
    };

    const rootNode = api.rootNode();
    rootNode.addEventListener('keydown', handleKeyDown);
    rootNode.addEventListener('wheel', debouncedHandleWheel);

    return () => {
      rootNode.removeEventListener('keydown', handleKeyDown);
      debouncedHandleKeyDown.cancel();
      rootNode.removeEventListener('wheel', debouncedHandleWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  if (fields) {
    return (
      <section
        className={cn('component multi-promo bg-white py-16 md:py-24', {
          [props?.params?.styles]: props?.params?.styles,
        })}
      >
        {/* Promo cards carousel */}
        {children && (
          <>
            <Carousel
              setApi={setApi}
              opts={{
                align: 'end',
                loop: true,
                skipSnaps: true,
              }}
              className="relative ml-auto mr-8 w-fit max-w-[90%] md:mr-12 lg:mr-16 xl:mr-24"
              ref={carouselRef}
            >
              <CarouselContent className="-ml-6 md:-ml-8">
                {children?.results?.map((item: MultiPromoItemProps, index: number) => (
                  <CarouselItem
                    key={index}
                    className={cn(
                      'pl-6 transition-opacity duration-300 md:pl-8',
                      {
                        'basis-[85%] sm:basis-1/2 lg:basis-1/3': numColumns === '3' || !numColumns,
                        'basis-[85%] sm:basis-1/2 md:basis-1/3 xl:basis-1/4': numColumns === '4',
                      }
                    )}
                  >
                    <MultiPromoItem key={index} {...item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {announcement}
            </div>
          </>
        )}
      </section>
    );
  }

  return <NoDataFallback componentName="Multi Promo" />;
};
