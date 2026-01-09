/**
 * Preview page for HeroCheckout component
 * Access at: http://localhost:3000/preview/hero-checkout
 *
 * Note: This preview uses inline rendering because the ImageWrapper component
 * requires Sitecore context which isn't available in standalone preview pages.
 */

import Link from 'next/link';

export default function HeroCheckoutPreview() {
  return (
    <main className="min-h-screen bg-white">
      {/* Preview Header */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
        <p className="text-sm text-neutral-500">
          Component Preview: <span className="font-medium text-neutral-800">Hero Checkout</span>
        </p>
      </div>

      {/* Component Preview - Inline rendering matching HeroCheckout.dev.tsx */}
      <section
        data-component="HeroCheckout"
        className="@container/herowrapper bg-background text-foreground relative w-full overflow-hidden"
      >
        <div className="relative">
          {/* Background Image - Elegant resort-style presentation */}
          <div className="absolute inset-0 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop&sat=-100"
              alt="Woman wearing sunglasses relaxing in open-top car on adventure"
              className="h-full w-full object-cover object-center grayscale"
            />
          </div>

          {/* Gradient overlay - sophisticated dark-to-transparent for luxury feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>

          {/* Decorative accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>

          {/* Content - Compact checkout-style hero */}
          <div className="relative z-10 mx-auto flex min-h-[40vh] max-w-[1240px] flex-col items-center justify-end px-5 pb-12 pt-20 text-center @md/herowrapper:min-h-[45vh] @md/herowrapper:px-10 @md/herowrapper:pb-16 @lg/herowrapper:px-24">
            {/* Title - Refined typography */}
            <div className="relative z-20">
              <h1 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-extralight uppercase leading-tight tracking-[0.2em] text-white">
                ADVENTURES & ACTIVITIES
              </h1>
            </div>

            {/* Decorative divider */}
            <div className="mt-4">
              <div className="h-px w-16 bg-amber-400/80"></div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="mx-auto max-w-[45ch] text-pretty text-base font-light leading-relaxed tracking-wide text-white/90 @md/herowrapper:text-lg">
                From untamed wilderness to hidden beaches, alpine hideaways and captivating city
                stays, let us set the stage for your next escape.
              </p>
            </div>

            {/* CTA Button - Elegant styling */}
            <div className="mt-6">
              <Link
                href="/experiences"
                className="inline-flex items-center justify-center border border-amber-400/60 bg-transparent px-8 py-2 text-sm uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-amber-400 hover:bg-amber-400/10"
              >
                EXPLORE EXPERIENCES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional content to show context */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-4 font-serif text-2xl text-neutral-800">Component Details</h2>
        <p className="text-neutral-600">
          This HeroCheckout variant features a compact, elegant design inspired by luxury resort
          aesthetics. It includes:
        </p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-neutral-600">
          <li>Sophisticated gradient overlay (dark-to-transparent)</li>
          <li>Decorative amber accent line at the bottom</li>
          <li>Compact height suitable for checkout/booking pages</li>
          <li>Refined typography with extra-light weight and wide letter-spacing</li>
          <li>Warm amber-tinted CTA button</li>
        </ul>
      </div>
    </main>
  );
}

