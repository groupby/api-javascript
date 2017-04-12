import Observer from '../../src/flux/observer';
import { expect } from 'chai';

describe.only('Observer', () => {
  describe('listen()', () => {
    let sandbox: Sinon.SinonSandbox;

    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should return a function', () => {
      const observer = Observer.listen(<any>{});

      expect(observer).to.be.a('function');
    });

    it('should call store.getState()', () => {
      const getState = sinon.spy();
      const observer = Observer.listen(<any>{ store: { getState } });

      observer();

      expect(getState).to.be.called;
    });

    it('should call Observer.resolve()', () => {
      const newState = { a: 'b' };
      const flux: any = { store: { getState: () => newState } };
      const resolve = sandbox.stub(Observer, 'resolve');
      const create = sandbox.stub(Observer, 'create');
      const observer = Observer.listen(flux);

      observer();

      expect(resolve).to.be.calledWith(undefined, newState);
      expect(create).to.be.calledWith(flux);
    });
  });

  describe('resolve()', () => {
    it('should not call the observer if no changes', () => {
      const observer = sinon.spy();

      Observer.resolve(undefined, undefined, observer);

      expect(observer).to.not.be.called;
    });

    it('should not call the observer if not a function', () => {
      expect(() => Observer.resolve(1, 2, {})).to.not.throw();
    });

    it('should call the observer with the updated node', () => {
      const observer = sinon.spy();

      Observer.resolve(1, 2, (...args) => observer(...args));

      expect(observer).to.be.calledWith(1, 2);
    });

    it('should call resolve() on subtrees', () => {
      const observer1 = sinon.spy();
      const observer2 = sinon.spy();
      const observer3 = sinon.spy();
      const observer4 = sinon.spy();
      const observers = Object.assign((...args) => observer1(...args), {
        a: Object.assign((...args) => observer2(...args), {
          x: (...args) => observer3(...args)
        }),
        b: (...args) => observer4(...args)
      });
      const oldState = { a: { x: 1 } };
      const newState = { b: 2 };

      Observer.resolve(oldState, newState, observers);

      expect(observer1).to.be.calledWith(oldState, newState);
      expect(observer2).to.be.calledWith({ x: 1 }, undefined);
      expect(observer3).to.be.calledWith(1, undefined);
      expect(observer4).to.be.calledWith(undefined, 2);
    });

    it('should not call resolve() on equal subtrees', () => {
      const observer1 = sinon.spy();
      const observer2 = sinon.spy();
      const observer3 = sinon.spy();
      const observers = Object.assign((...args) => observer1(...args), {
        a: (...args) => observer2(...args),
        b: (...args) => observer3(...args)
      });
      const oldState = {};
      const newState = {};

      Observer.resolve(oldState, newState, observers);

      expect(observer1).to.be.calledWith(oldState, newState);
      expect(observer2).to.not.be.called;
      expect(observer3).to.not.be.called;
    });
  });

  describe('create()', () => {
    it('should return an observer tree', () => {
      const observers = Observer.create(<any>{});

      expect(observers).to.be.an('object');
      expect(observers.data).to.be.an('object');
      expect(observers.data.search).to.be.an('object');
      expect(observers.data.search.request).to.be.a('function');
      expect(observers.data.search.request.query).to.be.a('function');
      expect(observers.data.search.request.refinements).to.be.a('function');
      expect(observers.data.search.response).to.be.a('function');
    });
  });
});
