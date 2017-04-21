import * as redux from 'redux';
import Actions from './actions';
import Store from './store';

export function updateQuery(state: Store.Query, action) {
  if (action === Actions.UPDATE_SEARCH) {
    return { ...state, query: action.query };
  }
}

export function updateNavigations(state: Store.Navigation, action) {
  switch (action) {
    // case Actions.SELECT_REFINEMENT:
    // return { ...state, query: action.navigationId };
    default:
      return state;
  }
}

export function updateSort(state: Store.Sort, action) {
  switch (action) {
    // case Actions.UPDATE_QUERY:
    //   return { ...state, query: action.query };
    default:
      return state;
  }
}

export function updateProducts(state: Store.Product, action) {
  switch (action) {
    // case Actions.UPDATE_QUERY:
    //   return { ...state, query: action.query };
    default:
      return state;
  }
}

export function updateCollections(state: Store.Collection, action) {
  switch (action) {
    // case Actions.UPDATE_QUERY:
    //   return { ...state, query: action.query };
    default:
      return state;
  }
}

export function updateAutocomplete(state: Store.Autocomplete, action) {
  switch (action) {
    // case Actions.UPDATE_QUERY:
    //   return { ...state, query: action.query };
    default:
      return state;
  }
}

export function updateRedirect(state, action) {
  switch (action) {
    // case Actions.UPDATE_QUERY:
    //   return { ...state, query: action.query };
    default:
      return state;
  }
}

export function updateErrors(state, action) {
  switch (action) {
    // case Actions.UPDATE_QUERY:
    //   return { ...state, query: action.query };
    default:
      return state;
  }
}

export function updateWarnings(state, action) {
  switch (action) {
    // case Actions.UPDATE_QUERY:
    //   return { ...state, query: action.query };
    default:
      return state;
  }
}

export default redux.combineReducers({
  data: redux.combineReducers({
    query: updateQuery,
    sort: updateSort,
    products: updateProducts,
    collections: updateCollections,
    navigations: updateNavigations,
    autocomplete: updateAutocomplete,
    redirect: updateRedirect,
    errors: updateErrors,
    warnings: updateWarnings
  })
});
