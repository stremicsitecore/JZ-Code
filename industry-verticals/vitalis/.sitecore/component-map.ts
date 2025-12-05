// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as tabs from 'src/components/ui/tabs';
import * as separator from 'src/components/ui/separator';
import * as select from 'src/components/ui/select';
import * as popover from 'src/components/ui/popover';
import * as input from 'src/components/ui/input';
import * as card from 'src/components/ui/card';
import * as calendar from 'src/components/ui/calendar';
import * as button from 'src/components/ui/button';
import * as badge from 'src/components/ui/badge';
import * as SuggestionBlock from 'src/components/search/SuggestionBlock';
import * as Spinner from 'src/components/search/Spinner';
import * as SortOrder from 'src/components/search/SortOrder';
import * as SearchResultsComponent from 'src/components/search/SearchResultsComponent';
import * as SearchResults from 'src/components/search/SearchResults';
import * as SearchPagination from 'src/components/search/SearchPagination';
import * as SearchFacets from 'src/components/search/SearchFacets';
import * as ResultsPerPage from 'src/components/search/ResultsPerPage';
import * as QuestionsAnswers from 'src/components/search/QuestionsAnswers';
import * as QueryResultsSummary from 'src/components/search/QueryResultsSummary';
import * as PreviewSearch from 'src/components/search/PreviewSearch';
import * as HomeHighlighted from 'src/components/search/HomeHighlighted';
import * as HighlightedArticles from 'src/components/search/HighlightedArticles';
import * as Filter from 'src/components/search/Filter';
import * as DestinationSearch from 'src/components/search/DestinationSearch';
import * as CardViewSwitcher from 'src/components/search/CardViewSwitcher';
import * as BlogSearch from 'src/components/search/BlogSearch';
import * as ArticleHorizontalCard from 'src/components/search/ArticleHorizontalCard';
import * as ArticleCard from 'src/components/search/ArticleCard';
import * as ProductDetail from 'src/components/products/ProductDetail';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as Stats from 'src/components/page-content/Stats';
import * as Promo from 'src/components/page-content/Promo';
import * as DemoCTA from 'src/components/page-content/DemoCTA';
import * as Header from 'src/components/navigation/Header';
import * as Footer from 'src/components/navigation/Footer';
import * as ProductLister from 'src/components/listers/ProductLister';
import * as ArticleLister from 'src/components/listers/ArticleLister';
import * as utils from 'src/components/lib/utils';
import * as VideoBanner from 'src/components/banners/VideoBanner';
import * as HeroBanner from 'src/components/banners/HeroBanner';
import * as CarouselBanner from 'src/components/banners/CarouselBanner';
import * as ArticleDetail from 'src/components/articles/ArticleDetail';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['tabs', { ...tabs }],
  ['separator', { ...separator }],
  ['select', { ...select }],
  ['popover', { ...popover }],
  ['input', { ...input }],
  ['card', { ...card }],
  ['calendar', { ...calendar }],
  ['button', { ...button }],
  ['badge', { ...badge }],
  ['SuggestionBlock', { ...SuggestionBlock }],
  ['Spinner', { ...Spinner }],
  ['SortOrder', { ...SortOrder }],
  ['SearchResultsComponent', { ...SearchResultsComponent }],
  ['SearchResults', { ...SearchResults }],
  ['SearchPagination', { ...SearchPagination }],
  ['SearchFacets', { ...SearchFacets }],
  ['ResultsPerPage', { ...ResultsPerPage }],
  ['QuestionsAnswers', { ...QuestionsAnswers }],
  ['QueryResultsSummary', { ...QueryResultsSummary }],
  ['PreviewSearch', { ...PreviewSearch }],
  ['HomeHighlighted', { ...HomeHighlighted }],
  ['HighlightedArticles', { ...HighlightedArticles }],
  ['Filter', { ...Filter }],
  ['DestinationSearch', { ...DestinationSearch }],
  ['CardViewSwitcher', { ...CardViewSwitcher }],
  ['BlogSearch', { ...BlogSearch }],
  ['ArticleHorizontalCard', { ...ArticleHorizontalCard }],
  ['ArticleCard', { ...ArticleCard }],
  ['ProductDetail', { ...ProductDetail }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['Stats', { ...Stats }],
  ['Promo', { ...Promo }],
  ['DemoCTA', { ...DemoCTA }],
  ['Header', { ...Header }],
  ['Footer', { ...Footer }],
  ['ProductLister', { ...ProductLister }],
  ['ArticleLister', { ...ArticleLister }],
  ['utils', { ...utils }],
  ['VideoBanner', { ...VideoBanner }],
  ['HeroBanner', { ...HeroBanner }],
  ['CarouselBanner', { ...CarouselBanner }],
  ['ArticleDetail', { ...ArticleDetail }],
]);

export default componentMap;
