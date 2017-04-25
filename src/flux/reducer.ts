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

export function updateDetails(state: Store.Details, action) {
  switch (action) {
    case Actions.UPDATE_DETAILS_ID:
      return { ...state, id: action.id };
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

export function updateNavigations(state: Store.Indexed<Store.Navigation>, action) {
  const navigationId = action.navigationId;
  const refinementIndex = action.index;
  switch (action) {
    case Actions.UPDATE_SEARCH:
      // TODO: add case for clear
      if (action.clear) {
        const byIds = state.allIds.reduce(
          (newById, index) => Object.assign(newById, { [index]: { ...state.byId[index], selected: [] } }), { },
        );
  if (!(navigationId && action.index)) {
    return {
            ...state,
      byId: byIds,
    };
  } else {
    return {
            ...state,
      byId: {
              ...byIds,
        [navigationId]: {
                ...state.byId[refinementIndex],
          // TODO: maybe check if already there
          selected: refinementIndex,
        },
      },
    };
  }
}
    case Actions.SELECT_REFINEMENT:
if (navigationId && refinementIndex) {
  return {
          ...state,
    byId: {
            ...state.byId,
      [navigationId]: {
              ...state.byId[navigationId],
        // TODO: maybe check if already there
        selected: state.byId[navigationId].selected.concat(refinementIndex),
      },
    },
  };
} else {
  return state;
}
    case Actions.DESELECT_REFINEMENT:
return {
        ...state,
  byId: {
          ...state.byId,
    [navigationId]: {
            ...state.byId[navigationId],
      selected: state.byId[navigationId].selected.filter((index) => index !== refinementIndex),
    },
  },
};
    default:
return state;
  }
}

export function updatePage(state: Store.Page, action) {
  switch (action) {
    case Actions.UPDATE_SEARCH:
    case Actions.UPDATE_SORTS:
    case Actions.SELECT_COLLECTION:
    case Actions.SELECT_REFINEMENT:
    case Actions.DESELECT_REFINEMENT:
      return { ...state, current: 1 };
    case Actions.UPDATE_CURRENT_PAGE:
      return { ...state, current: action.page };
    case Actions.UPDATE_PAGE_SIZE:
      return { ...state, current: 1, size: action.size };
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

export function updateSorts(state: Store.Indexed.Selectable<Store.Sort.Labelled>, action) {
  switch (action) {
    case Actions.UPDATE_SORTS:
      return { ...state, selected: action.id };
    default:
      return state;
  }
}

export function updateTemplate(state, action) {
  switch (action) {
    // case Actions.UPDATE_TEMPLATE:
    //   return { ...state };
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
    details: updateDetails,
    errors: updateErrors,
    navigations: updateNavigations,
    page: updatePage,
    products: updateProducts,
    query: updateQuery,
    redirect: updateRedirect,
    sorts: updateSorts,
    template: updateTemplate,
    warnings: updateWarnings,
  }),
});
