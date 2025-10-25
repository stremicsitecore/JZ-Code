import Link from 'next/link';
import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
import {
  Plane,
} from "lucide-react"

export type HeaderProps = ComponentProps & {
  fields: {
    items: [{
      displayName: string;
      fields:  {
        Link: {
          value: {
            anchor: string;
            href: string;
            linktype: string;
            target: string;
            text: string;
          };
        };
      };
    }];
  };
};

export const Header = (props: HeaderProps): JSX.Element => {
  const { t } = useI18n();
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <header className={`border-b bg-white sticky top-0 z-50 ${sxaStyles}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2"><Plane className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">SkyWings</span></a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {props.fields?.items?.map((item, index) => (
                <Link key={index} href={item.fields?.Link?.value?.href ?? '#'} prefetch={false} className="text-gray-700 hover:text-blue-600 font-medium">
                  {item.displayName}
                </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="#">
              {t('Sign In') || 'Sign In'}
            </Link>
            <Link href="/tickets" className="btn-main">
              {t('Join SkyWings') || 'Join SkyWings'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Default = Header;