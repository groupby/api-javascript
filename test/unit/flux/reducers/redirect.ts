import Actions from '../../../../src/flux/actions';
import redirect from '../../../../src/flux/reducers/redirect';
import Store from '../../../../src/flux/store';
import suite from '../../_suite';

suite('redirect', ({ expect }) => {
  let actions: Actions;
  const state = '/go-here';
  beforeEach(() => actions = new Actions(<any>{}, <any>{}));

  describe('updateRedirect()', () => {
    it('should update redirect on RECEIVE_REDIRECT', () => {
      const newRedirect = '/no-go-here-instead';

      const reducer = redirect(state, { type: Actions.RECEIVE_REDIRECT, redirect: newRedirect });

      expect(reducer).to.eql(newRedirect);
    });

    it('should return state on default', () => {
      const reducer = redirect(state, {});

      expect(reducer).to.eql(state);
    });
  });
});
