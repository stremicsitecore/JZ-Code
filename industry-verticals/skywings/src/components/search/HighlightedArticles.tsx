import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import HighlightedWidget from './HomeHighlighted';
import { HIGHLIGHTED_ARTICLES_RFKID } from '@/_data/customizations';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export type HighlightedArticlesProps = ComponentProps & {
  params: { [key: string]: string };
};

export const HighlightedArticles = (props: HighlightedArticlesProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const query = randomUUID();


  return (
    <div key={query} className={`${sxaStyles}`}>
      <HighlightedWidget rfkId={HIGHLIGHTED_ARTICLES_RFKID} />
    </div>
  );
};

export const Default = HighlightedArticles;
