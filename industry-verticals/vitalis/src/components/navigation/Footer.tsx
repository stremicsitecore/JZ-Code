import React, { JSX } from 'react';
import Link from 'next/link';
import { Field, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

export type FooterProps = ComponentProps & {
  fields: {
    data: {
      links: {
        Title: {
          jsonValue: {
            value: string;
          }
        },
        Subtitle: {
          jsonValue: {
            value: string;
          }
        },
        ContactHeader: Field<string>,
        Email: Field<string>,
        PhoneNumber: Field<string>,
        Additional: Field<string>,
        children: {
          results: [
            {
              displayName: string;
              Title: Field<string>;
              children: {
                results: [
                  {
                    displayName: string;
                    Link: {
                      jsonValue: {
                        value: {
                          anchor: string;
                          href: string;
                          linktype: string;
                          target: string;
                          text: string;
                          url: string;
                        };
                      };
                    };
                  }
                ];
              };
            }
          ];
        };
      };
    };
  };
};

const Footer = (props: FooterProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <footer className={`border-t border-border bg-secondary text-foreground ${sxaStyles}`}>
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 text-foreground"><Text field={props.fields.data.links.Title.jsonValue} /></h3>
            <p className="text-sm text-muted-foreground"><Text field={props.fields.data.links.Subtitle.jsonValue} /></p>
          </div>

          {props.fields?.data.links.children.results.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-sm mb-4 text-foreground"><Text field={section.Title} /></h4>
              <ul className="space-y-2 text-sm">
                {section.children.results.map((link, i) => (
                  <li key={i}>
                    <Link href={link.Link.jsonValue.value.href} className="text-muted-foreground hover:text-primary transition">
                      {link.displayName}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          ))}

        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Vitalis. All rights reserved.</p>
        </div>
      </div>
    </footer >
  );
};

export const Default = Footer;
