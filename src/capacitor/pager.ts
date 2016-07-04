import { Results } from '../models/response';
import { FluxCapacitor, Events } from './index';

export class Pager {
  constructor(private flux: FluxCapacitor) { }

  next(): Promise<Results> {
    return this.paginate(true, this.hasNext);
  }

  prev(): Promise<Results> {
    return this.paginate(false, this.hasPrevious);
  }

  last(): Promise<Results> {
    const remainder = this.total % this.pageSize;
    this.flux.query.skip(remainder > 0 ? this.total - remainder : this.total - this.pageSize);
    return this.flux.search();
  }

  reset(): Promise<Results> {
    this.flux.query.skip(0);
    return this.flux.search();
  }

  get hasNext(): boolean {
    return this.step(true) < this.total;
  }

  get hasPrevious(): boolean {
    return this.lastStep !== 0;
  }

  private paginate(forward: boolean, predicate: boolean): Promise<Results | void> {
    const step = this.step(forward);
    if (predicate) {
      this.flux.query.skip(step);
      return this.flux.search();
    }
    return Promise.reject(new Error(`already on ${forward ? 'last' : 'first'} page`));
  }

  private step(add: boolean): number {
    const skip = this.lastStep + (add ? this.pageSize : -this.pageSize);
    return skip >= 0 ? skip : 0;
  }

  private get lastStep(): number {
    return this.flux.query.build().skip || 0;
  }

  private get pageSize(): number {
    return this.flux.query.build().pageSize || 10;
  }

  private get total(): number {
    return this.flux.results.totalRecordCount || -1;
  }
}
