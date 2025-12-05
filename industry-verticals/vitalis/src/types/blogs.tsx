import { Field, ImageField } from '@sitecore-content-sdk/nextjs';

export type ArticleDetail = {
  name: Field<string>;
  fields: {
    Title: Field<string>;
    Excerpt: Field<string>;
    PublishDate: Field<string>;
    Image: ImageField;
    Category: {
      fields: {
        Name: Field<string>;
      }
    }
  };
  url: string;
};
