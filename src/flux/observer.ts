import { rayify } from '../utils';
import { Events, FluxCapacitor } from './capacitor';

export const DETAIL_QUERY_INDICATOR = 'gbiDetailQuery';

type Observer = (oldState: any, newState: any) => void;

namespace Observer {
  export type Map = { [key: string]: Observer | Map };
  export type Node = Map | Observer | (Observer & Map);

  export function listen(flux: FluxCapacitor) {
    let oldState;

    return () => {
      const state = flux.store.getState();

      Observer.resolve(oldState, state, Observer.create(flux));

      oldState = state;
    };
  }

  export function resolve(oldState: any, newState: any, observers: Node) {
    if (oldState !== newState) {
      if (typeof observers === 'function') {
        observers(oldState, newState);
      }

      Object.keys(observers)
        .forEach((key) => Observer.resolve((oldState || {})[key], (newState || {})[key], observers[key]));
    }
  }

  export function create(flux: FluxCapacitor) {
    function emit(events: string | string[], data: any) {
      rayify(events).forEach((event) => flux.emit(event, data));
    }

    return {
      data: {
        query: Object.assign((_, newQuery) => emit(Events.QUERY_UPDATED, newQuery), {
          original: (_, newOriginal) => emit(Events.ORIGINAL_QUERY_UPDATED, newOriginal),
          corrected: (_, newCorrected) => emit(Events.CORRECTED_QUERY_UPDATED, newCorrected),
          related: (_, newRelated) => emit(Events.RELATED_QUERIES_UPDATED, newRelated),
          didYouMeans: (_, newDidYouMeans) => emit(Events.DID_YOU_MEANS_UPDATED, newDidYouMeans),
          rewrites: (_, newRewrites) => emit(Events.QUERY_REWRITES_UPDATED, newRewrites),
        }),

        filter: (_, newFilter) => emit(Events.FILTER_UPDATED, newFilter),

        sort: (_, newSort) => emit(Events.SORT_UPDATED, newSort),

        products: (_, newProduct) => emit(Events.PRODUCTS_UPDATED, newProduct),

        search: {
          request: Object.assign((_, newRequest) => emit([
            Events.SEARCH_REQ_UPDATED,
            Events.SEARCH
          ], newRequest), {
              // NOTE: can ONLY be used to switch the "active" page in gb-paging
              skip: (_, newPageNumber) => emit([
                Events.SEARCH_PAGE_UPDATED,
                Events.PAGE_CHANGED
              ], newPageNumber),
              collection: (_, newCollection) => emit([
                Events.SEARCH_COLLECTION_UPDATED,
                Events.COLLECTION_CHANGED
              ], newCollection),
              query: (_, newQuery) => emit([
                Events.SEARCH_QUERY_UPDATED,
                Events.QUERY_CHANGED,
                Events.REWRITE_QUERY
              ], newQuery),
              // TODO: emitted value will break current implementations
              refinements: (_, newRefinements) => emit([
                Events.SEARCH_REFINEMENTS_UPDATED,
                Events.REFINEMENTS_CHANGED
              ], newRefinements),
              sort: (_, newSort) => emit([
                Events.SEARCH_SORT_UPDATED,
                Events.SORT
              ], newSort)
            }),
          response: Object.assign((_, newResponse) => {
            if (newResponse.redirect) {
              emit([
                Events.SEARCH_REDIRECT,
                Events.REDIRECT
              ], newResponse.redirect);
            } else {
              // NOTE: REFINEMENT_RESULTS is no longer, should check RESULTS
              emit([
                Events.SEARCH_RES_UPDATED,
                Events.RESULTS,
                Events.RESET
              ], newResponse);

              // NOTE: make sure to add the indicator when making the request
              const isDetailQuery = (newResponse.originalQuery.customUrlParams || [])
                .find(({ key }) => key === DETAIL_QUERY_INDICATOR);
              if (isDetailQuery) {
                emit([
                  Events.SEARCH_DETAILS,
                  Events.DETAILS
                ], newResponse.records[0]);
              }
            }
          })
        }
      }
    };
  }
}

export default Observer;
