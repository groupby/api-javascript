import { FluxCapacitor } from './index';

export class Pager {
  constructor(private flux: FluxCapacitor) { }

  next() {
    return this.paginate(true, this.hasNext);
  }

  last() {
    return this.paginate(false, this.hasPrevious);
  }

  private paginate(forward: boolean, predicate: boolean) {
    const step = this.step(forward);
    if (predicate) {
      this.flux.query.skip(step);
      return this.flux.search();
    }
    return Promise.reject(new Error(`already on ${forward ? 'last' : 'first'} page`));
  }

  private get hasNext(): boolean {
    return this.step(true) < this.total;
  }

  private get hasPrevious(): boolean {
    return this.lastStep !== 0;
  }

  private step(add: boolean): number {
    const records = this.flux.results.records.length;
    const skip = this.lastStep + (add ? records : -records);
    return skip >= 0 ? skip : 0;
  }

  private get lastStep(): number {
    return this.flux.results.pageInfo.recordStart - 1;
  }
  private get total(): number {
    return this.flux.results.totalRecordCount;
  }
}
