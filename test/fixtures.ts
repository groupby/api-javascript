export const COMPLEX_REQUEST = {
  area: 'Development',
  biasing: {
    augmentBiases: true,
    biases: [{ name: 'popularity', strength: 'Strong_Decrease' }],
  },
  biasingProfile: 'boost top brands',
  collection: 'dev',
  customUrlParams: [
    { key: 'banner', value: 'nike_landing' },
    { key: 'style', value: 'branded' },
  ],
  disableAutocorrection: true,
  excludedNavigations: ['_meta', 'originalPrice'],
  fields: ['title', 'description'],
  includedNavigations: ['brand', 'size'],
  language: 'en',
  matchStrategy: {
    rules: [{ terms: 5, termsGreaterThan: 7 }],
  },
  orFields: ['brand', 'colour'],
  pageSize: 300,
  pruneRefinements: false,
  query: 'complex',
  restrictNavigation: {
    count: 10,
    name: 'brand',
  },
  returnBinary: false,
  skip: 40,
  sort: [
    { field: 'price', order: 'Ascending' },
    { field: 'boost', order: 'Descending' },
  ],
  userId: '13afasd',
  wildcardSearchEnabled: true,
};

export const BULK_REQUEST = {
  customUrlParams: [
    { key: 'banner', value: 'nike_landing' },
    { key: 'style', value: 'branded' },
  ],
  excludedNavigations: ['_meta', 'originalPrice'],
  fields: ['title', 'description'],
  includedNavigations: ['brand', 'size'],
  orFields: ['brand', 'colour'],
  pruneRefinements: true,
  query: 'bulk',
  sort: [
    { field: 'price', order: 'Ascending' },
    { field: 'boost', order: 'Descending' },
  ],
  wildcardSearchEnabled: false,
};

export const COMBINED_REFINEMENTS = [
  {
    exclude: false,
    high: 13,
    low: 1,
    navigationName: 'size',
    type: 'Range',
  },
  {
    exclude: true,
    navigationName: 'brand',
    type: 'Value',
    value: 'Nike',
  },
  {
    navigationName: 'material',
    type: 'Value',
    value: 'wool',
  },
  {
    exclude: false,
    high: 2009,
    low: 2000,
    navigationName: 'year',
    type: 'Range',
  },
  {
    high: 2011,
    low: 2010,
    navigationName: 'year',
    type: 'Range',
  },
  {
    exclude: true,
    navigationName: 'rating',
    type: 'Value',
    value: '****',
  },
  {
    exclude: false,
    high: 413,
    low: 122,
    navigationName: 'price',
    type: 'Range',
  },
  {
    navigationName: 'rating',
    type: 'Value',
    value: '***',
  },
  {
    high: 44,
    low: 31,
    navigationName: 'price',
    type: 'Range',
  },
  {
    high: 100,
    low: 89,
    navigationName: 'price',
    type: 'Range',
  },
];

export const CUSTOM_PARAMS_FROM_STRING = [
  { key: 'banner', value: 'nike_landing' },
  { key: 'style', value: 'branded' },
  { key: 'defaults', value: '' },
  { key: 'others', value: '' },
  { key: 'something', value: 'as_well' },
];
