import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import SearchResultsWidget from './SearchResultsComponent';

export type SearchResultsProps = ComponentProps & {
  params: { [key: string]: string };
};

const SearchResults = (props: SearchResultsProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`${sxaStyles}`}>
      <SearchResultsWidget rfkId="formalux_search_results" />
    </div>
  );
};

export const Default = SearchResults;
