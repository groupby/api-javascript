import observe from '../../src/flux/observer';
import { expect } from 'chai';

describe.only('observer', () => {
  it('should return a function', () => {
    const observer = observe(<any>{});

    expect(observer).to.be.a('function');
  });

  it('should call store.getState()', () => {
    const getState = sinon.spy();
    const observer = observe(<any>{ getState });

    observer();

    expect(getState).to.be.called;
  });
});
