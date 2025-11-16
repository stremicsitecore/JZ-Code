import Link from 'next/link';
import React, { JSX, useState } from 'react';
import { ComponentProps } from 'lib/component-props';
import {
  Search, Menu, X,
} from "lucide-react"
import PreviewSearch from '../search/PreviewSearch';

export type HeaderProps = ComponentProps & {
  fields: {
    items: [{
      displayName: string;
      fields: {
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
  const sxaStyles = `${props.params?.styles || ''}`;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur ${sxaStyles}`}>
      <nav className="flex items-center justify-between px-4 py-4 md:px-8 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
          
            
          <img src="https://starter-verticals.sitecoresandbox.cloud/api/public/content/8282fd9c88aa498baad244051a2509ff?v=df8eb468" />
          
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {props.fields?.items?.map((item, index) => (
            <Link key={index} href={item.fields?.Link?.value?.href ?? '#'} prefetch={false} className="text-sm text-foreground hover:text-primary transition">
              {item.displayName}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-foreground hover:text-primary transition">
            <Search className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium">
            Get Demo
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        {isSearchOpen && (
          <div className="absolute top-full right-0 left-0 z-50 border-b border-gray-200 bg-white shadow-lg">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="flex items-center gap-2">
                <PreviewSearch
                  rfkId="skywings_preview_search"
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
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-secondary p-4 space-y-4">
          {props.fields?.items?.map((item, index) => (
            <Link key={index} href={item.fields?.Link?.value?.href ?? '#'} prefetch={false} className="block text-sm text-foreground hover:text-primary">
              {item.displayName}
            </Link>
          ))}

          <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium">
            Get Demo
          </button>
        </div>
      )}
    </header >
  );
};

export const Default = Header;