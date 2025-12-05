import React, { JSX } from 'react'
import { ComponentProps } from 'lib/component-props';
import { withDatasourceCheck, Field, ImageField, LinkField, Link, Image, Text } from '@sitecore-content-sdk/nextjs';

export type HeroBannerProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Image: ImageField;
    CTA1: LinkField;
    CTA2: LinkField;
  }
}

const HeroBanner = (props: HeroBannerProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`relative px-4 py-20 md:px-8 md:py-32 max-w-7xl mx-auto overflow-hidden ${sxaStyles}`}>
      <div className="absolute inset-0 -z-10">
        <img src="/modern-healthcare-data-center-technology-abstract-.png" alt="" className="w-full h-full object-cover opacity-5" />
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <Text field={props.fields.Title} />
          </h1>
          <p className="text-lg text-muted-foreground">
            <Text field={props.fields.Subtitle} />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium w-full sm:w-auto">
              <Link field={props.fields.CTA1} />
            </button>
            <button className="px-6 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition font-medium">
              <Link field={props.fields.CTA2} />
            </button>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden border border-accent/20">
          <Image field={props.fields.Image} className="w-full h-96" />
        </div>
      </div>
    </section>
  )
}

export const Default = withDatasourceCheck()<HeroBannerProps>(HeroBanner);
