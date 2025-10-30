import {
  trackEntityPageViewEvent,
  trackPreviewSearchClickEvent,
  trackSearchClickEntityEvent,
} from '@sitecore-search/react';
import { useRouter } from 'next/navigation';

export type Events =
  | 'PageViewEvent'
  | 'EntityPageView'
  | 'PreviewSearchClickEvent'
  | 'SearchClickEvent'
  | 'PreviewSearchSuggestionClickEvent';

export function handleSearch(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  widgetId: string,
  entityType: string,
  events: Events[],
  entityId: string,
  itemIndex: number
) {
  console.log('Preventing default');
  e.preventDefault();
  events?.forEach((event) => {
    if (event == 'EntityPageView' && entityType && entityId) {
      trackEntityPageViewEvent(entityType, { items: [{ id: entityId }] });
    }

    if (event == 'PreviewSearchClickEvent') {
      trackPreviewSearchClickEvent(widgetId, entityType, {
        index: itemIndex,
        items: [{ id: entityId }],
      });
    }

    if (event == 'SearchClickEvent') {
      trackSearchClickEntityEvent(widgetId, entityType, {
        actionCause: 'entity',
        index: itemIndex,
        items: [{ id: entityId }],
      });
    }
  });

  console.log(`Redirecting to: ${href}`);
  useRouter().push(href);
}
