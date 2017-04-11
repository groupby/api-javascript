import * as redux from 'redux';

export default function observe(store: redux.Store<any>) {
  let prevState;

  return () => {
    const state = store.getState();

    prevState = state;
  };
}
