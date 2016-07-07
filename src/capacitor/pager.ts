import { Results } from '../models/response';
import { FluxCapacitor, Events } from './index';

export class Pager {
  constructor(private flux: FluxCapacitor) { }

  next(): Promise<Results> {
    return this.pageTo(this.step(true), this.hasNext, 'already on last page');
  }

  prev(): Promise<Results> {
    return this.pageTo(this.step(false), this.hasPrevious, 'already on first page');
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

  jump(page: number): Promise<Results> {
    const offset = this.pageSize * page;
    return this.pageTo(offset, offset >= 0 && offset < this.total, `page ${page} does not exist`);
  }

  get hasNext(): boolean {
    return this.step(true) < this.total;
  }

  get hasPrevious(): boolean {
    return this.lastStep !== 0;
  }

  private paginate(forward: boolean, predicate: boolean): Promise<Results | void> {
    return this.pageTo(this.step(forward), predicate, `already on ${forward ? 'last' : 'first'} page`);
  }

  private pageTo(offset: number, predicate: boolean, error: string): Promise<Results | void> {
    if (predicate) {
      this.flux.query.skip(offset);
      return this.flux.search();
    }
    console.log(error);
    return Promise.reject(new Error(error));
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
