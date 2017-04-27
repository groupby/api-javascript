import Adapter from '../../../../src/flux/adapters/request';
import suite from '../../_suite';

suite('request adapters', ({ expect }) => {

  describe('extractQuery()', () => {
    it.skip('should extract query', () => {
      const query = 'rock climbing';
      const state: any = { data: { query: { original: query } } };

      expect(Adapter.extractQuery(state)).to.eq(query);
    });
  });

  describe('extractRefinements()', () => {
    it.skip('should convert all selected refinements from navigations', () => {
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

      expect(refinements).to.eql([]);
    });
  });
});
