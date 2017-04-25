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
