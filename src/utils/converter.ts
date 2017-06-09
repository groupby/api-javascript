import { BaseSelectedRefinement } from '../models/request';
import { Navigation } from '../models/response';

export class NavigationConverter {
  static convert(navigations: Array<Navigation>): Array<BaseSelectedRefinement> {
    return navigations.reduce((refinements: Array<BaseSelectedRefinement>, navigation: Navigation) => {
      navigation.refinements
        .forEach((refinement) => refinements.push(Object.assign(refinement, { navigationName: navigation.name })));
      return refinements;
    }, []);
  }
}
