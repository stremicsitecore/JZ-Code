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
import * as button from 'src/components/ui/button';
import * as badge from 'src/components/ui/badge';
import * as Title from 'src/components/title/Title';
import * as ThemeSwitcher from 'src/components/theme-switcher/ThemeSwitcher';
import * as SocialFollow from 'src/components/social-follow/SocialFollow';
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
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Reviews from 'src/components/reviews/Reviews';
import * as Promo from 'src/components/promo/Promo';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Navigation from 'src/components/navigation/Navigation';
import * as LinkList from 'src/components/link-list/LinkList';
import * as utils from 'src/components/lib/utils';
import * as Image from 'src/components/image/Image';
import * as HeroBanner from 'src/components/hero-banner/HeroBanner';
import * as HeaderExtended from 'src/components/header-extended/HeaderExtended';
import * as Footer from 'src/components/footer/Footer';
import * as Features from 'src/components/features/Features';
import * as DoctorsListing from 'src/components/doctors-listing/DoctorsListing';
import * as DoctorDetails from 'src/components/doctor-details/DoctorDetails';
import * as ContentSection from 'src/components/content-section/ContentSection';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';
import * as ArticleDetails from 'src/components/articles/ArticleDetails';
import * as ArticleCarousel from 'src/components/articles/ArticleCarousel';

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
  ['button', { ...button }],
  ['badge', { ...badge }],
  ['Title', { ...Title }],
  ['ThemeSwitcher', { ...ThemeSwitcher }],
  ['SocialFollow', { ...SocialFollow }],
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
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Reviews', { ...Reviews }],
  ['Promo', { ...Promo, componentType: 'client' }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageContent', { ...PageContent }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['LinkList', { ...LinkList }],
  ['utils', { ...utils }],
  ['Image', { ...Image }],
  ['HeroBanner', { ...HeroBanner, componentType: 'client' }],
  ['HeaderExtended', { ...HeaderExtended }],
  ['Footer', { ...Footer, componentType: 'client' }],
  ['Features', { ...Features, componentType: 'client' }],
  ['DoctorsListing', { ...DoctorsListing }],
  ['DoctorDetails', { ...DoctorDetails }],
  ['ContentSection', { ...ContentSection, componentType: 'client' }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['ArticleDetails', { ...ArticleDetails }],
  ['ArticleCarousel', { ...ArticleCarousel }],
]);

export default componentMap;
