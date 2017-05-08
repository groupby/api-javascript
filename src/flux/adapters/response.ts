import {
  Navigation,
  PageInfo,
  RangeRefinement,
  Results,
  SortType,
  Template,
  ValueRefinement,
  Zone,
} from '../../models/response';
import { Actions, Store } from '../core';
import Pager from '../pager';

namespace Response {

  export const extractQuery = (results: Results, linkMapper: (value: string) => Store.Linkable): Actions.Query => ({
    corrected: results.correctedQuery,
    didYouMean: results.didYouMean.map(linkMapper),
    related: results.relatedQueries.map(linkMapper),
    rewrites: results.rewrites,
  });

  export const extractRefinement = ({ type, value, low, high, count: total }: RangeRefinement & ValueRefinement):
    Store.ValueRefinement | Store.RangeRefinement =>
    type === 'Value' ? { value, total } : { low, high, total };

  export const extractNavigationSort = (sort: SortType): Store.Sort => {
    switch (sort) {
      case 'Count_Ascending': return { field: 'count' };
      case 'Count_Descending': return { field: 'count', descending: true };
      case 'Value_Ascending': return { field: 'value' };
      case 'Value_Descending': return { field: 'value', descending: true };
    }
  };

  export const extractNavigation = (navigation: Navigation): Store.Navigation => ({
    field: navigation.name,
    label: navigation.displayName,
    more: navigation.moreRefinements,
    or: navigation.or,
    range: !!navigation.range,
    refinements: navigation.refinements.map(Response.extractRefinement),
    selected: [],
    sort: navigation.sort && Response.extractNavigationSort(navigation.sort),
  });

  // tslint:disable-next-line max-line-length
  export const refinementsMatch = (lhs: Store.RangeRefinement & Store.ValueRefinement, rhs: RangeRefinement & ValueRefinement) => {
    if (rhs.type === 'Value') {
      return lhs.value === rhs.value;
    } else {
      return lhs.low === rhs.low && lhs.high === rhs.high;
    }
  };

  export const appendSelectedRefinements = (available: Store.Navigation, selected: Navigation) => {
    available.selected = selected.refinements.reduce((indices, refinement) => {
      // tslint:disable-next-line max-line-length
      const index = (<any>available.refinements.findIndex)((availableRef) =>
        Response.refinementsMatch(availableRef, <any>refinement));
      if (index !== -1) {
        indices.push(index);
      }
      return indices;
    }, []);
  };

  export const combineNavigations = (available: Navigation[], selected: Navigation[]): Store.Navigation[] => {
    const navigations = available.reduce((map, navigation) =>
      Object.assign(map, { [navigation.name]: Response.extractNavigation(navigation) }), {});

    selected.forEach((selectedNav) => {
      const availableNav = navigations[selectedNav.name];

      if (availableNav) {
        Response.appendSelectedRefinements(availableNav, selectedNav);
      } else {
        const navigation = Response.extractNavigation(selectedNav);
        navigation.selected = <any[]>Object.keys(Array(selectedNav.refinements.length));
        navigations[selectedNav.name] = navigation;
      }
    });

    return Object.keys(navigations).reduce((navs, key) => navs.concat(navigations[key]), []);
  };

  export const extractZone = (zone: Zone): Store.Zone => {
    switch (zone.type) {
      case 'Content': return {
        content: zone.content,
        name: zone.name,
        type: Store.Zone.Type.CONTENT,
      };
      case 'Rich_Content': return {
        content: zone.content,
        name: zone.name,
        type: Store.Zone.Type.RICH_CONTENT,
      };
      case 'Records': return {
        name: zone.name,
        products: zone.records.map((record) => record.allMeta),
        type: Store.Zone.Type.RECORD,
      };
    }
  };

  export const extractTemplate = (template: Template): Store.Template => ({
    name: template.name,
    rule: template.ruleName,
    zones: Object.keys(template.zones).reduce((zones, key) =>
      Object.assign(zones, { [key]: Response.extractZone(template.zones[key]) }), {}),
  });

  export const extractPage = (store: Store.State): Actions.Page => Pager.build(store);

  // tslint:disable-next-line max-line-length
  export const extractAutocompleteSuggestions = ({ result }: any, category?: string): { suggestions: string[], categoryValues: string[] } => ({
    categoryValues: category && result.searchTerms[0] ? Response.extractCategoryValues(result.searchTerms[0], category) : [],
    suggestions: result.searchTerms.map(({ value }) => value),
  });

  // tslint:disable-next-line max-line-length
  export const extractCategoryValues = ({ additionalInfo }: { additionalInfo: { [key: string]: any } }, category: string) => additionalInfo[category] || [];

  export const extractAutocompleteProducts = ({ result: { products } }: any) => products.map(Response.extractProduct);

  export const extractProduct = ({ allMeta }) => allMeta;
}

export default Response;
