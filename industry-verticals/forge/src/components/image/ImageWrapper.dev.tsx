import { useContext } from 'react';
import { cn } from '@/lib/utils';
import { ImageField, Image as ContentSdkImage, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ImageOptimizationContext } from '@/components/image/image-optimization.context';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import NextImage, { ImageProps } from 'next/image';
import placeholderImageLoader from '@/utils/placeholderImageLoader';

type ImageWrapperProps = {
  image?: ImageField;
  className?: string;
  priority?: boolean;
  sizes?: string;
  blurDataURL?: string;
  alt?: string;
  wrapperClass?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const Default: React.FC<ImageWrapperProps> = (props) => {
  const { image, className, wrapperClass, sizes, ...rest } = props;
  const { page } = useSitecore();
  const { isEditing, isPreview } = page.mode;

  const { unoptimized } = useContext(ImageOptimizationContext);
  const ref = useRef(null);
  const inView = useInView(ref);

  if (!isEditing && !image?.value?.src) {
    console.debug('image not found', image);
    return <></>;
  }

  const imageSrc = image?.value?.src ? image?.value?.src : '';
  const isSvg = imageSrc.includes('.svg');
  // if  unoptimized || svg || external
  const isUnoptimized =
    unoptimized ||
    isSvg ||
    (imageSrc.startsWith('https://') &&
      (typeof window !== 'undefined' ? !imageSrc.includes(window.location.hostname) : false));

  const isPicsumImage = imageSrc.includes('picsum.photos');

  // Check if image has explicit dimensions
  const hasExplicitDimensions = image?.value?.width && image?.value?.height;

  return (
    <div className={cn('image-container relative', wrapperClass)}>
      {isEditing || isPreview || isSvg ? (
        <ContentSdkImage field={image} className={className} />
      ) : hasExplicitDimensions ? (
        <NextImage
          key={image?.value?.src}
          loader={isPicsumImage ? placeholderImageLoader : undefined}
          {...(image?.value as ImageProps)}
          className={className}
          unoptimized={isUnoptimized}
          priority={inView ? true : false}
          sizes={sizes}
          blurDataURL={image?.value?.src}
          placeholder="blur"
          {...rest}
        />
      ) : (
        <NextImage
          key={image?.value?.src}
          loader={isPicsumImage ? placeholderImageLoader : undefined}
          src={imageSrc}
          alt={(image?.value?.alt as string) || ''}
          fill
          className={cn(className, 'object-cover')}
          unoptimized={isUnoptimized}
          priority={inView ? true : false}
          sizes={sizes || '100vw'}
          {...rest}
        />
      )}
    </div>
  );
};
