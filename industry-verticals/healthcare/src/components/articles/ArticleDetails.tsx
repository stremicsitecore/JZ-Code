import { ComponentProps } from '@/lib/component-props';
import {
  Field,
  ImageField,
  RichTextField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Placeholder,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
// import SocialShare from '../non-sitecore/SocialShare';

interface Fields {
  Title: Field<string>;
  ShortDescription: Field<string>;
  Content: RichTextField;
  Image: ImageField;
}

interface ArticleDetailsProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: ArticleDetailsProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = params;
  const placeholderKey = `article-details-${DynamicPlaceholderId}`;
  const fullWidthPlaceholderKey = `article-details-full-width-${DynamicPlaceholderId}`;
  const isPageEditing = page.mode.isEditing;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component article-details ${styles}`} id={id}>
        [ARTICLE DETAILS]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <>
      <article className={`component article-details ${styles}`} id={id}>
        <div className="container">
          <div className="grid grid-cols-12 gap-4 py-11">

            <div className="col-span-12 aspect-video w-full overflow-hidden rounded-lg lg:col-span-10 lg:col-start-2">
              <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" />
            </div>

            <div className="col-span-12 mt-8 lg:col-span-8 lg:col-start-3">
              <h2>
                <ContentSdkText field={fields.Title} />
              </h2>

              <p className="text-foreground-muted mt-5 text-lg font-medium tracking-wide">
                <ContentSdkText field={fields.ShortDescription} />
              </p>

              <div className="rich-text mt-10 text-lg">
                <ContentSdkRichText field={fields.Content} />
              </div>
            </div>

            <div className="col-span-12 mt-12 lg:col-span-10 lg:col-start-2">
              <Placeholder name={placeholderKey} rendering={rendering} />
            </div>
          </div>
        </div>
        <Placeholder name={fullWidthPlaceholderKey} rendering={rendering} />
      </article>
    </>
  );
};
