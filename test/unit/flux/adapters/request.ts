import Adapter from '../../../../src/flux/adapters/request';
import suite from '../../_suite';

suite('request adapters', ({ expect, stub }) => {

  describe('extractSearchRequest()', () => {
    it('should extract request parameters', () => {
      const state: any = { a: 'b' };
      const query = 'c';
      const collection = 'd';
      const refinements = ['e', 'f'];
      const sort = ['g', 'h'];
      const pageSize = 12;
      const skip = 43;
      const extractCollection = stub(Adapter, 'extractCollection').returns(collection);
      const extractQuery = stub(Adapter, 'extractQuery').returns(query);
      const extractPageSize = stub(Adapter, 'extractPageSize').returns(pageSize);
      const extractSkip = stub(Adapter, 'extractSkip').returns(skip);
      const extractRefinements = stub(Adapter, 'extractRefinements').returns(refinements);
      const extractSorts = stub(Adapter, 'extractSorts').returns(sort);

      const request = Adapter.extractSearchRequest(state);

      expect(request).to.eql({
        collection,
        query,
        refinements,
        pageSize,
        skip,
        sort,
      });
      expect(extractCollection).to.be.calledWith()
    });
  });

  describe('extractQuery()', () => {
    it('should extract query', () => {
      const query = 'rock climbing';
      const state: any = { data: { query: { original: query } } };

      expect(Adapter.extractQuery(state)).to.eq(query);
    });
  });

  describe('extractRefinements()', () => {
    it('should convert all selected refinements from navigations', () => {
      const state: any = {
        data: {
          navigations: {
            allIds: ['brand', 'price'],
            byId: {
              brand: {
                field: 'brand',
                refinements: [
                  { value: 'value 1' },
                  { value: 'value 2' },
                ],
              },
              price: {
                field: 'price',
                range: true,
                refinements: [
                  { low: 10, high: 30 },
                  { low: 30, high: 40 },
                ],
              },
            },
          },
        },
      };

      const refinements = Adapter.extractRefinements(state);

      expect(refinements).to.eql([
        { navigationName: 'brand', type: 'Value', value: 'value 1' },
        { navigationName: 'brand', type: 'Value', value: 'value 2' },
        { navigationName: 'price', type: 'Range', low: 10, high: 30 },
        { navigationName: 'price', type: 'Range', low: 30, high: 40 },
      ]);
    });
  });
});
