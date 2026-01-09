import { ImageField, Field, LinkField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface ThreeImageCardFields {
  image: ImageField;
  title: Field<string>;
  description: Field<string>;
  link: LinkField;
}

export interface ThreeImageCard {
  id: string;
  fields: ThreeImageCardFields;
}

export interface ThreeImageFields {
  cards?: ThreeImageCard[];
  // GraphQL datasource structure
  data?: {
    datasource?: {
      children?: {
        results: ThreeImageCard[];
      };
    };
  };
}

export interface ThreeImageProps extends ComponentProps {
  fields?: ThreeImageFields;
  isPageEditing?: boolean;
}

