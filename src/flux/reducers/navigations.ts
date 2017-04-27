import Actions from '../actions';
import Store from '../store';

export default function updateNavigations(state: Store.Indexed<Store.Navigation>, action) {
  const navigationId = action.navigationId;
  const refinementIndex = action.index;
  switch (action.type) {
    case Actions.UPDATE_SEARCH:
      // TODO: add case for clear
      if (action.clear) {
        const byIds = state.allIds.reduce(
          (navs, nav) => Object.assign(navs, { [nav]: {...state.byId[nav], selected: []} }), {},
        );
        if (!(navigationId && refinementIndex != null)) {
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
                ...state.byId[navigationId],
                // TODO: maybe check if already there
                selected: [refinementIndex],
              },
            },
          };
        }
      }
    case Actions.RECEIVE_NAVIGATIONS:
      const navigations = action.navigations;
      const newIds = navigations.map((nav) => nav.field);
      const byIds = navigations.reduce(
        (navs, nav) => Object.assign(navs, { [nav.field]: {...nav, selected: []} }), {},
      );
      return {
        ...state,
        allIds: newIds,
        byId: byIds,
      };
    case Actions.SELECT_REFINEMENT:
      if (navigationId && refinementIndex != null) {
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
      if (navigationId && refinementIndex != null) {
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
      } else {
        return state;
      }
    case Actions.RECEIVE_MORE_REFINEMENTS:
      const refinements = action.refinements;
      if (navigationId && refinements) {
        return {
          ...state,
          byId: {
            ...state.byId,
            [navigationId]: {
              ...state.byId[navigationId],
              refinements: state.byId[navigationId].refinements.concat(refinements),
            },
          },
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
