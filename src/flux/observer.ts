import { Events, FluxCapacitor } from './capacitor';

export const DETAIL_QUERY_INDICATOR = 'gbiDetailQuery';

type Observer = (oldState: any, newState: any) => void;

namespace Observer {
  export type Map = { [key: string]: Observer | Map }
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
    return {
      data: {
        search: {
          request: Object.assign((_, newRequest) => flux.emit(Events.SEARCH, newRequest), {
            // NOTE: can ONLY be used to switch the "active" page in gb-paging
            skip: (_, newPageNumber) => flux.emit(Events.PAGE_CHANGED, newPageNumber),
            collection: (_, newCollection) => flux.emit(Events.COLLECTION_CHANGED, newCollection),
            query: (_, newQuery) => flux.emit(Events.QUERY_CHANGED, newQuery),
            // TODO: emitted value will break current implementations
            refinements: (_, newRefinements) => flux.emit(Events.REFINEMENTS_CHANGED, newRefinements),
            sort: (_, newSort) => flux.emit(Events.SORT, newSort)
          }),
          response: Object.assign((_, newResponse) => {
            if (newResponse.redirect) {
              flux.emit(Events.REDIRECT, newResponse.redirect);
            } else {
              // NOTE: REFINEMENT_RESULTS is no longer, should check RESULTS
              flux.emit(Events.RESULTS, newResponse);

              const isDetailQuery = (newResponse.originalQuery.customUrlParams || [])
                .find(({ key }) => key === DETAIL_QUERY_INDICATOR);
              if (isDetailQuery) {
                flux.emit(Events.DETAILS, newResponse.records[0]);
              }
            }
          })
        }
      }
    };
  }
}

export default Observer;
