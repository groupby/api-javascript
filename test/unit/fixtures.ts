export let COMPLEX_REQUEST = {
  query: 'complex',
  sort: [
    { type: 'Field', field: 'price', order: 'Ascending' },
    { type: 'Field', field: 'boost', order: 'Descending' }
  ],
  fields: ['title', 'description'],
  orFields: ['brand', 'colour'],
  customUrlParams: [
    { key: 'banner', value: 'nike_landing' },
    { key: 'style', value: 'branded' }
  ],
  includedNavigations: ['brand', 'size'],
  excludedNavigations: ['_meta', 'originalPrice'],
  wildcardSearchEnabled: true,
  pruneRefinements: false,
  userId: '13afasd',
  language: 'en',
  collection: 'dev',
  area: 'Development',
  biasingProfile: 'boost top brands',
  pageSize: 300,
  skip: 40,
  restrictNavigation: {
    name: 'brand',
    count: 10
  },
  matchStrategy: {
    rules: [{ terms: 5, termsGreaterThan: 7 }]
  },
  biasing: {
    augmentBiases: true,
    biases: [{ name: 'popularity', strength: 'Strong_Decrease' }]
  },
  'pre-filter': 'brand = "shiny"',
  disableAutocorrection: true,
  returnBinary: false
};

export let BULK_REQUEST = {
  query: 'bulk',
  sort: [
    { type: 'Field', field: 'price', order: 'Ascending' },
    { type: 'Field', field: 'boost', order: 'Descending' }
  ],
  fields: ['title', 'description'],
  orFields: ['brand', 'colour'],
  customUrlParams: [
    { key: 'banner', value: 'nike_landing' },
    { key: 'style', value: 'branded' }
  ],
  includedNavigations: ['brand', 'size'],
  excludedNavigations: ['_meta', 'originalPrice'],
  wildcardSearchEnabled: false,
  pruneRefinements: true
};

export let COMBINED_REFINEMENTS = [
  {
    navigationName: 'size',
    type: 'Range',
    low: 1,
    high: 13,
    exclude: false
  },
  {
    navigationName: 'brand',
    type: 'Value',
    value: 'Nike',
    exclude: true
  },
  {
    navigationName: 'material',
    type: 'Value',
    value: 'wool'
  },
  {
    navigationName: 'year',
    type: 'Range',
    low: 2000,
    high: 2009,
    exclude: false
  },
  {
    navigationName: 'year',
    type: 'Range',
    low: 2010,
    high: 2011
  },
  {
    navigationName: 'rating',
    type: 'Value',
    value: '****',
    exclude: true
  },
  {
    navigationName: 'price',
    low: 122,
    high: 413,
    type: 'Range',
    exclude: false
  },
  {
    navigationName: 'rating',
    type: 'Value',
    value: '***'
  },
  {
    navigationName: 'price',
    type: 'Range',
    low: 31,
    high: 44
  },
  {
    navigationName: 'price',
    type: 'Range',
    low: 89,
    high: 100
  }
];

export let CUSTOM_PARAMS_FROM_STRING = [
  { key: 'banner', value: 'nike_landing' },
  { key: 'style', value: 'branded' },
  { key: 'defaults', value: '' },
  { key: 'others', value: '' },
  { key: 'something', value: 'as_well' }
];
