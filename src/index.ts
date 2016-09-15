require('array.prototype.find').shim();
require('array.prototype.findindex').shim();
require('es6-object-assign').polyfill();
require('es6-promise').polyfill();

export * from './core/query';
export * from './core/bridge';
export * from './capacitor/index';
export * from './utils/converter';
export * from './models/request';
export * from './models/response';
