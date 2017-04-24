// tslint:disable ban-types
import './bootstrap';

const coreContext = (<{ context?: Function }>require).context('../src', true, /\.ts/);
coreContext.keys().forEach(coreContext);

const testContext = (<{ context?: Function }>require).context('./unit', true, /\.ts/);
testContext.keys().forEach(testContext);
