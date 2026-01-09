/**
 * Preview page for Three Image component
 * Access at: http://localhost:3000/preview/three-image
 */

import { ThreeImageDefault } from 'components/Three Image/ThreeImageDefault';
import { ThreeImageProps } from 'components/Three Image/three-image.props';

const sampleData: ThreeImageProps = {
  rendering: {
    uid: 'three-image-preview',
    componentName: 'ThreeImage',
  },
  fields: {
    cards: [
      {
        id: '1',
        fields: {
          image: {
            value: {
              src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=1000&fit=crop',
              alt: 'Luxury villa with infinity pool overlooking the ocean',
              width: 800,
              height: 1000,
            },
          },
          title: { value: 'Signature Villas' },
          description: {
            value:
              'Promising unrivalled space, seclusion and luxury, our signature villas are the pinnacle stay at each One&Only resort.',
          },
          link: {
            value: {
              href: '/villas',
              text: 'Explore',
            },
          },
        },
      },
      {
        id: '2',
        fields: {
          image: {
            value: {
              src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=1000&fit=crop',
              alt: 'Woman relaxing in luxury bedroom',
              width: 800,
              height: 1000,
            },
          },
          title: { value: 'One&Only Private Homes' },
          description: {
            value:
              'Unlock an exceptional lifestyle with One&Only Private Homes, now available to purchase or book for holidays.',
          },
          link: {
            value: {
              href: '/private-homes',
              text: 'Explore',
            },
          },
        },
      },
      {
        id: '3',
        fields: {
          image: {
            value: {
              src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=1000&fit=crop',
              alt: 'Scenic beach at sunset with rocks',
              width: 800,
              height: 1000,
            },
          },
          title: { value: 'Insider Travel Guides' },
          description: {
            value:
              'Our trusted tastemakers unlock each destination, sharing curated travel guides and insider itineraries.',
          },
          link: {
            value: {
              href: '/travel-guides',
              text: 'Explore',
            },
          },
        },
      },
    ],
  },
  params: {},
};

export default function ThreeImagePreview() {
  return (
    <main className="min-h-screen bg-white">
      {/* Preview Header */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
        <p className="text-sm text-neutral-500">
          Component Preview: <span className="font-medium text-neutral-800">Three Image</span>
        </p>
      </div>

      {/* Component Preview */}
      <ThreeImageDefault {...sampleData} />
    </main>
  );
}

