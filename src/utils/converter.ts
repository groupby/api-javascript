import { SelectedRefinement } from '../models/request';
import { Navigation } from '../models/response';

export class NavigationConverter {
  static convert(navigations: Array<Navigation>): Array<SelectedRefinement> {
    return navigations.reduce((refinements: Array<SelectedRefinement>, navigation: Navigation) => {
      navigation.refinements.forEach((refinement) => refinements.push(Object.assign(refinement, { navigationName: navigation.name })));
      return refinements;
    }, []);
  }
}
