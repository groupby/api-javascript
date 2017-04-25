import Actions from '../../../../src/flux/actions';
import collections from '../../../../src/flux/reducers/collections';
import Store from '../../../../src/flux/store';
import suite from '../../_suite';

suite.only('collections', ({ expect, spy }) => {
  let actions: Actions;
  beforeEach(() => actions = new Actions(<any>{}, <any>{}));

  describe('updateCollections()', () => {
    it('should update state on SELECT_COLLECTION', () => {
      const allIds = ['Department', 'Main'];
      const Department = {
        label: 'All content',
        name: 'contents',
        total: 750,
      };
      const Main = {
        label: 'Main content',
        name: 'mains',
        total: 600,
      };
      const selected = 'Main';
      const state: Store.Indexed.Selectable<Store.Collection> = {
        allIds,
        byId: {
          Department,
          Main,
        },
        selected: 'Department',
      };
      const newState = {
        allIds,
        byId: {
          Department,
          Main,
        },
        selected,
      };

      const reducer = collections(state, { type: Actions.SELECT_COLLECTION, id: selected });

      expect(reducer).to.eql(newState);
    });

    it('should update state on RECEIVE_AUTOCOMPLETE_SUGGESTIONS', () => {
      const allIds = ['Department', 'Main'];
      const label = 'All content';
      const name = 'contents';
      const total = 750;
      const Main = {
        label: 'Main content',
        name: 'mains',
        total: 600,
      };
      const selected = 'Main';
      const state: Store.Indexed.Selectable<Store.Collection> = {
        allIds,
        byId: {
          Department: {
            label,
            name,
            total: 650,
          },
          Main,
        },
        selected,
      };
      const newState = {
        allIds,
        byId: {
          Department: { label, name, total },
          Main,
        },
        selected,
      };

      const reducer = collections(state, {
        type: Actions.RECEIVE_COLLECTION_COUNT,
        collection: 'Department',
        count: total,
      });

      expect(reducer).to.eql(newState);
    });

    it('should return state on default', () => {
      const state: Store.Indexed.Selectable<Store.Collection> = {
        allIds: ['Department', 'Main'],
        byId: {
          Department: {
            label: 'All content',
            name: 'contents',
            total: 650,
          },
          Main: {
            label: 'Main content',
            name: 'mains',
            total: 600,
          },
        },
        selected: 'Main',
      };

      const reducer = collections(state, {});

      expect(reducer).to.eql(state);
    });
  });
});
