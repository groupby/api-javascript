import { FluxCapacitor, Events } from './index';

export class Pager {
  constructor(private flux: FluxCapacitor) { }

  next() {
    return this.paginate(true, this.hasNext);
  }

  prev() {
    return this.paginate(false, this.hasPrevious);
  }

  last() {
    this.flux.query.skip(this.total - (this.total % this.pageSize));
    return this.flux.search();
  }

  reset() {
    this.flux.query.skip(0);
    return this.flux.search();
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
    const skip = this.lastStep + (add ? this.pageSize : -this.pageSize);
    return skip >= 0 ? skip : 0;
  }

  private get lastStep(): number {
    return this.flux.query.build().skip;
  }

  private get pageSize(): number {
    return this.flux.query.build().pageSize || 10;
  }

  private get total(): number {
    return this.flux.results.totalRecordCount;
  }
}
