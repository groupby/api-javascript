import Actions from '../../../src/flux/actions';
import suite from '../_suite';

suite.only('actions', ({ expect, spy, stub }) => {
  describe('conditional()', () => {
    it('should return result of action', () => {
      const obj = { a: 'b' };

      const result = Actions.conditional(true, () => obj);

      expect(result).to.eq(obj);
    });

    it('should return a resolved Promise', () => {
      const obj = { a: 'b' };

      const result = Actions.conditional(false, () => obj);

      expect(result).to.not.eq(obj);
      expect(result).to.be.an.instanceof(Promise);
    });
  });

  describe('thunk()', () => {
    it('should return a constructed thunk', () => {
      const dispatch = spy();
      const type = 'MY_ACTION';

      const thunk = Actions.thunk(type, { a: 'b' });

      expect(thunk).to.be.a('function');

      thunk(dispatch);

      expect(dispatch).to.be.calledWith({ type, a: 'b' });
    });
  });

  describe('updateQuery()', () => {
    it('should create an UPDATE_QUERY action', () => {
      const query = 'red apple';
      const thunk = stub(Actions, 'thunk');

      Actions.updateQuery(query);

      expect(thunk).to.be.calledWith(Actions.UPDATE_QUERY, { query });
    });
  });

  describe('selectRefinement()', () => {
    it('should create a SELECT_REFINEMENT action', () => {
      const refinement: any = { id: 1 };
      const thunk = stub(Actions, 'thunk');

      Actions.selectRefinement(refinement);

      expect(thunk).to.be.calledWith(Actions.SELECT_REFINEMENT, refinement);
    });
  });

  describe('deselectRefinement()', () => {
    it('should create a DESELECT_REFINEMENT action', () => {
      const refinement: any = { id: 1 };
      const thunk = stub(Actions, 'thunk');

      Actions.deselectRefinement(refinement);

      expect(thunk).to.be.calledWith(Actions.DESELECT_REFINEMENT, refinement);
    });
  });

  describe('selectCollection()', () => {
    it('should create a SELECT_COLLECTION action', () => {
      const collection: any = { id: 1 };
      const thunk = stub(Actions, 'thunk');

      Actions.selectCollection(collection);

      expect(thunk).to.be.calledWith(Actions.SELECT_COLLECTION, collection);
    });
  });

  describe('deselectCollection()', () => {
    it('should create a DESELECT_COLLECTION action', () => {
      const collection: any = { id: 1 };
      const thunk = stub(Actions, 'thunk');

      Actions.deselectCollection(collection);

      expect(thunk).to.be.calledWith(Actions.DESELECT_COLLECTION, collection);
    });
  });
});
