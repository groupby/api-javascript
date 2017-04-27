import Actions from '../../../../src/flux/actions';
import products from '../../../../src/flux/reducers/products';
import Store from '../../../../src/flux/store';
import suite from '../../_suite';

suite('products', ({ expect }) => {
  let actions: Actions;

  const state: Store.Product[] = [
    { id: '19232', allMeta: { price: 20, title: 'book'} },
    { id: '23942', allMeta: { price: 50, title: 'another book'} },
  ];
  beforeEach(() => actions = new Actions(<any>{}, <any>{}));

  describe('updateProducts()', () => {
    it('should update state on RECEIVE_PRODUCTS', () => {
      const selectedCollection = 'Department';
      const newState = [
        { id: '29384', allMeta: { price: 12, title: 'a new book!'} },
        { id: '34392', allMeta: { price: 30, title: 'a really interesting another book'} },
      ];

      const reducer = products(state, { type: Actions.RECEIVE_PRODUCTS, products: newState });

      expect(reducer).to.eql(newState);
    });

    it('should return state on default', () => {
      const reducer = products(state, {});

      expect(reducer).to.eql(state);
    });
  });
});
