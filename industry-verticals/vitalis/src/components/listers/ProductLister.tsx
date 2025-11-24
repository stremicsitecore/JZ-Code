import React, { JSX } from 'react';
import Link from 'next/link';
import {
  Image,
  RichText,
  Text,
  Field,
  ImageField,
} from '@sitecore-content-sdk/nextjs';
import { ChevronRight } from 'lucide-react';
import { ComponentProps } from 'lib/component-props';

type ProductListerProps = ComponentProps & {
  fields: {
    items: [{
      url: string;
      fields: {
        Title: Field<string>;
        Content: Field<string>;
        Image: ImageField;
      }
    }]
  };
};

const ProductLister = (props: ProductListerProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`px-4 py-8 md:py-8 max-w-7xl mx-auto ${sxaStyles}`}>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-12">
        Comprehensive solutions designed for healthcare organizations of all sizes.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {props.fields.items.map((product, index) => (
          <Link key={index} href={`${product.url}`}>
            <div className="rounded-lg border border-border hover:border-accent bg-card hover:bg-secondary transition cursor-pointer group overflow-hidden flex flex-col h-full">
              <div className="image-card relative h-48 overflow-hidden bg-secondary">
                <Image field={product.fields.Image} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition"><Text field={product.fields.Title} /></h3>
                <div className="text-muted-foreground mb-6"><RichText field={product.fields.Content} /></div>
                <div className="flex items-center gap-2 text-accent text-sm font-medium">
                  Learn more <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export const Default = ProductLister;