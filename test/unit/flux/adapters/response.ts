import Adapter from '../../../../src/flux/adapters/response';
import suite from '../../_suite';

suite('response adapters', ({ expect, stub }) => {

  describe('extractQuery()', () => {
    it('should convert results to query structure', () => {
      const results: any = {
        correctedQuery: 'apple pie',
        didYouMean: ['a', 'b'],
        relatedQueries: ['c', 'd'],
        rewrites: ['e', 'f'],
      };
      const linkMapper = stub().returns('x');

      const query = Adapter.extractQuery(results, linkMapper);

      expect(query).to.eql({
        corrected: 'apple pie',
        didYouMean: ['x', 'x'],
        related: ['x', 'x'],
        rewrites: ['e', 'f'],
      });
      expect(linkMapper).to.be.calledWith('a');
      expect(linkMapper).to.be.calledWith('b');
      expect(linkMapper).to.be.calledWith('c');
      expect(linkMapper).to.be.calledWith('d');
    });
  });

  describe('extractRefinement()', () => {
    it('should return range refinement', () => {
      const refinement = Adapter.extractRefinement(<any>{
        type: 'Range',
        low: 20,
        high: 30,
        count: 50,
        a: 'b',
        c: 'd',
      });

      expect(refinement).to.eql({ low: 20, high: 30, total: 50 });
    });

    it('should return value refinement', () => {
      const refinement = Adapter.extractRefinement(<any>{
        type: 'Value',
        value: 'Nike',
        count: 23,
        a: 'b',
        c: 'd',
      });

      expect(refinement).to.eql({ value: 'Nike', total: 23 });
    });
  });

  describe('extractNavigationSort()', () => {
    it('should return an equivalent sort object', () => {
      expect(Adapter.extractNavigationSort('Count_Ascending')).to.eql({ field: 'count' });
      expect(Adapter.extractNavigationSort('Count_Descending')).to.eql({ field: 'count', descending: true });
      expect(Adapter.extractNavigationSort('Value_Ascending')).to.eql({ field: 'value' });
      expect(Adapter.extractNavigationSort('Value_Descending')).to.eql({ field: 'value', descending: true });
    });
  });

  describe('extractNavigation()', () => {
    it('should convert navigation to storefront navigation structure', () => {
      const navigation: any = {
        name: 'brand',
        displayName: 'Brand',
        moreRefinements: true,
        or: true,
        refinements: ['a', 'b'],
        sort: { c: 'd' },
      };
      const sort = { e: 'f' };
      const extractRefinement = stub(Adapter, 'extractRefinement').returns('x');
      const extractNavigationSort = stub(Adapter, 'extractNavigationSort').returns(sort);

      const extracted = Adapter.extractNavigation(navigation);

      expect(extracted).to.eql({
        field: 'brand',
        label: 'Brand',
        more: true,
        or: true,
        range: false,
        refinements: ['x', 'x'],
        selected: [],
        sort,
      });
      expect(extractRefinement).to.be.calledWith('a');
      expect(extractRefinement).to.be.calledWith('b');
      expect(extractNavigationSort).to.be.calledWith({ c: 'd' });
    });

    it('should ignore sort if not truthy', () => {
      const navigation: any = { refinements: [] };
      const extractNavigationSort = stub(Adapter, 'extractNavigationSort');

      const extracted = Adapter.extractNavigation(navigation);

      expect(extracted.sort).to.be.undefined;
      expect(extractNavigationSort).to.not.be.called;
    });
  });

  describe('refinementsMatch()', () => {
    it('should match value refinements', () => {
      const lhs: any = { type: 'Value', value: 'blue', a: 'b' };
      const rhs: any = { type: 'Value', value: 'blue', c: 'd' };

      expect(Adapter.refinementsMatch(lhs, rhs)).to.be.true;
    });

    it('should not match value refinements', () => {
      const lhs: any = { type: 'Value', value: 'blue' };
      const rhs: any = { type: 'Value', value: 'black' };

      expect(Adapter.refinementsMatch(lhs, rhs)).to.be.false;
    });

    it('should match range refinements', () => {
      const lhs: any = { type: 'Range', low: 20, high: 30, a: 'b' };
      const rhs: any = { type: 'Range', low: 20, high: 30, c: 'd' };

      expect(Adapter.refinementsMatch(lhs, rhs)).to.be.true;
    });

    it('should not match range refinements', () => {
      const lhs: any = { type: 'Range', low: 20, high: 40 };
      const rhs: any = { type: 'Range', low: 10, high: 30 };

      expect(Adapter.refinementsMatch(lhs, rhs)).to.be.false;
    });
  });

  describe('appendSelectedRefinements()', () => {
    it('should set selected on availble navigation', () => {
      const available: any = { refinements: ['a', 'b'] };
      const selected: any = { refinements: ['c', 'd'] };
      const refinementsMatch = stub(Adapter, 'refinementsMatch')
        .callsFake((lhs, rhs) => lhs === rhs);

      Adapter.appendSelectedRefinements(available, selected);

      expect(available.selected).to.eql([0, 0]);
      expect(refinementsMatch).to.be.calledWith('a', 'c');
      expect(refinementsMatch).to.be.calledWith('a', 'd');
      expect(refinementsMatch).to.be.calledWith('b', 'c');
      expect(refinementsMatch).to.be.calledWith('b', 'd');
    });
  });
});
