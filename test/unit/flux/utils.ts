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

  describe('conditional()', () => {
    it('should return a thunk', () => {
      const thunk = utils.conditional(() => false, 'MY_ACTION', { a: 'b', c: 'd' });

      expect(thunk).to.be.a('function');
    });

    it('should dispatch if predicate passes', () => {
      const dispatch = spy();
      const action = utils.conditional(() => true, 'MY_ACTION', { a: 'b', c: 'd' });

      action(dispatch, () => ({}));

      expect(dispatch).to.be.calledWith({ type: 'MY_ACTION', a: 'b', c: 'd' });
    });

    it('should not dispatch if predicate fails', () => {
      const dispatch = spy();
      const action = utils.conditional(() => false, 'MY_ACTION', {});

      action(dispatch, () => null);

      expect(dispatch).to.not.be.called;
    });

    it('should pass store to predicate', () => {
      const store = { a: 'b' };
      const predicate = spy();

      utils.conditional(predicate, 'MY_ACTION', {})(() => null, () => store);

      expect(predicate).to.be.calledWith(store);
    });
  });

  describe('LinkMapper()', () => {
    it('should return a mapping function', () => {
      const linkMapper = utils.LinkMapper('/search');

      expect(linkMapper).to.be.a('function');
    });

    it('should map to a value and url', () => {
      const linkMapper = utils.LinkMapper('/search');

      expect(linkMapper('my-path')).to.eql({ value: 'my-path', url: '/search/my-path' });
    });
  });
});
