import React, { JSX } from 'react'
import { ComponentProps } from 'lib/component-props';
import { withDatasourceCheck, Field, LinkField, Text } from '@sitecore-content-sdk/nextjs';
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link';

export type VideoBannerProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    VideoUrl: LinkField;
    SelectedContent: [{
      fields: {
        Title: Field<string>;
        Text: Field<string>;
      }
    }]
  }
}

const VideoBanner = (props: VideoBannerProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`relative ${sxaStyles}`}>
      <video autoPlay muted loop playsInline className="inset-0 w-full max-h-80 object-cover">
        <source
          src={props.fields.VideoUrl.value.href}
          type="video/mp4"
        />
      </video>
      <div className="text-primary-foreground absolute top-8 left-8 z-10 ">
        <Link href="/products" className="flex items-center gap-2 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <h2 className="text-4xl md:text-5xl font-bold mb-4"><Text field={props.fields.Title} /></h2>
        <p><Text field={props.fields.Subtitle} /></p>
      </div>
    </div>
  )
}

export const Default = withDatasourceCheck()<VideoBannerProps>(VideoBanner);

const VideoBannerWColumns = (props: VideoBannerProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`relative w-full h-[600px] overflow-hidden ${sxaStyles}`}>
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source
          src={props.fields.VideoUrl.value.href}
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-foreground/40" />

      <div className="relative w-full h-full flex flex-col justify-between p-8 md:p-12 lg:p-16">
        <div className="flex flex-col justify-center flex-1">
          <h1 className="text-primary-foreground text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            <Text field={props.fields.Title} />
          </h1>
          <p className="text-primary-foreground text-lg md:text-xl lg:text-2xl max-w-3xl text-balance opacity-90">
            <Text field={props.fields.Subtitle} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
          {props.fields.SelectedContent.map((column, index) => (
            <div
              key={index}
              className="backdrop-blur-sm bg-background/30 rounded-lg p-6 border border-primary-foreground/10 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="text-primary-foreground text-xl font-bold mb-4"><Text field={column.fields.Title} /></h3>
                <p className="text-primary-foreground/90 text-sm leading-relaxed"><Text field={column.fields.Text} /></p>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t border-primary-foreground/10">
                <button className="text-primary-foreground hover:text-primary-foreground/80 transition-colors p-2">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const VideoBannerWithColumns = withDatasourceCheck()<VideoBannerProps>(VideoBannerWColumns);
