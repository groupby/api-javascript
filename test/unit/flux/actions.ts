import Actions from '../../../src/flux/actions';
import * as utils from '../../../src/flux/utils';
import suite from '../_suite';

suite('actions', ({ expect, spy, stub }) => {
  describe('updateSearch()', () => {
    it('should create an UPDATE_SEARCH action', () => {
      const data: any = { a: 'b' };
      const thunk = stub(utils, 'thunk');

      Actions.updateSearch(data);

      expect(thunk).to.be.calledWith(Actions.UPDATE_SEARCH, data);
    });
  });

  describe('selectRefinement()', () => {
    it('should create a SELECT_REFINEMENT action', () => {
      const navigationId = 'brand';
      const index = 3;
      const thunk = stub(utils, 'thunk');

      Actions.selectRefinement(navigationId, index);

      expect(thunk).to.be.calledWith(Actions.SELECT_REFINEMENT, { navigationId, index });
    });
  });

  describe('deselectRefinement()', () => {
    it('should create a DESELECT_REFINEMENT action', () => {
      const navigationId = 'brand';
      const index = 3;
      const thunk = stub(utils, 'thunk');

      Actions.deselectRefinement(navigationId, index);

      expect(thunk).to.be.calledWith(Actions.DESELECT_REFINEMENT, { navigationId, index });
    });
  });

  describe('selectCollection()', () => {
    it('should create a SELECT_COLLECTION action', () => {
      const id = 'products';
      const thunk = stub(utils, 'thunk');

      Actions.selectCollection(id);

      expect(thunk).to.be.calledWith(Actions.SELECT_COLLECTION, { id });
    });
  });

  describe('updateAutocompleteQuery()', () => {
    it('should create an UPDATE_AUTOCOMPLETE_QUERY action', () => {
      const query = 'William Shake';
      const thunk = stub(utils, 'thunk');

      Actions.updateAutocompleteQuery(query);

      expect(thunk).to.be.calledWith(Actions.UPDATE_AUTOCOMPLETE_QUERY, { query });
    });
  });

  describe('updateSorts()', () => {
    it('should create a UPDATE_SORTS action', () => {
      const sort = { field: 'price' };
      const thunk = stub(utils, 'thunk');

      Actions.updateSorts(sort);

      expect(thunk).to.be.calledWith(Actions.UPDATE_SORTS, { sorts: [sort] });
    });
  });

  describe('updatePageSize()', () => {
    it('should create an UPDATE_PAGE_SIZE action', () => {
      const size = 34;
      const thunk = stub(utils, 'thunk');

      Actions.updatePageSize(size);

      expect(thunk).to.be.calledWith(Actions.UPDATE_PAGE_SIZE, { size });
    });
  });

  describe('updateCurrentPage()', () => {
    it('should create an UPDATE_CURRENT_PAGE action', () => {
      const page = 4;
      const thunk = stub(utils, 'thunk');

      Actions.updateCurrentPage(page);

      expect(thunk).to.be.calledWith(Actions.UPDATE_CURRENT_PAGE, { page });
    });
  });

  describe('updateDetailsId()', () => {
    it('should create an UPDATE_CURRENT_PAGE action', () => {
      const id = '123';
      const thunk = stub(utils, 'thunk');

      Actions.updateDetailsId(id);

      expect(thunk).to.be.calledWith(Actions.UPDATE_DETAILS_ID, { id });
    });
  });
});
