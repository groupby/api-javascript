import Actions from '../../../src/flux/actions';
import suite from '../_suite';

suite.only('actions', ({ expect, stub }) => {
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

  });

  describe('updateQuery()', () => {
    it('should create an UPDATE_QUERY action', () => {
      const query = 'red apple';
      const thunk = stub(Actions, 'thunk');

      Actions.updateQuery(query);

      expect(thunk).to.be.calledWith(Actions.UPDATE_QUERY, { query });
    });
  });

  describe('addRefinement()', () => {
    it('should create an ADD_REFINEMENT action', () => {
      const refinement: any = { a: 'b' };
      const thunk = stub(Actions, 'thunk');

      Actions.addRefinement(refinement);

      expect(thunk).to.be.calledWith(Actions.ADD_REFINEMENT, { refinement });
    });
  });

  describe('removeRefinement()', () => {
    it('should create a REMOVE_REFINEMENT action', () => {
      const refinement: any = { a: 'b' };
      const thunk = stub(Actions, 'thunk');

      Actions.removeRefinement(refinement);

      expect(thunk).to.be.calledWith(Actions.REMOVE_REFINEMENT, { refinement });
    });
  });
});
