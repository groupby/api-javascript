import { expect } from 'chai';
import * as suite from 'mocha-suite';
import * as sinon from 'sinon';

export interface Utils {
  expect: Chai.ExpectStatic;
  spy: sinon.SinonSpyStatic;
  stub: sinon.SinonStubStatic;
}

export default suite<Utils, any>((tests) => {
  let sandbox: sinon.SinonSandbox;

  afterEach(() => sinon.restore());

  tests({
    expect,
    spy: sinon.spy,
    stub: sinon.stub
  });
});
