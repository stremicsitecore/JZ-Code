/**
 * Preview page for Accordion 50/50 Title Above (Feature Card) component
 * Access at: http://localhost:3000/preview/accordion-5050-title-above
 */

import Link from 'next/link';

export default function Accordion5050TitleAbovePreview() {
  return (
    <main className="min-h-screen bg-white">
      {/* Preview Header */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
        <p className="text-sm text-neutral-500">
          Component Preview:{' '}
          <span className="font-medium text-neutral-800">Feature Card (Ocean Adventures)</span>
        </p>
      </div>

      {/* Component Preview */}
      <div className="flex min-h-[80vh] items-center justify-center p-8">
        <div className="max-w-md">
          {/* Image */}
          <div className="mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&h=600&fit=crop"
              alt="Beautiful Pacific Ocean coastline with cliffs and turquoise water"
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Title - uppercase with wide letter spacing */}
            <h2 className="font-sans text-base font-normal uppercase tracking-[0.2em] text-neutral-900">
              Ocean Adventures
            </h2>

            {/* Description */}
            <p className="text-base leading-relaxed text-neutral-600">
              Unlock the magic of the Pacific Ocean by watching humpback whales end their long
              migration, discovering volcanic reefs during a private diving course or fishing with
              expert local fisherman.
            </p>

            {/* Button - outlined style */}
            <div className="pt-4">
              <Link
                href="/ocean-adventures"
                className="inline-block border border-neutral-900 px-8 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

