import { ComponentProps } from '@/lib/component-props';
import {
  Field,
  LinkField,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  CarouselTitle: Field<string>;
  CarouselDescription: RichTextField;
  CarouselExplore: LinkField;
}

export type CarouselProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: CarouselProps) => {
  console.log(props);
  return (
    <div>my div</div>
  );
};
