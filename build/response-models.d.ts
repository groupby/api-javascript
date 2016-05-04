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
    records: Array<Record>;
    availableNavigation: Array<Navigation>;
    selectedNavigation: Array<Navigation>;
    didYouMean: Array<string>;
    relatedQueries: Array<string>;
    rewrites: Array<string>;
    errors: string;
    warnings: Array<string>;
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
    refinements: Array<ValueRefinement | RangeRefinement>;
    ignored: boolean;
}
export declare type RefinementType = 'Value' | 'Range';
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
