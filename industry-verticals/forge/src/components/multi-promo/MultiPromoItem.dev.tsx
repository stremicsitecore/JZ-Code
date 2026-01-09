import { Link, RichText, Text } from '@sitecore-content-sdk/nextjs';
import { MultiPromoItemProps } from '@/components/multi-promo/multi-promo.props';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';

const mapToItemProps = (fields: MultiPromoItemProps) => {
  return {
    title: fields?.heading?.jsonValue,
    description: fields?.description?.jsonValue,
    image: fields?.image?.jsonValue,
    link: fields?.link?.jsonValue,
  };
};

export const Default: React.FC<MultiPromoItemProps> = (props) => {
  const itemProps = mapToItemProps(props || {});
  const { title, description, image, link } = itemProps || {};

  return (
    <article className="flex h-full flex-col">
      {image && (
        <ImageWrapper
          image={image}
          className="aspect-[4/5] w-full object-cover"
          wrapperClass="aspect-[4/5] w-full mb-8"
        />
      )}
      <div className="flex flex-1 flex-col">
        {title && (
          <Text
            tag="h3"
            field={title}
            className="font-heading text-box-trim-both mb-4 text-sm font-normal uppercase tracking-[0.2em] antialiased"
          />
        )}
        {description && (
          <RichText
            field={description}
            className="text-body mb-6 flex-1 text-base leading-relaxed text-neutral-600 antialiased"
          />
        )}
        {link && (
          <Link
            field={link}
            className="mt-auto w-fit text-xs font-normal uppercase tracking-[0.15em] text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-600"
          />
        )}
      </div>
    </article>
  );
};
