import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import SearchResultsWidget from './SearchResultsComponent';
import { useSearchParams } from 'next/navigation';

export type SearchResultsProps = ComponentProps & {
  params: { [key: string]: string };
};

const SearchResults = (props: SearchResultsProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';

  console.log(`grabbed keyword from querystring: ${query}`);

  return (
    <div className={`${sxaStyles}`}>
      {/* <QuestionsAnswers
        key={`${query}-questions`}
        rfkId="rfkid_qa"
        defaultKeyphrase={query}
        defaultRelatedQuestions={3}
      /> */}
      <SearchResultsWidget rfkId="formalux_search_results" defaultKeyphrase={query} />
    </div>
  );
};

export const Default = SearchResults;
