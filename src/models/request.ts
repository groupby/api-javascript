export type SortOrder = 'Ascending' | 'Descending';

export interface Request {
    // query parameters
    query: string;
    refinements: SelectedRefinement[];

    // query configuration
    fields: string[];
    orFields: string[];
    includedNavigations: string[];
    excludedNavigations: string[];
    sort: Sort | Sort[];
    customUrlParams: CustomUrlParam[];
    restrictNavigation: RestrictNavigation;
    biasing: Biasing;
    matchStrategy: MatchStrategy;

    // configuration
    userId: string;
    language: string;
    collection: string;
    area: string;
    biasingProfile: string;

    // paging
    skip: number;
    pageSize: number;

    // format
    returnBinary: boolean;
    pruneRefinements: boolean;
    disableAutocorrection: boolean;
    wildcardSearchEnabled: boolean;

    // tracking
    sessionId?: string;
    visitorId?: string;
}

export type Sort = FieldSort | ByIdSort;

export interface BaseSort {
  order?: SortOrder;
}

export interface ByIdSort extends BaseSort {
  type: 'ByIds';
  ids: string[];
}

export interface FieldSort extends BaseSort {
  type?: 'Field';
  field: string;
}

export interface CustomUrlParam {
    key: string;
    value: string;
}

export interface BaseSelectedRefinement {
    navigationName: string;
    exclude?: boolean;
}

export interface SelectedRangeRefinement extends BaseSelectedRefinement {
    type: 'Range';
    low?: number;
    high?: number;
}

export interface SelectedValueRefinement extends BaseSelectedRefinement {
    type: 'Value';
    value: string;
}

export type SelectedRefinement = SelectedValueRefinement | SelectedRangeRefinement;

export interface RestrictNavigation {
    name: string;
    count: number;
}

export type BiasStrength = 'Absolute_Increase' | 'Strong_Increase' |
    'Medium_Increase' | 'Weak_Increase' | 'Leave_Unchanged' | 'Weak_Decrease' |
    'Medium_Decrease' | 'Strong_Decrease' | 'Absolute_Decrease';

export interface Bias {
    name: string;
    content?: string;
    strength: BiasStrength;
}

export interface Biasing {
    bringToTop?: string[];
    restrictToIds?: string[];
    augmentBiases: boolean;
    biases: Bias[];
    influence?: number;
}

export interface PartialMatchRule {
    terms?: number;
    termsGreaterThan?: number;
    mustMatch?: number;
    percentage?: boolean;
}

export interface MatchStrategy {
    rules: PartialMatchRule[];
}
