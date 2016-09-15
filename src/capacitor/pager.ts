import { Results } from '../models/response';
import { Events, FluxCapacitor } from './index';

export class Pager {
  constructor(private flux: FluxCapacitor) { }

  next(realign: boolean = false): Promise<Results> {
    return realign ?
      this.jump(Math.min(this.currentPage + 1, this.finalPage)) :
      this.paginate(true, this.hasNext);
  }

  prev(realign: boolean = false): Promise<Results> {
    return realign ?
      this.jump(Math.max(this.currentPage - 1, 0)) :
      this.paginate(false, this.hasPrevious);
  }

  last(): Promise<Results> {
    return this.jump(this.finalPage);
  }

  reset(): Promise<Results> {
    return this.pageTo(0, true);
  }

  get currentPage(): number {
    return this.pageFromOffset(this.lastStep);
  }

  jump(page: number): Promise<Results> {
    const offset = this.pageSize * page;
    return this.pageTo(offset, offset >= 0 && offset < this.totalRecords, `page ${page} does not exist`);
  }

  get finalPage(): number {
    if (this.totalRecords > 0) {
      const total = Math.floor(this.totalRecords / this.pageSize);
      return this.totalRecords % this.pageSize === 0 ? Math.max(total - 1, 0) : total;
    }
    return 0;
  }

  pageNumbers(limit: number = 5): number[] {
    return Array.from(Array(Math.min(this.finalPage + 1, limit)).keys()).map(this.transformPages(limit));
  }

  pageFromOffset(offset: number): number {
    return Math.floor(offset / this.pageSize);
  }

  get hasNext(): boolean {
    return this.step(true) < this.totalRecords;
  }

  get hasPrevious(): boolean {
    return this.lastStep !== 0;
  }

  private transformPages(limit: number): (value: number) => number {
    const border = Math.floor(limit / 2);
    return (value: number): number => {
      // account for 0-indexed pages
      value++;
      if (this.currentPage <= border || limit > this.finalPage) {
        // pages start at beginning
        return value;
      } else if (this.currentPage > this.finalPage - border) {
        // pages start and end in the middle
        return value + this.finalPage + 1 - limit;
      } else {
        // pages end at last page
        return value + this.currentPage - border;
      }
    };
  }

  private paginate(forward: boolean, predicate: boolean): Promise<Results | void> {
    return this.pageTo(this.step(forward), predicate, `already on ${forward ? 'last' : 'first'} page`);
  }

  private pageTo(offset: number, predicate: boolean, error?: string): Promise<Results | void> {
    if (predicate) {
      this.flux.query.skip(offset);
      this.flux.emit(Events.PAGE_CHANGED, { pageIndex: this.pageFromOffset(offset) });
      return this.flux.search();
    }
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

  private get totalRecords(): number {
    return this.flux.results ? this.flux.results.totalRecordCount : -1;
  }

}
