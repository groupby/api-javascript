const stringify = require('fast-stable-stringify');

export class StringySet<T extends Object> {
  innerSet: Set<string>;

  add(x: T): StringySet<T> { 
    this.innerSet.add(stringify(x));
    return this;
  }

  has(x: T): boolean {
    return this.innerSet.has(stringify(x));
  }

  delete(x: T): boolean {
    return this.innerSet.delete(stringify(x));
  }

  toArray(): Array<T> {
    const objInnerSet: Array<T> = [];
    this.innerSet.forEach((x) => {
      objInnerSet.push(JSON.parse(x));
    });
    return objInnerSet;
  } 

  get size(): number {
    return this.innerSet.size;
  }

  constructor(array: Array<T> = []) {
    this.innerSet = new Set<string>();

    array.map((element: T) => {
      this.add(element);
    });
  }
}