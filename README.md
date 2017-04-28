GroupBy Search API
========

[![CircleCI](https://circleci.com/gh/groupby/api-javascript.svg?style=svg)](https://circleci.com/gh/groupby/api-javascript)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a94cf247a19f45cd9bdf344002f91da7)](https://www.codacy.com/app/GroupByInc/api-javascript?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=groupby/api-javascript&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/a94cf247a19f45cd9bdf344002f91da7)](https://www.codacy.com/app/GroupByInc/api-javascript?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=groupby/api-javascript&amp;utm_campaign=Badge_Coverage)

![license](https://img.shields.io/github/license/groupby/api-javascript.svg)
[![npm](https://img.shields.io/npm/dm/groupby-api.svg)](https://www.npmjs.com/package/groupby-api)
[![npm](https://img.shields.io/npm/v/groupby-api.svg)](https://www.npmjs.com/package/groupby-api)
[![Greenkeeper badge](https://badges.greenkeeper.io/groupby/api-javascript.svg)](https://greenkeeper.io/)

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

#### NPM

    npm i --save groupby-api

### Examples

#### Searching (typescript)

```javascript
import { CloudBridge, Query, Results } from 'groupby-api';

let bridge = new CloudBridge('<client-key>', '<customer-id>');
let query = new Query('dvd');
bridge.search(query)
  .then(results: Results => {
    // operate on results
  });

// OR

bridge.search(query, results: Results => {
    // operate on results
  });
```

#### Searching (ES5/CommonJS)

```javascript
var groupby = require('groupby-api');
var CloudBridge = groupby.CloudBridge,
  Query = groupby.Query,
  Results = groupby.Results;

var bridge = new CloudBridge('<client-key>', '<customer-id>');
var query = new Query('dvd');
bridge.search(query)
  .then(function(results) {
    // operate on results
  });

// OR

bridge.search(query, function(results) {
    // operate on results
  });
```
