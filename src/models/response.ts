export type SortType = 'Count_Ascending' | 'Count_Descending' | 'Value_Ascending' | 'Value_Descending';

export interface Results {

    id: string;

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
    zones: { [name: string]: Zone };
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
    type: 'Value' | 'Range';
    range?: boolean;
    max?: number;
    min?: number;
    or?: boolean;
    moreRefinements?: boolean;
    ignored?: boolean;
    sort?: SortType;
    refinements: Refinement[];
    metadata: any[];
}

export interface BaseRefinement {
    exclude?: boolean;
    count: number;
}

export interface ValueRefinement extends BaseRefinement {
    type: 'Value';
    value: string;
}

export interface RangeRefinement extends BaseRefinement {
    type: 'Range';
    low: number;
    high: number;
}

export type Refinement = ValueRefinement | RangeRefinement;

export interface RefinementResults {
    navigation: Navigation;
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
    richContent: string;
}

export interface RecordZone extends BaseZone {
    type: 'Record';
    query: string;
    records: Record[];
}
