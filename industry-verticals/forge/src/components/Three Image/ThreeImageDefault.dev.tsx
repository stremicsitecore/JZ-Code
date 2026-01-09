'use client';

import { ThreeImageDefault } from './ThreeImageDefault';
import { ThreeImageProps } from './three-image.props';

/**
 * Development/Preview version of Three Image component
 * with sample data matching One&Only Resorts aesthetic
 */

const sampleData: ThreeImageProps = {
  rendering: { componentName: 'ThreeImage' },
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

export const Default = () => <ThreeImageDefault {...sampleData} />;

export default Default;

