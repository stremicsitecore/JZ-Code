import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import HighlightedWidget from './HomeHighlighted';
import { HOMEHIGHLIGHTED_WIDGET_ID } from '@/_data/customizations';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const SEARCH_CONFIG = {
  source: process.env.NEXT_PUBLIC_SEARCH_SOURCE as string,
};


export type HighlightedArticlesProps = ComponentProps & {
  params: { [key: string]: string };
};

export const HighlightedArticles = (props: HighlightedArticlesProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const type = props.params?.Type;
  const source = props.params?.Source ? props.params?.Source : SEARCH_CONFIG.source;
  const widget = props.params?.Widget ? props.params?.Widget : HOMEHIGHLIGHTED_WIDGET_ID;

  return (
    <div className={`col-12 ${sxaStyles}`}>
      <HighlightedWidget rfkId={widget} type={type} source={source} widget={widget} />
    </div>
  );
};

export const Default = HighlightedArticles;
