import { Request } from '../models/request';
import { Events, FluxCapacitor } from './capacitor';
import * as redux from 'redux';

export default function observe(store: redux.Store<any>) {
  let oldState;

  return () => {
    const state = store.getState();

    oldState = state;
  };
}

export type Observer = (oldState: any, newState: any) => void

export type ObserverMap = { [key: string]: Observer | ObserverMap }

// tslint:disable-next-line max-line-length
export function resolveObserver(oldState: any = {}, newState: any = {}, observers: Observer & ObserverMap) {
  if (oldState !== newState) {
    if (typeof observers === 'function') {

    }
  }

  return null;
}

export const observers = (flux: FluxCapacitor) => ({
  request: {
    query: (oldQuery, newQuery) => {
      if (oldQuery !== newQuery) {

        flux.emit(Events.QUERY_CHANGED, newQuery);
      }
    },
    refinements: (oldRefinements, newRefinements) => {
      if (oldRefinements !== newRefinements) {

        flux.emit(Events.REFINEMENTS_CHANGED, newRefinements);
      }
    }
  },
  response: Object.assign(() => { }, {})
});
