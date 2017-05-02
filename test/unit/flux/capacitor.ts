import * as mock from 'xhr-mock';
import Actions from '../../../src/flux/actions';
import Observer from '../../../src/flux/observer';
import Store from '../../../src/flux/store';
import { Events, FluxCapacitor, Results, SelectedValueRefinement, Sort } from '../../../src/index';
import suite from '../_suite';

const CUSTOMER_ID = 'services';
const SEARCH_URL = `http://${CUSTOMER_ID}-cors.groupbycloud.com/api/v1/search`;
const REFINEMENTS_URL = `${SEARCH_URL}/refinements`;
const SELECTED_REFINEMENT: SelectedValueRefinement = { type: 'Value', navigationName: 'brand', value: 'DeWalt' };
const REFINEMENT_RESULT = { availableNavigation: 'a', selectedNavigation: 'b' };
const DETAILS_RESULT = { records: [{}] };

suite('FluxCapacitor', ({ expect, spy, stub }) => {
  const LISTENER = () => null;
  let create: sinon.SinonStub;
  let listen: sinon.SinonStub;
  let subscribe: sinon.SinonSpy;
  let flux: FluxCapacitor;

  beforeEach(() => {
    mock.setup();
    subscribe = spy();
    create = stub(Store, 'create').returns({ subscribe });
    listen = stub(Observer, 'listen').returns(LISTENER);
    flux = new FluxCapacitor({ customerId: CUSTOMER_ID });
  });

  afterEach(() => {
    mock.teardown();
    flux = null;
  });

  describe('constructor()', () => {
    it('should be defined', () => {
      expect(flux).to.be.ok;
      expect(flux.bridge).to.be.ok;
      expect(flux.query).to.be.ok;
      expect(flux.results).to.not.be.ok;
    });

    it('should set up store and observer', () => {
      expect(listen).to.be.calledWith(flux);
      expect(subscribe).to.be.calledWith(LISTENER);
      expect(create).to.be.called;
    });

    it('should accept a mask for configuration', () => {
      const config: any = { a: 'something', b: 'Ascending' };

      flux = new FluxCapacitor(config);

      expect(flux.query.raw).to.contain.keys('a', 'b');

      flux = new FluxCapacitor(config);

      expect(flux.query.raw).to.not.contain.keys('a', 'b');
    });

    it('should strip fields from configuration', () => {
      flux = new FluxCapacitor(<any>{
        a: 'something',
        b: 'Ascending',
        bridge: {
          headers: { c: 'd' },
          https: true,
        },
      });

      expect(flux.query.raw).to.not.contain.keys('bridge');
    });

    it('should set headers on bridge', () => {
      const headers = { c: 'd' };
      flux = new FluxCapacitor(<any>{ bridge: { headers } });

      expect(flux.bridge.headers).to.eq(headers);
    });

    it('should set HTTPS on bridge', () => {
      flux = new FluxCapacitor({ customerId: CUSTOMER_ID, network: { https: true } });

      expect(flux.bridge.baseUrl).to.eq('https://services-cors.groupbycloud.com:443/api/v1');
    });

    it('should add default event listener', (done) => {
      const error: any = { a: 'b' };
      flux = new FluxCapacitor(<any>{});
      flux.on(Events.ERROR_BRIDGE, (err) => {
        expect(err).to.eq(error);
        done();
      });

      expect(flux.bridge.errorHandler).to.be.a('function');

      flux.bridge.errorHandler(error);
    });

    it('should set configured errorHandler on bridge', () => {
      const errorHandler = spy();
      flux = new FluxCapacitor(<any>{ network: { errorHandler } });
      const error: any = { a: 'b' };

      flux.bridge.errorHandler(error);

      expect(errorHandler.calledWith(error)).to.be.true;
    });

    it('should not override default errorHandler on bridge', (done) => {
      flux = new FluxCapacitor(<any>{ network: { errorHandler: () => null } });
      flux.on(Events.ERROR_BRIDGE, () => done());

      flux.bridge.errorHandler(<any>{});
    });
  });

  describe('actions', () => {
    let dispatch: sinon.SinonSpy;

    beforeEach(() => {
      dispatch = spy();
      flux.store = <any>{ dispatch };
    });

    describe('search()', () => {
      it('should dispatch updateSearch()', () => {
        const query = 'half moon';
        const updateSearch = stub(flux.actions, 'updateSearch');

        flux.search(query);

        expect(updateSearch).to.be.calledWith({ query });
      });

      it('should fallback to previous query', () => {
        const query = flux.originalQuery = 'half moon';
        const updateSearch = stub(flux.actions, 'updateSearch');

        flux.search();

        expect(updateSearch).to.be.calledWith({ query });
      });
    });

    describe('reset()', () => {
      it('should dispatch updateSearch()', () => {
        const query = 'half moon';
        const field = 'brand';
        const index = 8;
        const refinements = [{ a: 'b' }, { c: 'd' }];
        const updateSearch = stub(flux.actions, 'updateSearch');

        flux.reset(query, { field, index });

        expect(updateSearch).to.be.calledWith({ query, navigationId: field, index, clear: true });
      });

      it('should fallback to null query and empty refinements', () => {
        const updateSearch = stub(flux.actions, 'updateSearch');

        flux.reset();

        expect(updateSearch).to.be.calledWith({
          query: null,
          navigationId: undefined,
          index: undefined,
          clear: true,
        });
      });
    });

    describe('resize()', () => {
      it('should dispatch updatePageSize()', () => {
        const updatePageSize = stub(flux.actions, 'updatePageSize');

        flux.resize(24);

        expect(updatePageSize).to.be.calledWith(24);
      });
    });

    describe('sort()', () => {
      it('should dispatch updateSorts()', () => {
        const sort = 'Price Ascending';
        const updateSorts = stub(flux.actions, 'updateSorts');

        flux.sort(sort);

        expect(updateSorts).to.be.calledWith(sort);
      });
    });

    describe('refine()', () => {
      it('should dispatch selectRefinement()', () => {
        const selectRefinement = stub(flux.actions, 'selectRefinement');

        flux.refine('brand', 3);

        expect(selectRefinement).to.be.calledWith('brand', 3);
      });
    });

    describe('unrefine()', () => {
      it('should dispatch deselectRefinement()', () => {
        const deselectRefinement = stub(flux.actions, 'deselectRefinement');

        flux.unrefine('brand', 3);

        expect(deselectRefinement).to.be.calledWith('brand', 3);
      });
    });

    describe('details()', () => {
      it('should dispatch updateDetailsId()', () => {
        const id = '123123';
        const updateDetailsId = stub(flux.actions, 'updateDetailsId');

        flux.details(id);

        expect(updateDetailsId).to.be.calledWith(id);
      });
    });

    describe('switchCollection()', () => {
      it('should dispatch selectCollection()', () => {
        const selectCollection = stub(flux.actions, 'selectCollection');

        flux.switchCollection('products');

        expect(selectCollection).to.be.calledWith('products');
      });
    });
  });
});
