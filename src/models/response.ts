export type RefinementType = 'Value' | 'Range';
export type SortType = 'Count_Ascending' | 'Count_Descending' | 'Value_Ascending' | 'Value_Descending';

export interface Results {

  query: string;
  originalQuery: string;
  correctedQuery: string;

  area: string;
  biasingProfile: string;
  redirect: string;

  template: Template;
  pageInfo: PageInfo;

  totalRecordCount: number;
  records: Record[];

  availableNavigation: Navigation[];
  selectedNavigation: Navigation[];
  didYouMean: string[];
  relatedQueries: string[];
  rewrites: string[];

  errors: string;
  warnings: string[];
  debugInfo: DebugInfo;
}

export interface Template {
  name: string;
  ruleName: string;
  zones: any;
}

export interface PageInfo {
  recordStart: number;
  recordEnd: number;
}

export interface DebugInfo {
  rawRequest: any;
  rawResponse: any;
  rawAggregationsRequest: any;
  rawAggregationsResponse: any;
}

export interface Record {
  id: string;
  url: string;
  title: string;
  snippet?: string;
  allMeta: any;
}

export interface Navigation {
  name: string;
  displayName: string;
  type: RefinementType;
  range?: boolean;
  or?: boolean;
  ignored?: boolean;
  sort?: SortType;
  refinements: Array<ValueRefinement | RangeRefinement>;
  metadata: any[];
}

export interface Refinement {
  exclude?: boolean;
  type: RefinementType;
}

export interface ValueRefinement extends Refinement {
  value: string;
}

export interface RangeRefinement extends Refinement {
  low: number;
  high: number;
}

export interface RefinementResults {
  navigation: Navigation;
}
