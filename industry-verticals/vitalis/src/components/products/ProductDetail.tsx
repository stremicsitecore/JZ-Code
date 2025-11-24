import React, { JSX } from 'react';
import {
  RichText,
  Text,
  Field,
  ImageField,
  Image,
  Placeholder,
  LinkField,
  Link as SitecoreLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type ProductDetailProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Content: Field<string>;
    Features: [{
      fields: {
        Title: Field<string>;
        Description: Field<string>;
        Icon: ImageField;
      }
    }],
    BannerUrl: LinkField;
    BannerTitle: Field<string>;
    BannerDescription: Field<string>;
    BannerLink: LinkField;
  };
};

const ProductDetail = (props: ProductDetailProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <>
      <div className="relative">
        <video autoPlay muted loop playsInline className="inset-0 w-full max-h-80 object-cover">
          <source
            src={props.fields.BannerUrl.value.href}
            type="video/mp4"
          />

        </video>
        <div className="text-primary-foreground absolute top-8 left-8 z-10 ">
          <Link href="/products" className="flex items-center gap-2 hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          <h2 className="text-4xl md:text-5xl font-bold mb-4"><Text field={props.fields.BannerTitle} /></h2>
          <p><Text field={props.fields.BannerDescription} /></p>
          <SitecoreLink field={props.fields.BannerLink} />
        </div>
      </div>
      <section className={`px-4 py-4 md:py-4 ${sxaStyles}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4"><Text field={props.fields.Title} /></h1>
        </div>
      </section>

      <section className="px-4 py-4 md:py-4 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="text-lg text-muted-foreground leading-relaxed"><RichText field={props.fields.Content} /></div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Business Benefits</h3>
            <ul className="space-y-4">
              {props.fields.Features.map((feature, index) => (
                <li key={index} className="flex gap-3">
                  <Image field={feature.fields.Icon} className="w-16 h-16" />
                  <span className="text-muted-foreground"><Text field={feature.fields.Title} /></span>
                  <span className="text-muted-foreground"><Text field={feature.fields.Description} /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Placeholder rendering={props.rendering} name="product-detail-cta" />
    </>
  );
};

export const Default = ProductDetail;
