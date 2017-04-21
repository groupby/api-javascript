import * as utils from '../../../src/flux/utils';
import suite from '../_suite';

suite('utils', ({ expect, spy }) => {
  describe('thunk()', () => {
    it('should return a constructed thunk', () => {
      const dispatch = spy();
      const type = 'MY_ACTION';

      const thunk = utils.thunk(type, { a: 'b' });

      expect(thunk).to.be.a('function');

      thunk(dispatch);

      expect(dispatch).to.be.calledWith({ type, a: 'b' });
    });
  });
});
