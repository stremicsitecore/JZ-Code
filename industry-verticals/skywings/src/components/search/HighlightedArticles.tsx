import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { useSearchParams } from 'next/navigation';
import HighlightedWidget from './HomeHighlighted';
import { HIGHLIGHTED_ARTICLES_RFKID } from '@/_data/customizations';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export type SearchResultsProps = ComponentProps & {
  params: { [key: string]: string };
};

export const SearchResults = (props: SearchResultsProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';

  console.log(`grabbed keyword from querystring: ${query}`);

  return (
    <div key={query} className={`${sxaStyles}`}>
      <HighlightedWidget rfkId={HIGHLIGHTED_ARTICLES_RFKID} />
    </div>
  );
};

export const Default = SearchResults;
