import * as redux from 'redux';
import Actions from './actions';
import Store from './store';

export function updateAutocomplete(state: Store.Autocomplete, action) {
  switch (action) {
    case Actions.UPDATE_AUTOCOMPLETE_QUERY:
      return { ...state, query: action.query };
    default:
      return state;
  }
}

export function updateCollections(state: Store.Indexed.Selectable<Store.Collection>, action) {
  switch (action) {
    case Actions.SELECT_COLLECTION:
      return { ...state, selected: action.id };
    default:
      return state;
  }
}

export function updateErrors(state, action) {
  switch (action) {
    // case Actions.UPDATE_ERRORS:
    //   return { ...state };
    default:
      return state;
  }
}

export function updateNavigations(state: Store.Navigation, action) {
  switch (action) {
    //   case Actions.UPDATE_NAVIGATIONS:
    //    return { ...state };
    default:
      return state;
  }
}

export function updatePage(state: Store.Page, action) {
  switch (action) {
    case Actions.UPDATE_SEARCH:
      return { ...state, current: 1 };
    case Actions.UPDATE_CURRENT_PAGE:
      return { ...state, current: action.page };
    case Actions.UPDATE_PAGE_SIZE:
      return { ...state, size: action.size };
    default:
      return state;
  }
}

export function updateProducts(state: Store.Product, action) {
  switch (action) {
    // case Actions.UPDATE_PRODUCTS:
    //   return { ...state };
    default:
      return state;
  }
}

export function updateQuery(state: Store.Query, action) {
  switch (action) {
    case Actions.UPDATE_SEARCH:
      return { ...state, original: action.query };
    default:
      return state;
  }
}

export function updateRedirect(state, action) {
  switch (action) {
    // case Actions.UPDATE_REDIRECT:
    //   return { ...state };
    default:
      return state;
  }
}

export function updateSorts(state: Store.Sort, action) {
  switch (action) {
    case Actions.UPDATE_SORTS:
      return { ...state, field: action.field, descending: !!action.descending };
    default:
      return state;
  }
}

export function updateWarnings(state, action) {
  switch (action) {
    // case Actions.UPDATE_WARNINGS:
    //   return { ...state };
    default:
      return state;
  }
}

export default redux.combineReducers({
  data: redux.combineReducers({
    autocomplete: updateAutocomplete,
    collections: updateCollections,
    errors: updateErrors,
    navigations: updateNavigations,
    page: updatePage,
    products: updateProducts,
    query: updateQuery,
    redirect: updateRedirect,
    sorts: updateSorts,
    warnings: updateWarnings,
  }),
});
