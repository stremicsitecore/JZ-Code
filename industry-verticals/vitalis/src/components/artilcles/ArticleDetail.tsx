import React, { JSX } from 'react';
import {
  RichText,
  Text,
  Field,
  ImageField,
  Image,
  DateField,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { newsDateFormatter } from '../../helpers/DateHelper';

type ArticleDetailProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    PublishDate: Field<string>;
    Image: ImageField;
    Content: Field<string>;
    Category: {
      fields: {
        Name: Field<string>;
      }
    }
  };
};

const ArticleDetail = (props: ArticleDetailProps): JSX.Element => {
  console.log(props);
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <>
      <section className={`relative h-64 md:h-96 overflow-hidden bg-secondary ${sxaStyles}`}>
        <Image field={props.fields.Image} className="w-full h-full object-cover" />
      </section>

      <article>
        <section className="px-4 py-4 md:py-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/articles" className="flex items-center gap-2 text-accent hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Articles
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                <Text field={props.fields.Category.fields.Name} />
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4"><Text field={props.fields.Title} /></h1>
            <p className="text-lg text-muted-foreground">
              <DateField
                tag="span"
                className="news-date"
                field={props.fields.PublishDate}
                render={newsDateFormatter}
              />
            </p>
          </div>
          <div className="max-w-3xl mx-auto prose-invert text-lg text-muted-foreground leading-relaxed space-y-6 mb-12 py-4">
            <RichText field={props.fields.Content} />
          </div>

          <Placeholder rendering={props.rendering} name="article-detail" />
        </section>

        <section className="px-4 py-4 max-w-3xl mx-auto prose-invert">

        </section>
      </article>
    </>
  );
};

export const Default = ArticleDetail;
