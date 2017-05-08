import * as redux from 'redux';
import * as core from '../../../src/flux/core';
import suite from '../_suite';

suite('Store', ({ expect, stub }) => {

  describe('create()', () => {
    it.skip('should call redux.createStore()', () => {
      const middleware = () => null;
      const reducer = stub(core, 'reducer');
      const applyMiddleware = stub(redux, 'applyMiddleware');
      const createStore = stub(redux, 'createStore');
      const combineReducers = stub(redux, 'combineReducers');

      const store = core.Store.create();

      expect(store).to.be.ok;
      expect(createStore).to.be.calledWith(reducer, {}, middleware);
    });
  });
});
