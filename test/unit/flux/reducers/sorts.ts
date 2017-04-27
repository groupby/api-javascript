import Actions from '../../../../src/flux/actions';
import sorts from '../../../../src/flux/reducers/sorts';
import Store from '../../../../src/flux/store';
import suite from '../../_suite';

suite('sorts', ({ expect }) => {
  let actions: Actions;
  const byId = {
    ['Price low to high']: { label: 'Price low to high', field: 'price', descending: false},
    ['Price high to low']: {label: 'Price high to low', field: 'price', descending: true},
  };
  const allIds = [];
  const state: Store.Indexed.Selectable<Store.Sort.Labelled> = {
    allIds,
    byId,
    selected: 'Price low to high',
  };
  beforeEach(() => actions = new Actions(<any>{}, <any>{}));

  describe('updateSorts()', () => {
    it('should update selected state on UPDATE_SORTS', () => {
      const newSelected = 'Price high to low';
      const newState = {
        ...state,
        selected: newSelected,
      };

      const reducer = sorts(state, { type: Actions.UPDATE_SORTS, id: newSelected });

      expect(reducer).to.eql(newState);
    });

    it('should return state on default', () => {
      const reducer = sorts(state, {});

      expect(reducer).to.eql(state);
    });
  });
});