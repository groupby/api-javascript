import * as arrayFind from 'array.prototype.find';
import * as arrayFindIndex from 'array.prototype.findIndex';
import * as objectAssign from 'es6-object-assign';
import * as promise from 'es6-promise';
import 'es6-symbol/implement';

arrayFind.shim();
arrayFindIndex.shim();
objectAssign.polyfill();
promise.polyfill();
