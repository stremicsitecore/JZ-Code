import { ComponentProps } from '@/lib/component-props';
import {
  Field,
  RichTextField,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Placeholder,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
// import SocialShare from '../non-sitecore/SocialShare';

interface Fields {
  Title: Field<string>;
  Content: RichTextField;
}

interface ServiceDetailsProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: ServiceDetailsProps) => {
  const { page } = useSitecore();
  const { styles } = params;
  const isPageEditing = page.mode.isEditing;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component article-details ${styles}`}>
        [ARTICLE DETAILS]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <>
      <article className={`component article-details ${styles}`}>
        <div className="container">
          <div className="grid grid-cols-12 gap-4 py-11">

            <div className="col-span-12 mt-8 lg:col-span-8 lg:col-start-3">
              <h2>
                <ContentSdkText field={fields.Title} />
              </h2>

              <div className="rich-text mt-10 text-lg">
                <ContentSdkRichText field={fields.Content} />
              </div>
            </div>

            <div className="col-span-12 mt-12 lg:col-span-10 lg:col-start-2">
              <Placeholder name="servicePromo" rendering={rendering} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
