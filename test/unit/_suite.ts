import { expect } from 'chai';
import * as suite from 'mocha-suite';
import * as sinon from 'sinon';

export default <Suite>suite<Utils>((tests) => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  tests({
    expect,
    spy: (...args) => (<any>sandbox.spy)(...args),
    stub: (...args) => (<any>sandbox.stub)(...args),
  });
});

export interface Utils {
  expect: Chai.ExpectStatic;
  spy: sinon.SinonSpyStatic;
  stub: sinon.SinonStubStatic;
}

export type Suite = UtilsSuite & {
  only: UtilsSuite;
  skip: UtilsSuite;
};

export type UtilsSuite = (description: string, tests: (utils: Utils) => void) => void;
