import { FieldSort, Request, SelectedRefinement } from '../models/request';
import { Navigation } from '../models/response';

export class NavigationConverter {
  static convert(navigations: Navigation[]): SelectedRefinement[] {
    return navigations.reduce((refinements: SelectedRefinement[], navigation: Navigation) => {
      navigation.refinements
        // tslint:disable-next-line max-line-length
        .forEach((refinement) => refinements.push(<SelectedRefinement>Object.assign(refinement, { navigationName: navigation.name })));
      return refinements;
    }, []);
  }
}

export namespace Normalizers {
  export function normalizeSort(request: Request) {
    if (request.sort && !Array.isArray(request.sort) && (<FieldSort>request.sort).field === '_relevance') {
      delete request.sort;
    }
  }
}
