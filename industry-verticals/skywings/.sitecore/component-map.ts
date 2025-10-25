// Below are built-in components that are available in the app, it's recommended to keep them as is
import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';
// end of built-in components

// Components imported from the app itself
import * as tabs from 'src/components/ui/tabs';
import * as separator from 'src/components/ui/separator';
import * as select from 'src/components/ui/select';
import * as popover from 'src/components/ui/popover';
import * as input from 'src/components/ui/input';
import * as card from 'src/components/ui/card';
import * as calendar from 'src/components/ui/calendar';
import * as button from 'src/components/ui/button';
import * as badge from 'src/components/ui/badge';
import * as DestinationSearch from 'src/components/search/DestinationSearch';
import * as BlogSearch from 'src/components/search/BlogSearch';
import * as FlightPicker from 'src/components/pickers/FlightPicker';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as SkywingsServices from 'src/components/page-content/SkywingsServices';
import * as SkywingsFleet from 'src/components/page-content/SkywingsFleet';
import * as OfferBlock from 'src/components/page-content/OfferBlock';
import * as BlogDetail from 'src/components/page-content/BlogDetail';
import * as Author from 'src/components/page-content/Author';
import * as Header from 'src/components/navigation/Header';
import * as Footer from 'src/components/navigation/Footer';
import * as LatestBlogGrid from 'src/components/listers/LatestBlogGrid';
import * as AllBlogs from 'src/components/listers/AllBlogs';
import * as utils from 'src/components/lib/utils';
import * as PopularDestinations from 'src/components/destinations/PopularDestinations';
import * as FeaturedDestinations from 'src/components/destinations/FeaturedDestinations';
import * as DestinationDetail from 'src/components/destinations/DestinationDetail';


// Components must be registered within the map to match the string key with component name in Sitecore
export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['tabs', tabs],
  ['separator', separator],
  ['select', select],
  ['popover', popover],
  ['input', input],
  ['card', card],
  ['calendar', calendar],
  ['button', button],
  ['badge', badge],
  ['DestinationSearch', DestinationSearch],
  ['BlogSearch', BlogSearch],
  ['FlightPicker', FlightPicker],
  ['PartialDesignDynamicPlaceholder', PartialDesignDynamicPlaceholder],
  ['SkywingsServices', SkywingsServices],
  ['SkywingsFleet', SkywingsFleet],
  ['OfferBlock', OfferBlock],
  ['BlogDetail', BlogDetail],
  ['Author', Author],
  ['Header', Header],
  ['Footer', Footer],
  ['LatestBlogGrid', LatestBlogGrid],
  ['AllBlogs', AllBlogs],
  ['utils', utils],
  ['PopularDestinations', PopularDestinations],
  ['FeaturedDestinations', FeaturedDestinations],
  ['DestinationDetail', DestinationDetail],
]);

export default componentMap;
