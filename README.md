GroupBy Search API
========

![license](https://img.shields.io/github/license/groupby/api-javascript.svg)
[![npm](https://img.shields.io/npm/dm/groupby-api.svg)](https://www.npmjs.com/package/groupby-api)
[![npm](https://img.shields.io/npm/v/groupby-api.svg)](https://www.npmjs.com/package/groupby-api)

The following instructions assume that you are creating a search & merch single page app using the 
GroupBy commerce platform.  
For instructions to integrate with an existing NodeJS application please read this file.
[README.nodejs.md](README.nodejs.md)

There are two ways to implement in an existing website, the prefered way is to have the searchandiser
API generate the HTML on your page and hookup the eventing for you.  This way you will inherit
all the best practices for your website in seconds.

Implementing on an existing website
---

###Step 1

Ensure that there are `div` tags on your site with IDs that correspond to the elements will be 
displayed.

```html
<html>
<head>...</head>
<body>
  <!-- the search box -->
  <div id="query"></div>
  <!-- Spelling suggestions from the engine -->
  <div id="didYouMean"></div>
  <!-- Related searches defined by the merchandisers -->
  <div id="relatedSearches"></div>
  <!-- Selected navigations that represent the 
       filters selected by the user -->
  <div id="selectedNavigation"></div>
  <!-- Based on the current search and navigation state
       these are the available filters that can be used -->
  <div id="availableNavigation"></div>
  <!-- Paging elements -->
  <div id="paging"></div>
  <!-- Records that match the search and nav state -->
  <div id="results"></div>
  <!-- If a rule has been fired this is where the template 
       zones will be unpacked -->
  <div id="template"></div>
</body>
</html>
```

###Step 2

Add the JavaScript that will attach the service to the div's above.

```html
<html>
<head></head>
<body>
<script src="://cdn.groupbycloud.com/build/api-javascript-1.0.2.min.js"></script>
<script src="://cdn.groupbycloud.com/build/api-javascript-searchandiser-1.0.2.min.js"></script>
<script>
    
    var config = {
        area: 'Production',
        collection: 'Products'
    };
    searchandiser(config);
    
    searchandiser.attach('query', '#query');
    searchandiser.attach('didYouMean', '#didYouMean');
    searchandiser.attach('relatedSearches', '#relatedSearches');
    searchandiser.attach('selectedNavigation', '#selectedNavigation');
    searchandiser.attach('availableNavigation', '#availableNavigation');
    searchandiser.attach('paging', '#paging');
    searchandiser.attach('results', '#results', function(id) {
       // event to handle results click
    });
    searchandiser.attach('template', '#template');

</script>
</body>
</html>

###Step 3
