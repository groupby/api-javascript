import { rayify } from '../utils';
import { Events, FluxCapacitor } from './capacitor';

export const DETAIL_QUERY_INDICATOR = 'gbiDetailQuery';
export const INDEXED = Symbol();

type Observer = (oldState: any, newState: any) => void;

namespace Observer {
  export type Map = { [key: string]: Observer | Map, indexed?: Observer };
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
      let observerResult;
      if (typeof observers === 'function') {
        observerResult = observers(oldState, newState);
      }

      if (oldState.allIds === newState.allIds && INDEXED in observers) {
        Object.keys(newState.allIds)
          .forEach((key) => observers.indexed(oldState.byId[key], newState.byId[key]))
      } else {
        Object.keys(observers)
          .forEach((key) => Observer.resolve((oldState || {})[key], (newState || {})[key], observers[key]));
      }
    }
  }

  export function create(flux: FluxCapacitor) {
    const emit = (event: string) => (_, newValue) => flux.emit(event, newValue);
    const indexed = (event: string, field: string, prefix: string) =>
      Object.assign(emit(event), {
        INDEXED,
        indexed: (_, newById) => Object.keys(newById)
      });

    return {
      data: {
        query: Object.assign(emit(Events.QUERY_UPDATED), {
          original: emit(Events.ORIGINAL_QUERY_UPDATED),
          corrected: emit(Events.CORRECTED_QUERY_UPDATED),
          related: emit(Events.RELATED_QUERIES_UPDATED),
          didYouMeans: emit(Events.DID_YOU_MEANS_UPDATED),
          rewrites: emit(Events.QUERY_REWRITES_UPDATED),
        }),

        sorts: emit(Events.SORT_UPDATED), // come up with approach for indexed

        products: emit(Events.PRODUCTS_UPDATED),

        collections: emit(Events.COLLECTIONS_UPDATED),

        navigations: emit(Events.NAVIGATIONS_UPDATED),

        autocomplete: {
          queries: emit(Events.AUTOCOMPLETE_QUERIES_UPDATED),
          categories: emit(Events.AUTOCOMPLETE_CATEGORIES_UPDATED),
          products: emit(Events.AUTOCOMPLETE_PRODUCTS_UPDATED)
        },

        reditect: emit(Events.REDIRECT),
      }
    };
  }
}

export default Observer;
