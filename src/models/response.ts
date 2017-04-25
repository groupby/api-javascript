import { Request } from './request';

export type RefinementType = 'Value' | 'Range';
export type SortType = 'Count_Ascending' | 'Count_Descending' | 'Value_Ascending' | 'Value_Descending';

export interface Results {

  query: string;
  originalQuery: string;
  correctedQuery: string;
  originalRequest: Request;

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

export type Zone = ContentZone | RichContentZone | RecordZone;

export interface BaseZone {
  name: string;
}

export interface ContentZone extends BaseZone {
  type: 'Content';
  content: string;
}

export interface RichContentZone extends BaseZone {
  type: 'Rich_Content';
  content: string;
}

export interface RecordZone extends BaseZone {
  type: 'Records';
  records: Record[];
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
  collection: string;
  snippet?: string;
  allMeta: any;
}

export interface Navigation {
  name: string;
  displayName: string;
  type: RefinementType;
  range?: boolean;
  or?: boolean;
  moreRefinements?: boolean;
  ignored?: boolean;
  sort?: SortType;
  refinements: Array<ValueRefinement & RangeRefinement>;
  metadata: any[];
}

export interface Refinement {
  exclude?: boolean;
  count: number;
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
