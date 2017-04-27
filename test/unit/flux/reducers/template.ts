import Actions from '../../../../src/flux/actions';
import template from '../../../../src/flux/reducers/template';
import Store from '../../../../src/flux/store';
import suite from '../../_suite';

suite('template', ({ expect }) => {
  let actions: Actions;
  const state: Store.Template = {
    name: 'idk',
    rule: 'semantish',
    zones: {
      mainZone: {
        name: 'Starting template',
        type: 'content',
        content: 'Here\'s a template',
      },
    },
  };
  beforeEach(() => actions = new Actions(<any>{}, <any>{}));

  describe('updateTemplate()', () => {
    it('should update state on RECEIVE_TEMPLATE', () => {
      const newState = {
        name: 'idk2',
        rule: 'semantish2',
        zones: {
          mainZone: {
            name: 'Starting template2',
            type: 'content',
            content: 'Here\'s a template2',
          },
        },
      };

      const reducer = template(state, { type: Actions.RECEIVE_TEMPLATE, template: newState });

      expect(reducer).to.eql(newState);
    });

    it('should return state on default', () => {
      const reducer = template(state, {});

      expect(reducer).to.eql(state);
    });
  });
});
