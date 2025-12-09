import { ComponentProps } from '@/lib/component-props';
import {
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Placeholder,
  withDatasourceCheck,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Search } from 'lucide-react';
import PreviewSearch from '../search/PreviewSearch';
import { PREVIEW_WIDGET_ID } from '@/_data/customizations';

interface Fields {
  LogoLight: ImageField;
  LogoDark: ImageField;
  PhoneLink: LinkField;
  MailLink: LinkField;
}

interface HeaderProps extends ComponentProps {
  fields: Fields;
}

export const DefaultHeaderExtended = (props: HeaderProps) => {
  const id = props.params.RenderingIdentifier;
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <section
      className={`bg-background dark:bg-background-dark relative py-8 ${props.params.styles}`}
      id={id ? id : undefined}
    >
      <div className="container flex items-center gap-2 lg:gap-4">
        <div className="mr-auto max-w-50">
          <Link href={'/'}>
            <ContentSdkImage
              field={props.fields.LogoLight}
              width={345}
              height={45}
              className="dark:hidden"
              priority
            />
            <ContentSdkImage
              field={props.fields.LogoDark}
              width={345}
              height={45}
              className="hidden dark:block"
              priority
            />
          </Link>
        </div>
        <div className="order-last lg:order-0 lg:mr-4 xl:mr-8">
          <Placeholder
            name={`header-extended-nav-${props?.params?.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
        <div className="mx-2 lg:mx-0">
          <Placeholder
            name={`header-extended-theme-switcher-${props?.params?.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-foreground hover:text-primary transition">
            <Search className="w-5 h-5" />
          </button>
          <ContentSdkLink
            field={props.fields.MailLink}
            className="flex h-6 w-6 items-center justify-center"
          >
            <FontAwesomeIcon icon={faEnvelope} width={16} height={16} />
          </ContentSdkLink>
          <ContentSdkLink
            field={props.fields.PhoneLink}
            className="flex h-6 w-6 items-center justify-center"
          >
            <FontAwesomeIcon icon={faPhone} width={14} height={14} />
          </ContentSdkLink>
        </div>
        {isSearchOpen && (
          <div className="absolute top-full right-0 left-0 z-50 border-b border-gray-200 bg-white shadow-lg">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="flex items-center gap-2">
                <PreviewSearch
                  rfkId={PREVIEW_WIDGET_ID}
                  isOpen={isSearchOpen}
                  setIsSearchOpen={setIsSearchOpen}
                />

                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-3 text-gray-500 transition-colors hover:text-gray-700"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<HeaderProps>(DefaultHeaderExtended);
