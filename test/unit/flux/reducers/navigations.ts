import Actions from '../../../../src/flux/actions';
import navigations from '../../../../src/flux/reducers/navigations';
import Store from '../../../../src/flux/store';
import suite from '../../_suite';

suite.only('navigations', ({ expect }) => {
  let actions: Actions;
  const allIds = ['Format', 'Section'];
  const Format = {
    field: 'format',
    label: 'Format',
    more: true,
    or: true,
    selected: [0, 2],
    refinements: [
      { value: 'Hardcover', total: 200 },
      { value: 'Paper', total: 129 },
      { value: 'Audio Book', total: 293 },
    ],
  };
  const Section = {
    field: 'section',
    label: 'Section',
    more: true,
    or: false,
    selected: [3],
    refinements: [
      { value: 'Books', total: 203 },
      { value: 'Gifts', total: 1231 },
      { value: 'Toys', total: 231 },
      { value: 'Teens', total: 193 },
    ],
  };
  const state: Store.Indexed<Store.Navigation> = {
    allIds,
    byId: {
      Format,
      Section,
    },
  };
  beforeEach(() => actions = new Actions(<any>{}, <any>{}));

  describe('updateNavigations()', () => {
    it('should clear selected refinements state on UPDATE_SEARCH', () => {
      const newState = {
        allIds,
        byId: {
          Format: {
            ...Format,
            selected: [],
          },
          Section: {
            ...Section,
            selected: [],
          },
        },
      };

      const reducer = navigations(state, { type: Actions.UPDATE_SEARCH, clear: true });

      expect(reducer).to.eql(newState);
    });

    it('should clear and add selected refinement state on UPDATE_SEARCH', () => {
      const newState = {
        allIds,
        byId: {
          Format: {
            ...Format,
            selected: [0],
          },
          Section: {
            ...Section,
            selected: [],
          },
        },
      };

      const reducer = navigations(state, {
        type: Actions.UPDATE_SEARCH,
        clear: true,
        navigationId: 'Format',
        index: 0,
      });

      expect(reducer).to.eql(newState);
    });

    it('should add selected refinement state on SELECT_REFINEMENT', () => {
      const newState = {
        allIds,
        byId: {
          Format,
          Section: {
            ...Section,
            selected: [3, 0],
          },
        },
      };

      const reducer = navigations(state, {
        type: Actions.SELECT_REFINEMENT,
        navigationId: 'Section',
        index: 0,
      });

      expect(reducer).to.eql(newState);
    });

    it('should remove selected refinement state on DESELECT_REFINEMENT', () => {
      const newState = {
        allIds,
        byId: {
          Format: {
            ...Format,
            selected: [2],
          },
          Section,
        },
      };

      const reducer = navigations(state, {
        type: Actions.DESELECT_REFINEMENT,
        navigationId: 'Format',
        index: 0,
      });

      expect(reducer).to.eql(newState);
    });

    it('should return state on default', () => {
      const reducer = navigations(state, {});

      expect(reducer).to.eql(state);
    });
  });
});
