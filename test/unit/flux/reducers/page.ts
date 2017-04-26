import Actions from '../../../../src/flux/actions';
import page from '../../../../src/flux/reducers/page';
import Store from '../../../../src/flux/store';
import suite from '../../_suite';

suite('page', ({ expect }) => {
  let actions: Actions;
  const size: 10;
  const current: 3;
  const limit: 5;
  const previous: 2;
  const next: 4;
  const last: 39;
  const from: 21;
  const to: 30;
  const range: [1, 2, 3, 4, 5];
  const state: Store.Page = {
    size, current, limit, previous, next, last, from, to, range,
  };
  beforeEach(() => actions = new Actions(<any>{}, <any>{}));

  describe('updatePage()', () => {
    it('should clear selected refinements state on UPDATE_SEARCH', () => {
      // const newState = {
      //
      // };
      //
      // const reducer = navigations(state, { type: Actions.UPDATE_SEARCH, clear: true });
      //
      // expect(reducer).to.eql(newState);
    });
    //
    // it('should clear and add selected refinement state on UPDATE_SEARCH', () => {
    //   const state: Store.Indexed<Store.Navigation> = {
    //     allIds,
    //     byId: {
    //       Format,
    //       Section,
    //     },
    //   };
    //   const newState = {
    //     allIds,
    //     byId: {
    //       Format: {
    //         ...Format,
    //         selected: [0],
    //       },
    //       Section: {
    //         ...Section,
    //         selected: [],
    //       },
    //     },
    //   };
    //
    //   const reducer = navigations(state, {
    //     type: Actions.UPDATE_SEARCH,
    //     clear: true,
    //     navigationId: 'Format',
    //     index: 0,
    //   });
    //
    //   expect(reducer).to.eql(newState);
    // });
    //
    // it('should add selected refinement state on SELECT_REFINEMENT', () => {
    //   const state: Store.Indexed<Store.Navigation> = {
    //     allIds,
    //     byId: {
    //       Format,
    //       Section,
    //     },
    //   };
    //   const newState = {
    //     allIds,
    //     byId: {
    //       Format,
    //       Section: {
    //         ...Section,
    //         selected: [3, 0],
    //       },
    //     },
    //   };
    //
    //   const reducer = navigations(state, {
    //     type: Actions.SELECT_REFINEMENT,
    //     navigationId: 'Section',
    //     index: 0,
    //   });
    //
    //   expect(reducer).to.eql(newState);
    // });
    //
    // it('should remove selected refinement state on DESELECT_REFINEMENT', () => {
    //   const state: Store.Indexed<Store.Navigation> = {
    //     allIds,
    //     byId: {
    //       Format,
    //       Section,
    //     },
    //   };
    //   const newState = {
    //     allIds,
    //     byId: {
    //       Format,
    //       Section: {
    //         ...Section,
    //         selected: [],
    //       },
    //     },
    //   };
    //
    //   const reducer = navigations(state, {
    //     type: Actions.DESELECT_REFINEMENT,
    //     navigationId: 'Section',
    //     index: 3,
    //   });
    //
    //   expect(reducer).to.eql(newState);
    // });
    //
    // it('should return state on default', () => {
    //   const state: Store.Indexed<Store.Navigation> = {
    //     allIds,
    //     byId: {
    //       Format,
    //       Section,
    //     },
    //   };
    //
    //   const reducer = navigations(state, {});
    //
    //   expect(reducer).to.eql(state);
    // });
  });
});
