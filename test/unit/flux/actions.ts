import { BrowserBridge } from '../../../src/core/bridge';
import Actions from '../../../src/flux/actions';
import Selectors from '../../../src/flux/selectors';
import * as utils from '../../../src/flux/utils';
import suite from '../_suite';

suite.only('Actions', ({ expect, spy, stub }) => {
  let actions: Actions;
  const bridge: any = { a: 'b' };

  beforeEach(() => actions = new Actions(bridge, { search: '/search' }));

  describe('constructor()', () => {
    it('should set properties', () => {
      expect(actions['bridge']).to.eq(bridge);
      expect(actions['linkMapper']).to.be.a('function');
    });
  });

  describe('request action creators', () => {
    describe('updateSearch()', () => {
      it('should create an UPDATE_SEARCH action', () => {
        const data: any = { a: 'b' };
        const thunk = stub(utils, 'thunk');

        actions.updateSearch(data);

        expect(thunk).to.be.calledWith(Actions.UPDATE_SEARCH, data);
      });
    });

    describe('selectRefinement()', () => {
      it('should create a SELECT_REFINEMENT action', () => {
        const navigationId = 'brand';
        const index = 3;
        const state = { a: 'b' };
        const conditional = stub(utils, 'conditional');
        const isRefinementDeselected = stub(Selectors, 'isRefinementDeselected');

        actions.selectRefinement(navigationId, index);

        expect(conditional).to.be.calledWith(sinon.match((predicate) => {
          predicate(state);
          return expect(isRefinementDeselected).to.be.calledWith(state, navigationId, index);
        }), Actions.SELECT_REFINEMENT, { navigationId, index });
      });
    });

    describe('deselectRefinement()', () => {
      it('should create a DESELECT_REFINEMENT action', () => {
        const navigationId = 'brand';
        const index = 3;
        const state = { a: 'b' };
        const conditional = stub(utils, 'conditional');
        const isRefinementSelected = stub(Selectors, 'isRefinementSelected');

        actions.deselectRefinement(navigationId, index);

        expect(conditional).to.be.calledWith(sinon.match((predicate) => {
          predicate(state);
          return expect(isRefinementSelected).to.be.calledWith(state, navigationId, index);
        }), Actions.DESELECT_REFINEMENT, { navigationId, index });
      });
    });

    describe('selectCollection()', () => {
      it('should create a SELECT_COLLECTION action', () => {
        const id = 'products';
        const conditional = stub(utils, 'conditional');

        actions.selectCollection(id);

        expect(conditional).to.be.calledWith(sinon.match((predicate) =>
          predicate({ data: { collections: { selected: 'tutorials' } } })),
          Actions.SELECT_COLLECTION, { id });
      });
    });

    describe('updateAutocompleteQuery()', () => {
      it('should create an UPDATE_AUTOCOMPLETE_QUERY action', () => {
        const query = 'William Shake';
        const conditional = stub(utils, 'conditional');

        actions.updateAutocompleteQuery(query);

        expect(conditional).to.be.calledWith(sinon.match((predicate) =>
          predicate({ data: { autocomplete: { query: 'Fred Flinsto' } } })),
          Actions.UPDATE_AUTOCOMPLETE_QUERY, { query });
      });
    });

    describe('updateSorts()', () => {
      it('should create a UPDATE_SORTS action', () => {
        const id = 'Price Ascending';
        const conditional = stub(utils, 'conditional');

        actions.updateSorts(id);

        expect(conditional).to.be.calledWith(sinon.match((predicate) =>
          predicate({ data: { sorts: { selected: 'Price Descending' } } })),
          Actions.UPDATE_SORTS, { id });
      });
    });

    describe('updatePageSize()', () => {
      it('should create an UPDATE_PAGE_SIZE action', () => {
        const size = 34;
        const conditional = stub(utils, 'conditional');

        actions.updatePageSize(size);

        expect(conditional).to.be.calledWith(sinon.match((predicate) =>
          predicate({ data: { page: { size: 20 } } })),
          Actions.UPDATE_PAGE_SIZE, { size });
      });
    });

    describe('updateCurrentPage()', () => {
      it('should create an UPDATE_CURRENT_PAGE action', () => {
        const page = 4;
        const conditional = stub(utils, 'conditional');

        actions.updateCurrentPage(page);

        expect(conditional).to.be.calledWith(sinon.match((predicate) =>
          predicate({ data: { page: { current: 3 } } })),
          Actions.UPDATE_CURRENT_PAGE, { page });
      });
    });

    describe('updateDetailsId()', () => {
      it('should create an UPDATE_CURRENT_PAGE action', () => {
        const id = '123';
        const thunk = stub(utils, 'thunk');

        actions.updateDetailsId(id);

        expect(thunk).to.be.calledWith(Actions.UPDATE_DETAILS_ID, { id });
      });
    });
  });

  describe('response action creators', () => {

  });
});
