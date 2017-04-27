import * as arrayIncludes from 'array-includes';
import * as arrayFind from 'array.prototype.find';
import * as arrayFindIndex from 'array.prototype.findindex';
import * as objectAssign from 'es6-object-assign';
import * as promise from 'es6-promise';
import 'es6-symbol/implement';

arrayFindIndex.shim();
arrayFind.shim();
arrayIncludes.shim();
objectAssign.polyfill();
promise.polyfill();
