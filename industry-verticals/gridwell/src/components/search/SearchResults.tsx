import React, { JSX } from 'react'
import { ComponentProps } from 'lib/component-props';
import SearchResultsWidget from './SearchResultsComponent';
import { SEARCH_WIDGET_ID } from '@/_data/customizations';
import { useSearchParams } from 'next/navigation';

export type SearchResultsProps = ComponentProps & {
  params: { [key: string]: string };
}

const SearchResults = (props: SearchResultsProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';

  return (
    <div key={query} className={`${sxaStyles}`}>
      <SearchResultsWidget rfkId={SEARCH_WIDGET_ID} defaultKeyphrase={query} />
    </div>
  )
}

export const Default = SearchResults;
