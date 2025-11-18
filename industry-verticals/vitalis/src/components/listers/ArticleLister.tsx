import React, { JSX } from 'react';
import Link from 'next/link';
import {
  Text,
  Image,
  withDatasourceCheck,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ArticleDetail } from 'src/types/blogs';
import { ChevronRight } from "lucide-react"

type ArticleListerProps = ComponentProps & {
  fields: {
    items: ArticleDetail[];
  };
};

const ArticleLister = (props: ArticleListerProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`px-4 py-16 md:py-24 max-w-7xl mx-auto ${sxaStyles}`}>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources & Insights</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-12">
        Explore case studies, guides, and industry insights to stay ahead in healthcare operations.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {props.fields.items.map((article, index) => (
          <Link key={index} href={article.url}>
            <div className="rounded-lg border border-border hover:border-accent bg-card hover:bg-secondary transition cursor-pointer group h-full flex flex-col overflow-hidden">
              <div className="image-card relative h-40 overflow-hidden bg-secondary">
                <Image field={article.fields.Image} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                    <Text field={article.fields.Category.fields.Name} />
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition"><Text field={article.fields.Title} /></h3>
                <p className="text-sm text-muted-foreground mb-6 flex-grow"><Text field={article.fields.Excerpt} /></p>
                <div className="flex items-center gap-2 text-accent text-sm font-medium">
                  Read More <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<ArticleListerProps>(ArticleLister);
