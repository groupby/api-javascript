/// <reference path="../typings/index.d.ts" />

import { expect } from 'chai';

import { StringySet } from '../src/utils/stringySet';
import { SelectedRefinement } from '../src/models/request';

describe('StringySet', () => {

  it('should take an array and return a set with no duplicates', () => {
    let s = new StringySet<number>([1,1,1,1,2,2,3,4,5,5]);
    expect(s.toArray().sort()).to.eql([1,2,3,4,5]);
  });

  it('should be defined', () => {
    let s = new StringySet<number>();
    expect(s).to.be.ok;
  });

  it('should be able to add numbers without repeats', () => {
    let s = new StringySet<number>();
    s.add(1);
    s.add(1);
    expect(s.toArray()).to.eql([1]);
    expect(s.size).to.eql(1);
  });

  it('should have 1', () => {
    let s = new StringySet<number>();
    s.add(1);
    s.add(1);
    expect(s.has(1)).to.be.true;
  });

  it('should be able to delete numbers', () => {
    let s = new StringySet<number>();
    s.add(1);
    s.add(2);
    s.delete(1);
    expect(s.toArray()).to.eql([2]);
    s.delete(4);
    expect(s.toArray()).to.eql([2]);
  });

  it('should be defined', () => {
    let s = new StringySet<Object>();
    expect(s).to.be.ok;
  });

  it('should be able to add objects without repeats', () => {
    let s = new StringySet<Object>();
    s.add({a: 'a', b: 'b'});
    s.add({a: 'a', b: 'b'});
    s.add({b: 'b', a: 'a'});
    expect(s.toArray()).to.eql([{a: 'a', b: 'b'}]);
    expect(s.toArray()).to.eql([{b: 'b', a: 'a'}]);
    expect(s.size).to.eql(1);
  });

  it('should have 1', () => {
    let s = new StringySet<Object>();
    s.add({a: 'a', b: 'b'});
    s.add({a: 'a', b: 'b'});
    expect(s.has({a: 'a', b: 'b'})).to.be.true;
    expect(s.has({b: 'b', a: 'a'})).to.be.true;
  });

  it('should be able to delete objects', () => {
    let s = new StringySet<Object>();
    s.add({a: 'a', b: 'b'});
    s.add({b: 'b', c: 'c', d: 'd'});
    s.delete({b: 'b', a: 'a'});
    expect(s.toArray()).to.eql([{b: 'b', d: 'd', c: 'c'}]);
    s.delete({});
    expect(s.toArray()).to.eql([{d: 'd', c: 'c', b: 'b'}]);
  });

});
