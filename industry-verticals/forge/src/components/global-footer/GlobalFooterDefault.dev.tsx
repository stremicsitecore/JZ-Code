import { useRef } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { GlobalFooterProps } from '@/components/global-footer/global-footer.props';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Default as EmailSignupForm } from '@/components/forms/email/EmailSignupForm.dev';

// Static navigation structure matching One&Only Resorts footer
const navigationColumns = [
  {
    header: 'ABOUT US',
    links: [
      { label: 'About One&Only', href: '#' },
      { label: 'Our Resorts', href: '#' },
      { label: 'Private Homes', href: '#' },
    ],
  },
  {
    header: 'NEWS AND AWARDS',
    links: [
      { label: 'Media Centre', href: '#' },
      { label: 'Awards', href: '#' },
      { label: 'Newsletter Signup', href: '#' },
    ],
  },
  {
    header: 'TERMS & CONDITIONS',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Website Terms', href: '#' },
      { label: 'Sitemap', href: '#' },
    ],
  },
  {
    header: 'CONTACT',
    links: [{ label: 'Contact Us', href: '#' }],
  },
  {
    header: 'KERZNER',
    links: [
      { label: 'Atlantis', href: '#' },
      { label: 'SIRO', href: '#' },
      { label: 'Rare Finds', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
];

export const GlobalFooterDefault: React.FC<GlobalFooterProps> = (props) => {
  const { fields } = props;
  const { dictionary } = fields;
  const { footerCopyright, tagline, emailSubscriptionTitle } = fields.data.datasource ?? {};

  const footerRef = useRef<HTMLDivElement>(null);

  if (fields) {
    return (
      <footer className="@container w-full" ref={footerRef}>
        {/* Newsletter Section - with palm leaf pattern */}
        <div className="relative overflow-hidden bg-[#1a1a1a] px-4 py-20">
          {/* Palm leaf decorative pattern - CSS background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 0 C30 20, 20 40, 25 50 C30 60, 45 55, 50 50 C55 55, 70 60, 75 50 C80 40, 70 20, 50 0' fill='none' stroke='%23333' stroke-width='0.5'/%3E%3Cpath d='M0 50 C20 30, 40 20, 50 25 C60 30, 55 45, 50 50 C55 55, 60 70, 50 75 C40 80, 20 70, 0 50' fill='none' stroke='%23333' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />

          <div className="relative z-10 mx-auto max-w-screen-xl text-center">
            {/* STAY CONNECTED */}
            <Text
              tag="h2"
              field={tagline?.jsonValue}
              className="mb-4 text-sm font-light tracking-[0.3em] text-white"
            />

            {/* SIGN UP TO OUR NEWSLETTER */}
            <Text
              tag="p"
              field={emailSubscriptionTitle?.jsonValue}
              className="mb-10 text-lg font-light tracking-[0.2em] text-white"
            />

            {/* Sign Up Button */}
            <div className="flex justify-center">
              <EmailSignupForm
                fields={{
                  buttonVariant: 'outline',
                  emailPlaceholder: {
                    value: dictionary?.FOOTER_EmailPlaceholder,
                  },
                  emailSubmitLabel: {
                    value: dictionary?.FOOTER_EmailSubmitLabel || 'SIGN UP',
                  },
                  emailErrorMessage: {
                    value: dictionary?.FOOTER_EmailErrorMessage,
                  },
                  emailSuccessMessage: {
                    value: dictionary?.FOOTER_EmailSuccessMessage,
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Main Footer Navigation */}
        <div className="bg-[#0d0d0d] px-4 py-16">
          <div className="@xl:px-8 mx-auto max-w-screen-xl">
            <div className="@lg:grid-cols-[1fr_3fr] grid grid-cols-1 gap-12">
              {/* Logo Section */}
              <div className="@lg:text-left text-center">
                <span
                  className="text-3xl text-white"
                  style={{
                    fontFamily: "'Playfair Display', 'Times New Roman', serif",
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  One&amp;Only
                </span>
              </div>

              {/* Navigation Columns */}
              <div className="@lg:grid-cols-5 @md:grid-cols-3 @sm:grid-cols-2 grid grid-cols-1 gap-8">
                {navigationColumns.map((column, colIndex) => (
                  <div key={colIndex}>
                    {/* Column Header */}
                    <h3 className="mb-6 text-xs font-medium uppercase tracking-[0.15em] text-white">
                      {column.header}
                    </h3>

                    {/* Column Links */}
                    <ul className="space-y-3">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="text-sm font-light text-white transition-opacity hover:opacity-70"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom copyright */}
            {footerCopyright?.jsonValue?.value && (
              <div className="mt-16 border-t border-white/10 pt-8 text-center">
                <Text
                  field={footerCopyright?.jsonValue}
                  encode={false}
                  className="text-xs text-white"
                />
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  }
  return <NoDataFallback componentName="Global Footer" />;
};
