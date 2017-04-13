import { expect } from 'chai';
import * as suite from 'mocha-suite';

export default <(description: string, tests: (utils: Utils) => void) => void>suite<Utils>((tests) => {
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
