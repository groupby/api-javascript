import * as redux from 'redux';
import * as reducers from '../../../src/flux/reducers';
import Store from '../../../src/flux/store';
import suite from '../_suite';

suite('Store', ({ expect, stub }) => {

  describe('create()', () => {
    it.skip('should call redux.createStore()', () => {
      const middleware = () => null;
      const reducer = stub(reducers, 'default');
      const applyMiddleware = stub(redux, 'applyMiddleware');
      const createStore = stub(redux, 'createStore');
      const combineReducers = stub(redux, 'combineReducers');

      const store = Store.create();

      expect(store).to.be.ok;
      expect(createStore).to.be.calledWith(reducer, {}, middleware);
    });
  });
});
