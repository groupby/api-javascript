import Actions from '../../../../src/flux/actions';
import autocomplete from '../../../../src/flux/reducers/autocomplete';
import Store from '../../../../src/flux/store';
import suite from '../../_suite';

suite.only('autocomplete', ({ expect }) => {
  let actions: Actions;
  beforeEach(() => actions = new Actions(<any>{}, <any>{}));

  describe('autocompleteUpdate()', () => {
    it('should update state on UPDATE_AUTOCOMPLETE_QUERY', () => {
      const query = 'brown shoes';
      const category = { field: 'a', values: ['b'] };
      const products = [];
      const suggestions = [];
      const state: Store.Autocomplete = {
        category,
        products,
        query: 'red shoes',
        suggestions,
      };
      const newState = {
        category,
        products,
        query,
        suggestions,
      };

      const reducer = autocomplete(state, { type: Actions.UPDATE_AUTOCOMPLETE_QUERY, query });

      expect(reducer).to.eql(newState);
    });

    it('should update state on RECEIVE_AUTOCOMPLETE_SUGGESTIONS', () => {
      const query = 'brown shoes';
      const categoryValues = ['a', 'c', 'd'];
      const suggestions = ['e', 'f', 'g'];
      const products = [];
      const state: Store.Autocomplete = {
        category: { field: 'a', values: ['b'] },
        products,
        query,
        suggestions,
      };
      const newState = {
        category: { field: 'a', values: categoryValues },
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
      const state: Store.Autocomplete = {
        category: { field: 'a', values: ['b'] },
        products: [],
        query: 'red shoes',
        suggestions: [],
      };

      const reducer = autocomplete(state, {});

      expect(reducer).to.eql(state);
    });
  });
});
