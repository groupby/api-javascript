import { Dispatch } from 'redux';
import { QueryTimeAutocompleteConfig, QueryTimeProductSearchConfig } from 'sayt';
import Actions from '.';
import { Selectors, Store } from '..';
import { Results } from '../../../models/response';
import ResponseAdapter from '../../adapters/response';
import { FluxCapacitor } from '../../capacitor';
import { conditional, LinkMapper, thunk } from '../../utils';

export default class Creator {

  private linkMapper: (value: string) => Store.Linkable;

  constructor(private flux: FluxCapacitor, paths: Actions.Paths) {
    this.linkMapper = LinkMapper(paths.search);
  }

  soFetching = (requestType: keyof Store.IsFetching) =>
    ({ type: Actions.SO_FETCHING, requestType })

  // fetch action creators
  fetchMoreRefinements = (navigationId: string) =>
    (dispatch: Dispatch<any>, getStore: () => Store.State) => {
      const state = getStore();
      if (Selectors.hasMoreRefinements(state, navigationId)) {
        dispatch(this.soFetching('moreRefinements'));
        return this.flux.bridge.refinements(Selectors.searchRequest(state), navigationId)
          .then(({ navigation: { name, refinements } }) => {
            const remapped = refinements.map(ResponseAdapter.extractRefinement);
            return dispatch(this.receiveMoreRefinements(name, remapped));
          });
      }
    }

  fetchProducts = () =>
    (dispatch: Dispatch<any>, getStore: () => Store.State) => {
      dispatch(this.soFetching('search'));
      return this.flux.bridge.search(Selectors.searchRequest(getStore()))
        .then((res) => dispatch(this.receiveSearchResponse(res)));
    }

  fetchAutocompleteSuggestions = (query: string, config: QueryTimeAutocompleteConfig) =>
    (dispatch: Dispatch<any>) => {
      dispatch(this.soFetching('autocompleteSuggestions'));
      return this.flux.sayt.autocomplete(query, config)
        .then((res) => {
          const { suggestions, categoryValues } = ResponseAdapter.extractAutocompleteSuggestions(res);
          dispatch(this.receiveAutocompleteSuggestions(suggestions, categoryValues));
        });
    }

  fetchAutocompleteProducts = (query: string, config: QueryTimeProductSearchConfig) =>
    (dispatch: Dispatch<any>) => {
      dispatch(this.soFetching('autocompleteProducts'));
      return this.flux.sayt.productSearch(query, config)
        .then((res) => {
          const products = ResponseAdapter.extractAutocompleteProducts(res);
          dispatch(this.receiveAutocompleteProducts(products));
        });
    }

  fetchCollectionCount = (collection: string) => (dispatch: Dispatch<any>, getStore: () => Store.State) =>
    this.flux.bridge.search({ ...Selectors.searchRequest(getStore()), collection })
      .then((res) => dispatch(this.receiveCollectionCount(collection, res.totalRecordCount)))

  // request action creators
  updateSearch = (search: Actions.Search) =>
    thunk(Actions.UPDATE_SEARCH, Object.assign(search))

  selectRefinement = (navigationId: string, index: number) =>
    conditional<Actions.Navigation.SelectRefinement>((state) =>
      Selectors.isRefinementDeselected(state, navigationId, index),
      Actions.SELECT_REFINEMENT, { navigationId, index })

  deselectRefinement = (navigationId: string, index: number) =>
    conditional<Actions.Navigation.DeselectRefinement>((state) =>
      Selectors.isRefinementSelected(state, navigationId, index),
      Actions.DESELECT_REFINEMENT, { navigationId, index })

  selectCollection = (id: string) =>
    conditional<Actions.Collections.SelectCollection>((state) =>
      state.data.collections.selected !== id,
      Actions.SELECT_COLLECTION, { id })

  selectSort = (id: string) =>
    conditional<Actions.Sort.UpdateSelected>((state) =>
      state.data.sorts.selected !== id,
      Actions.SELECT_SORT, { id })

  updatePageSize = (size: number) =>
    conditional<Actions.Page.UpdateSize>((state) =>
      state.data.page.size !== size,
      Actions.UPDATE_PAGE_SIZE, { size })

  updateCurrentPage = (page: number) =>
    conditional<Actions.Page.UpdateCurrent>((state) =>
      state.data.page.current !== page,
      Actions.UPDATE_CURRENT_PAGE, { page })

  updateDetailsId = (id: string) =>
    thunk<Actions.Details.UpdateId>(Actions.UPDATE_DETAILS_ID, { id })

  updateAutocompleteQuery = (query: string) =>
    conditional<Actions.Autocomplete.UpdateQuery>((state) =>
      state.data.autocomplete.query !== query,
      Actions.UPDATE_AUTOCOMPLETE_QUERY, { query })

  // response action creators
  receiveSearchResponse = (results: Results) =>
    (dispatch: Dispatch<any>, getStore: () => Store.State) => {
      const state = getStore();
      dispatch(this.receiveRedirect(results.redirect));
      dispatch(this.receiveQuery(ResponseAdapter.extractQuery(results, this.linkMapper)));
      dispatch(this.receiveProducts(results.records.map(ResponseAdapter.extractProduct)));
      // tslint:disable-next-line max-line-length
      dispatch(this.receiveNavigations(ResponseAdapter.combineNavigations(results.availableNavigation, results.selectedNavigation)));
      dispatch(this.receiveRecordCount(results.totalRecordCount));
      dispatch(this.receiveCollectionCount(state.data.collections.selected, results.totalRecordCount));
      dispatch(this.receivePage(ResponseAdapter.extractPage(state)));
      dispatch(this.receiveTemplate(ResponseAdapter.extractTemplate(results.template)));
    }

  receiveQuery = (query: Actions.Query) =>
    thunk<Actions.Query.ReceiveQuery>(Actions.RECEIVE_QUERY, query)

  receiveProducts = (products: Store.Product[]) =>
    thunk(Actions.RECEIVE_PRODUCTS, { products })

  receiveCollectionCount = (collection: string, count: number) =>
    thunk<Actions.Collections.ReceiveCount>(
      Actions.RECEIVE_COLLECTION_COUNT, { collection, count })

  receiveNavigations = (navigations: Store.Navigation[]) =>
    thunk<Actions.Navigation.ReceiveNavigations>(
      Actions.RECEIVE_NAVIGATIONS, { navigations })

  receivePage = (page: Actions.Page) =>
    thunk<Actions.Page.ReceivePage>(
      Actions.RECEIVE_PAGE, page)

  receiveTemplate = (template: Store.Template) =>
    thunk(Actions.RECEIVE_TEMPLATE, { template })

  receiveRecordCount = (recordCount: number) =>
    thunk(Actions.RECEIVE_RECORD_COUNT, { recordCount })

  receiveRedirect = (redirect: string) =>
    thunk(Actions.RECEIVE_REDIRECT, { redirect })

  receiveMoreRefinements = (navigationId: string, refinements: any) =>
    thunk(Actions.RECEIVE_MORE_REFINEMENTS, { navigationId, refinements })

  receiveAutocompleteSuggestions = (suggestions: string[], categoryValues: string[]) =>
    thunk(Actions.RECEIVE_AUTOCOMPLETE_SUGGESTIONS, { suggestions, categoryValues })

  receiveAutocompleteProducts = (products: Store.Product[]) =>
    thunk(Actions.RECEIVE_AUTOCOMPLETE_PRODUCTS, { products })

  receiveDetailsProduct = (product: Store.Product) =>
    thunk<Actions.Details.ReceiveProduct>(Actions.RECEIVE_DETAILS_PRODUCT, { product })
}
