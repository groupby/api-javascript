import Actions from '../../../../src/flux/actions';
import autocomplete from '../../../../src/flux/reducers/autocomplete';
import Store from '../../../../src/flux/store';
import suite from '../../_suite';

suite('autocomplete', ({ expect }) => {
  let actions: Actions;
  const query = 'brown shoes';
  const category = { field: 'a', values: ['b'] };
  const suggestions = ['e', 'f', 'g'];
  const products = [];
  const state: Store.Autocomplete = {
    category,
    products,
    query,
    suggestions,
  };
  beforeEach(() => actions = new Actions(<any>{}, <any>{}));

  describe('autocompleteUpdate()', () => {
    it('should update query state on UPDATE_AUTOCOMPLETE_QUERY', () => {
      const newQuery = 'red shoes';
      const newState = {
        category,
        products,
        query: newQuery,
        suggestions,
      };

      const reducer = autocomplete(state, { type: Actions.UPDATE_AUTOCOMPLETE_QUERY, query: newQuery });

      expect(reducer).to.eql(newState);
    });

    it('should update state on RECEIVE_AUTOCOMPLETE_SUGGESTIONS', () => {
      const categoryValues = ['a', 'c', 'd'];
      const newState = {
        category: { ...category, values: categoryValues },
        products,
        query,
        suggestions,
      };

      const reducer = autocomplete(state, {
        type: Actions.RECEIVE_AUTOCOMPLETE_SUGGESTIONS,
        categoryValues,
        suggestions,
      });

      expect(reducer).to.eql(newState);
    });

    it('should return state on default', () => {
      const reducer = autocomplete(state, {});

      expect(reducer).to.eql(state);
    });
  });
});
