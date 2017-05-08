import Adapter from '../../../../src/flux/adapters/response';
import Pager from '../../../../src/flux/pager';
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
      const available: any = { refinements: ['a', 'b', 'c', 'd'] };
      const selected: any = { refinements: ['a', 'd'] };
      const refinementsMatch = stub(Adapter, 'refinementsMatch')
        .callsFake((lhs, rhs) => lhs === rhs);

      Adapter.appendSelectedRefinements(available, selected);

      expect(available.selected).to.eql([0, 3]);
      expect(refinementsMatch).to.be.calledWith('a', 'a');
      expect(refinementsMatch).to.be.calledWith('a', 'd');
      expect(refinementsMatch).to.be.calledWith('b', 'd');
      expect(refinementsMatch).to.be.calledWith('c', 'd');
      expect(refinementsMatch).to.be.calledWith('d', 'd');
    });
  });

  describe('combineNavigations()', () => {
    it('should append selected refinements to available navigation');
  });

  describe('extractZone()', () => {
    it('should extract a content zone', () => {
      const content = 'Canada Day Sale!';
      const name = 'my zone';
      const zone: any = { type: 'Content', name, content };

      expect(Adapter.extractZone(zone)).to.eql({ type: 'content', name, content });
    });

    it('should extract a rich content zone', () => {
      const content = 'Canada Day Sale!';
      const name = 'my zone';
      const zone: any = { type: 'Rich_Content', name, content };

      expect(Adapter.extractZone(zone)).to.eql({ type: 'rich_content', name, content });
    });

    it('should extract a record zone', () => {
      const records = [{ allMeta: { a: 'b' } }, { allMeta: { c: 'd' } }];
      const name = 'my zone';
      const zone: any = { type: 'Records', name, records };

      expect(Adapter.extractZone(zone)).to.eql({
        type: 'record',
        name,
        products: [{ a: 'b' }, { c: 'd' }],
      });
    });
  });

  describe('extractTemplate()', () => {
    it('should convert template structure', () => {
      const template: any = {
        name: 'banner',
        ruleName: 'my rule',
        zones: {
          'zone 1': 'a',
          'zone 2': 'b',
        },
      };
      const extractZone = stub(Adapter, 'extractZone').returns('x');

      expect(Adapter.extractTemplate(template)).to.eql({
        name: 'banner',
        rule: 'my rule',
        zones: {
          'zone 1': 'x',
          'zone 2': 'x',
        },
      });
      expect(extractZone).to.be.calledWith('a');
      expect(extractZone).to.be.calledWith('b');
    });
  });

  describe('extractPage()', () => {
    it('should build page information', () => {
      const store: any = { a: 'b' };
      const pageInfo = { c: 'd' };
      const build = stub(Pager, 'build').returns(pageInfo);

      expect(Adapter.extractPage(store)).to.eql(pageInfo);
      expect(build).to.be.called;
    });
  });

  describe('extractAutocompleteSuggestions()', () => {
    it('should remap search term values', () => {
      const response = { result: { searchTerms: [{ value: 'a' }, { value: 'b' }] } };

      const { suggestions } = Adapter.extractAutocompleteSuggestions(response);

      expect(suggestions).to.eql(['a', 'b']);
    });

    it('should extract category values', () => {
      const brand = { a: 'b' };
      const values = ['x', 'y'];
      const searchTerm = { value: 'a', additionalInfo: { brand } };
      const response = { result: { searchTerms: [searchTerm] } };
      const extractCategoryValues = stub(Adapter, 'extractCategoryValues').returns(values);

      const { categoryValues } = Adapter.extractAutocompleteSuggestions(response, 'brand');

      expect(categoryValues).to.eq(values);
      expect(extractCategoryValues).to.be.calledWith(searchTerm);
    });

    it('should should ignore category if not specified', () => {
      const response = { result: { searchTerms: [{}] } };
      const extractCategoryValues = stub(Adapter, 'extractCategoryValues');

      Adapter.extractAutocompleteSuggestions(response);

      expect(extractCategoryValues).to.not.be.called;
    });

    it('should should ignore category if no search terms', () => {
      const response = { result: { searchTerms: [] } };
      const extractCategoryValues = stub(Adapter, 'extractCategoryValues');

      Adapter.extractAutocompleteSuggestions(response, 'brand');

      expect(extractCategoryValues).to.not.be.called;
    });
  });

  describe('extractCategoryValues()', () => {
    it('should return an array of category values', () => {
      const brand = ['a', 'b'];

      const values = Adapter.extractCategoryValues({ additionalInfo: { brand } }, 'brand');

      expect(values).to.eq(brand);
    });

    it('should default to empty array', () => {
      const values = Adapter.extractCategoryValues({ additionalInfo: {} }, 'brand');

      expect(values).to.eql([]);
    });
  });

  describe('extractAutocompleteProducts()', () => {
    it('should call extractProduct()', () => {
      const extractProduct = stub(Adapter, 'extractProduct').returns('x');

      const products = Adapter.extractAutocompleteProducts({ result: { products: ['a', 'b'] } });

      expect(products).to.eql(['x', 'x']);
      expect(extractProduct).to.be.calledWith('a');
      expect(extractProduct).to.be.calledWith('b');
    });
  });

  describe('extractProduct()', () => {
    it('should return the allMeta property', () => {
      const allMeta = { a: 'b' };

      expect(Adapter.extractProduct({ allMeta })).to.eq(allMeta);
    });
  });
});
