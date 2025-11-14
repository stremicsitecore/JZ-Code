import React, { JSX, useState } from 'react'
import { ComponentProps } from 'lib/component-props';
import { withDatasourceCheck, Field, ImageField, LinkField, Link, Image, Text, RichText } from '@sitecore-content-sdk/nextjs';
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type CarouselBannerProps = ComponentProps & {
  fields: {
    Title: Field<string>,
    Subtitle: Field<string>,
    Url: LinkField,
    Slides: [{
      url: string,
      fields: {
        Title: Field<string>,
        Content: Field<string>,
        Image: ImageField,
      }
    }];
  }
}

const CarouselBanner = (props: CarouselBannerProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? props.fields.Slides.length - 1 : prev - 1));
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === props.fields.Slides.length - 1 ? 0 : prev + 1));
  }

  const slide = props.fields.Slides[currentSlide];

  return (
    <section className={`w-full bg-slate-50 ${sxaStyles}`}>
      <div className="flex flex-col lg:flex-row items-stretch min-h-[600px]">
        <div className="w-full lg:w-1/2 bg-slate-900 text-white flex flex-col justify-center px-8 sm:px-12 py-12 lg:py-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
            <Text field={props.fields.Title} />
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-8 opacity-90">
            <Text field={props.fields.Subtitle} />
          </p>
          <div className="inline-flex">
            <Link field={props.fields.Url}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Learn More <ChevronRight size={20} />
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white relative">
          <div className="relative w-full h-full">
            <Image field={slide.fields.Image} className="w-full h-full object-cover" />

            <button
              onClick={goToPrevious}
              className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 bg-white text-slate-900 p-2 rounded-full shadow-lg hover:bg-slate-100 transition-colors z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 bg-white text-slate-900 p-2 rounded-full shadow-lg hover:bg-slate-100 transition-colors z-20"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="absolute bottom-6 sm:bottom-8 lg:bottom-12 left-6 sm:left-8 lg:left-12 right-6 sm:right-8 lg:right-12 bg-blue-500 text-white rounded-lg p-6 sm:p-8 z-10">
            <h3 className="text-xl sm:text-2xl font-bold mb-3"><Text field={slide.fields.Title} /></h3>
            <div className="text-sm sm:text-base leading-relaxed mb-4 opacity-95">
              <RichText field={slide.fields.Content} />
            </div>
            <a
              href={slide.url}
              className="inline-block text-white font-semibold hover:underline"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export const Default = withDatasourceCheck()<CarouselBannerProps>(CarouselBanner);
