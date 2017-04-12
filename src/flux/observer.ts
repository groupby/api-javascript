import { Events, FluxCapacitor } from './capacitor';

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
      request: {
        query: (oldQuery, newQuery) => flux.emit(Events.QUERY_CHANGED, newQuery),
        refinements: (oldRefinements, newRefinements) => flux.emit(Events.REFINEMENTS_CHANGED, newRefinements)
      },
      response: Object.assign(() => { let a = 'a'; }, {})
    };
  }
}

export default Observer;
