import { Normalizers } from '../../../src/utils';
import suite from '../_suite';

suite('Utils', ({ expect }) => {
  describe('Normalizers', () => {
    describe('normalizeSort()', () => {
      it('should remove sort if it is a single relevance sort', () => {
        const rest = { a: 'b' };
        const request = <any>{ ...rest, sort: { field: '_relevance' } };

        Normalizers.normalizeSort(request);

        expect(request).to.eql(rest);
      });

      it('should not modify request', () => {
        const rest = { a: 'b' };
        const request = <any>{ ...rest, sort: [{ field: '_relevance' }, { field: 'anything else' }] };

        Normalizers.normalizeSort(request);

        expect(request).to.eql(request);
      });
    });
  });
});
