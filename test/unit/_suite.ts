import { expect } from 'chai';
import * as suite from 'mocha-suite';

export default <Suite>suite<Utils>((tests) => {
  let sandbox: Sinon.SinonSandbox;

  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  tests({
    expect,
    spy: (...args) => (<any>sandbox.spy)(...args),
    stub: (...args) => (<any>sandbox.stub)(...args)
  });
});

export interface Utils {
  expect: Chai.ExpectStatic;
  spy: Sinon.SinonSpyStatic;
  stub: Sinon.SinonSpyStatic;
}

export type Suite = UtilsSuite & {
  only: UtilsSuite;
  skip: UtilsSuite;
};

export type UtilsSuite = (description: string, tests: (utils: Utils) => void) => void;
