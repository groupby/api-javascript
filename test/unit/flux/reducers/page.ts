import { ActionCreator, Actions, Store } from '../../../../src/flux/core';
import page from '../../../../src/flux/core/reducers/page';
import suite from '../../_suite';

suite('page', ({ expect }) => {
  let actions: ActionCreator;
  const first = 1;
  const size = 10;
  const current = 3;
  const limit = 5;
  const previous = 2;
  const next = 4;
  const last = 39;
  const from = 21;
  const to = 30;
  const range = [1, 2, 3, 4, 5];
  const state: Store.Page = {
    first, size, current, limit, previous, next, last, from, to, range,
  };
  beforeEach(() => actions = new ActionCreator(<any>{}, <any>{}));

  describe('updatePage()', () => {
    describe('should reset current state on', () => {
      const newState = {
        ...state,
        current: 1,
      };

      it('UPDATE_SEARCH', () => {
        const reducer = page(state, { type: Actions.UPDATE_SEARCH });

        expect(reducer).to.eql(newState);
      });

      it('UPDATE_SORTS', () => {
        const reducer = page(state, { type: Actions.SELECT_SORT });

        expect(reducer).to.eql(newState);
      });

      it('SELECT_COLLECTION', () => {
        const reducer = page(state, { type: Actions.SELECT_COLLECTION });

        expect(reducer).to.eql(newState);
      });

      it('SELECT_REFINEMENT', () => {
        const reducer = page(state, { type: Actions.SELECT_REFINEMENT });

        expect(reducer).to.eql(newState);
      });

      it('DESELECT_REFINEMENT', () => {
        const reducer = page(state, { type: Actions.DESELECT_REFINEMENT });

        expect(reducer).to.eql(newState);
      });
    });

    it('should update current state on UPDATE_CURRENT_PAGE', () => {
      const currentPage = 20;
      const newState = {
        ...state,
        current: currentPage,
      };

      const reducer = page(state, { type: Actions.UPDATE_CURRENT_PAGE, page: currentPage });

      expect(reducer).to.eql(newState);
    });

    it('should update size and reset current on UPDATE_PAGE_SIZE', () => {
      const pageSize = 25;
      const newState = {
        ...state,
        current: 1,
        size: pageSize,
      };

      const reducer = page(state, { type: Actions.UPDATE_PAGE_SIZE, size: pageSize });

      expect(reducer).to.eql(newState);
    });

    it('should update state on RECEIVE_PAGE', () => {
      const sentState = {
        from: 31,
        last: 49,
        next: 5,
        previous: 3,
        range: [2, 3, 4, 5, 6],
        to: 40,
      };
      const pageSize = 25;
      const newState = {
        ...state,
        ...sentState,
      };

      const reducer = page(state, { type: Actions.RECEIVE_PAGE, ...sentState });

      expect(reducer).to.eql(newState);
    });

    it('should return state on default', () => {
      const reducer = page(state, {});

      expect(reducer).to.eql(state);
    });
  });
});