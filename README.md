GroupBy Search API
========

<!-- ![release](https://img.shields.io/maven-central/v/com.groupbyinc/api-javascript.svg) -->
![license](https://img.shields.io/github/license/groupby/api-javascript.svg)
[![npm](https://img.shields.io/npm/dm/groupby-api.svg)](https://www.npmjs.com/package/groupby-api)
[![npm](https://img.shields.io/npm/v/groupby-api.svg)](https://www.npmjs.com/package/groupby-api)

Please follow the steps carefully to ensure a successful build.

Before running the install steps, ensure `node` and `npm` are installed on your system.

### Install global dependencies:

    npm i -g gulp typings

### To install:

    npm i

This will by default install the typings as well.


### To test:

    npm test

This will install the project and run all tests.


### Add this library as a dependency to your project:
The Uber JAR must be used to ensure shaded dependencies are included correctly.

#### NPM

  npm i --save groupby-api

### Examples

#### Searching

```javascript
import { CloudBridge, Query, Results } from 'groupby-api';

let bridge = new CloudBridge('<client-key>', '<customer-id>');
let query = new Query('dvd');
let results: Results = bridge.search(query);
```
