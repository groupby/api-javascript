import { SelectedRefinement } from '../models/request';
import { Navigation } from '../models/response';

export class NavigationConverter {
  static convert(navigations: Navigation[]): SelectedRefinement[] {
    return navigations.reduce((refinements: SelectedRefinement[], navigation: Navigation) => {
      navigation.refinements
        .forEach((refinement) => refinements.push(Object.assign(refinement, { navigationName: navigation.name })));
      return refinements;
    }, []);
  }
}
