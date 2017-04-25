import * as sinon from 'sinon';
import { BrowserBridge } from '../../../src/core/bridge';
import Actions from '../../../src/flux/actions';
import ResponseAdapter from '../../../src/flux/adapters/response';
import Selectors from '../../../src/flux/selectors';
import * as utils from '../../../src/flux/utils';
import suite from '../_suite';

suite('Actions', ({ expect, spy, stub }) => {
  let actions: Actions;
  const bridge: any = { a: 'b' };

  beforeEach(() => actions = new Actions(bridge, { search: '/search' }));

  describe('constructor()', () => {
    it('should set properties', () => {
      expect(actions['bridge']).to.eq(bridge);
      expect(actions['linkMapper']).to.be.a('function');
    });
  });

  describe('fetch action creators', () => {
    describe('fetchMoreRefinements()', () => {
      it('should return a thunk', () => {
        const thunk = actions.fetchMoreRefinements('brand');

        expect(thunk).to.be.a('function');
      });

      it('should not fetch if more refinements not available', () => {
        const navigationId = 'brand';
        const state = { a: 'b' };
        const dispatch = spy();
        const getStore = spy(() => state);
        const hasMoreRefinements = stub(Selectors, 'hasMoreRefinements').returns(false);
        const action = actions.fetchMoreRefinements(navigationId);

        action(dispatch, getStore);

        expect(getStore).to.be.called;
        expect(hasMoreRefinements).to.be.calledWith(state, navigationId);
        expect(dispatch).to.not.be.called;
      });

      it('should fetch more refinements', (done) => {
        const name = 'brand';
        const state = { a: 'b' };
        const search = { e: 'f' };
        const action = actions.fetchMoreRefinements(name);
        const refinementsStub = actions['bridge'].refinements
          = stub().resolves({ navigation: { name, refinements: ['c', 'd'] } });
        const searchRequest = stub(Selectors, 'searchRequest').returns(search);
        stub(Selectors, 'hasMoreRefinements').returns(true);
        stub(actions, 'receiveMoreRefinements');
        stub(ResponseAdapter, 'extractRefinement').callsFake((s) => s);

        const builtAction = action(() => null, () => state)
          .then(() => {
            expect(searchRequest).to.be.calledWith(state);
            expect(refinementsStub).to.be.calledWith(search, name);
            done();
          });
      });

      it('should store more refinements result', (done) => {
        const name = 'brand';
        const state = { a: 'b' };
        const moreRefinementsAction = { e: 'f' };
        const action = actions.fetchMoreRefinements(name);
        const dispatch = spy();
        const extractRefinement = stub(ResponseAdapter, 'extractRefinement').callsFake((value) => value);
        const receiveMoreRefinements = stub(actions, 'receiveMoreRefinements').returns(moreRefinementsAction);
        actions['bridge'].refinements = stub().resolves({ navigation: { name, refinements: ['c', 'd'] } });
        stub(Selectors, 'hasMoreRefinements').returns(true);
        stub(Selectors, 'searchRequest');

        const builtAction = action(dispatch, () => state)
          .then(() => {
            expect(extractRefinement).to.be.calledWith('c');
            expect(extractRefinement).to.be.calledWith('d');
            expect(receiveMoreRefinements).to.be.calledWith(name, ['c', 'd']);
            expect(dispatch).to.be.calledWith(moreRefinementsAction);
            done();
          });
      });
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
  });

  describe('response action creators', () => {
    describe('receiveSearchResponse()', () => {
      it('should return a thunk', () => {
        const results: any = {};

        const thunk = actions.receiveSearchResponse(results);

        expect(thunk).to.be.a('function');
      });

      it('should dispatch actions', () => {
        const receiveRedirectAction = () => null;
        const receiveQueryAction = () => null;
        const receiveProductsAction = () => null;
        const receiveNavigationsAction = () => null;
        const receivePageAction = () => null;
        const receiveTemplateAction = () => null;
        const receiveCollectionCountAction = () => null;
        const linkMapper = actions['linkMapper'] = () => null;
        const results: any = {
          availableNavigation: ['d', 'e'],
          records: [
            { allMeta: { u: 'v' } },
            { allMeta: { w: 'x' } },
          ],
          redirect: 'page.html',
          selectedNavigation: ['b', 'c'],
          template: { m: 'n' },
          totalRecordCount: 41,
        };
        const query: any = { y: 'z' };
        const navigations: any[] = ['a', 'b'];
        const page: any = { p: 'q' };
        const template: any = { c: 'd' };
        const state: any = { data: { collections: { selected: 'products' } } };
        const getStore = () => state;
        const dispatch = spy();
        const extractQuery = stub(ResponseAdapter, 'extractQuery').returns(query);
        const combineNavigations = stub(ResponseAdapter, 'combineNavigations').returns(navigations);
        const extractPage = stub(ResponseAdapter, 'extractPage').returns(page);
        const extractTemplate = stub(ResponseAdapter, 'extractTemplate').returns(template);
        const receiveRedirect = stub(actions, 'receiveRedirect').returns(receiveRedirectAction);
        const receiveQuery = stub(actions, 'receiveQuery').returns(receiveQueryAction);
        const receiveProducts = stub(actions, 'receiveProducts').returns(receiveProductsAction);
        const receiveNavigations = stub(actions, 'receiveNavigations').returns(receiveNavigationsAction);
        const receivePage = stub(actions, 'receivePage').returns(receivePageAction);
        const receiveTemplate = stub(actions, 'receiveTemplate').returns(receiveTemplateAction);
        const receiveCollectionCount = stub(actions, 'receiveCollectionCount').returns(receiveCollectionCountAction);
        const thunk = actions.receiveSearchResponse(results);

        thunk(dispatch, getStore);

        expect(receiveRedirect).to.be.calledWith(results.redirect);
        expect(dispatch).to.be.calledWith(receiveRedirectAction);
        expect(receiveQuery).to.be.calledWith(query);
        expect(extractQuery).to.be.calledWith(results, linkMapper);
        expect(dispatch).to.be.calledWith(receiveQueryAction);
        expect(receiveProducts).to.be.calledWith([{ u: 'v' }, { w: 'x' }], results.totalRecordCount);
        expect(dispatch).to.be.calledWith(receiveProductsAction);
        expect(receiveNavigations).to.be.calledWith(navigations);
        expect(combineNavigations).to.be.calledWith(results.availableNavigation, results.selectedNavigation);
        expect(dispatch).to.be.calledWith(receiveNavigationsAction);
        expect(receivePage).to.be.calledWith(page);
        expect(extractPage).to.be.calledWith(state);
        expect(dispatch).to.be.calledWith(receivePageAction);
        expect(receiveTemplate).to.be.calledWith(template);
        expect(extractTemplate).to.be.calledWith(results.template);
        expect(dispatch).to.be.calledWith(receiveTemplateAction);
        expect(receiveCollectionCount).to.be.calledWith(state.data.collections.selected, results.totalRecordCount);
        expect(dispatch).to.be.calledWith(receiveCollectionCountAction);
      });
    });

    describe('receiveQuery()', () => {
      it('should create a RECEIVE_QUERY action', () => {
        const query: any = { a: 'b' };
        const thunk = stub(utils, 'thunk');

        actions.receiveQuery(query);

        expect(thunk).to.be.calledWith(Actions.RECEIVE_QUERY, query);
      });
    });

    describe('receiveProducts()', () => {
      it('should create a RECEIVE_PRODUCTS action', () => {
        const products: any = ['a', 'b'];
        const recordCount = 10;
        const thunk = stub(utils, 'thunk');

        actions.receiveProducts(products, recordCount);

        expect(thunk).to.be.calledWith(Actions.RECEIVE_PRODUCTS, { products, recordCount });
      });
    });

    describe('receiveCollectionCount()', () => {
      it('should create a RECEIVE_NAVIGATIONS action', () => {
        const collection = 'products';
        const count = 10;
        const thunk = stub(utils, 'thunk');

        actions.receiveCollectionCount(collection, count);

        expect(thunk).to.be.calledWith(Actions.RECEIVE_COLLECTION_COUNT, { collection, count });
      });
    });

    describe('receiveNavigations()', () => {
      it('should create a RECEIVE_NAVIGATIONS action', () => {
        const navigations: any[] = ['a', 'b'];
        const thunk = stub(utils, 'thunk');

        actions.receiveNavigations(navigations);

        expect(thunk).to.be.calledWith(Actions.RECEIVE_NAVIGATIONS, { navigations });
      });
    });

    describe('receivePage()', () => {
      it('should create a RECEIVE_PAGE action', () => {
        const page: any = { a: 'b' };
        const thunk = stub(utils, 'thunk');

        actions.receivePage(page);

        expect(thunk).to.be.calledWith(Actions.RECEIVE_PAGE, page);
      });
    });

    describe('receiveTemplate()', () => {
      it('should create a RECEIVE_PAGE action', () => {
        const template: any = { a: 'b' };
        const thunk = stub(utils, 'thunk');

        actions.receiveTemplate(template);

        expect(thunk).to.be.calledWith(Actions.RECEIVE_TEMPLATE, { template });
      });
    });

    describe('receiveRedirect()', () => {
      it('should create a RECEIVE_PAGE action', () => {
        const redirect = 'page.html';
        const thunk = stub(utils, 'thunk');

        actions.receiveRedirect(redirect);

        expect(thunk).to.be.calledWith(Actions.RECEIVE_REDIRECT, { redirect });
      });
    });

    describe('receiveMoreRefinements()', () => {
      it('should create a RECEIVE_MORE_REFINEMENTS action', () => {
        const navigationId = 'brand';
        const refinements: any[] = ['a', 'b'];
        const thunk = stub(utils, 'thunk');

        actions.receiveMoreRefinements(navigationId, refinements);

        expect(thunk).to.be.calledWith(Actions.RECEIVE_MORE_REFINEMENTS, { navigationId, refinements });
      });
    });

    describe('receiveAutocompleteSuggestions()', () => {
      it('should create a RECEIVE_AUTOCOMPLETE_SUGGESTIONS action', () => {
        const navigationId = 'brand';
        const suggestions = ['a', 'b'];
        const categoryValues = ['c', 'd'];
        const thunk = stub(utils, 'thunk');

        actions.receiveAutocompleteSuggestions(suggestions, categoryValues);

        expect(thunk).to.be.calledWith(Actions.RECEIVE_AUTOCOMPLETE_SUGGESTIONS, { suggestions, categoryValues });
      });
    });

    describe('receiveDetailsProduct()', () => {
      it('should create a RECEIVE_DETAILS_PRODUCT action', () => {
        const product: any = { a: 'b' };
        const thunk = stub(utils, 'thunk');

        actions.receiveDetailsProduct(product);

        expect(thunk).to.be.calledWith(Actions.RECEIVE_DETAILS_PRODUCT, { product });
      });
    });
  });
});
