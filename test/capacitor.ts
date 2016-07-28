/// <reference path="../typings/index.d.ts" />

import { expect } from 'chai';
import mock = require('xhr-mock');
import { FluxCapacitor, Results, Events, SelectedValueRefinement, Sort } from '../src/index';

const CUSTOMER_ID = 'services';
const SEARCH_URL = `http://ecomm.groupbycloud.com/semanticSearch/${CUSTOMER_ID}`;
const SELECTED_REFINEMENT: SelectedValueRefinement = { type: 'Value', navigationName: 'brand', value: 'DeWalt' };
const REFINEMENT_RESULT = { availableNavigation: 'a', selectedNavigation: 'b' };
const DETAILS_RESULT = { records: [{}] };

describe('FluxCapacitor', function() {
  let flux: FluxCapacitor;

  beforeEach(() => {
    mock.setup();
    flux = new FluxCapacitor(CUSTOMER_ID);
  });

  afterEach(() => {
    mock.teardown();
    flux = null;
  });

  it('should be defined', () => {
    expect(flux).to.be.ok;
    expect(flux.bridge).to.be.ok;
    expect(flux.query).to.be.ok;
    expect(flux.results).to.not.be.ok;
  });

  describe('search behaviour', () => {
    it('should make a search request', done => {
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).query).to.eq('testing');
        done();
      });
      flux.search('testing');
    });

    describe('events', () => {
      it('should emit a results event', done => {
        mock.post(SEARCH_URL, (req, res) => res.body('ok'));
        flux.on(Events.RESULTS, () => done());
        flux.search('');
      });
    });
  });

  describe('refinement behaviour', () => {
    it('should make a request on refinement', done => {
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).refinements.length).to.eq(1);
        done();
      });
      flux.refine(SELECTED_REFINEMENT);
    });

    it('should make a request on un-refinement', done => {
      flux.query.withSelectedRefinements(SELECTED_REFINEMENT);
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).refinements).to.not.be.ok;
        done();
      });
      flux.unrefine(SELECTED_REFINEMENT);
    });

    it('should un-refine with deep equality', done => {
      flux.query.withSelectedRefinements(SELECTED_REFINEMENT);
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).refinements).to.not.be.ok;
        done();
      });

      // intentionally not using SELECTED_REFINEMENT
      flux.unrefine({ type: 'Value', navigationName: 'brand', value: 'DeWalt' });
    });

    it('should reset paging on refinement', done => {
      mock.post(SEARCH_URL, (req, res) => res.body('ok'));

      flux.refine(SELECTED_REFINEMENT)
        .then(() => {
          expect(flux.query.build().skip).to.eq(0);
          done();
        });
    });

    it('should reset paging on un-refinement', done => {
      flux.query.skip(20);
      flux.query.withSelectedRefinements(SELECTED_REFINEMENT);
      mock.post(SEARCH_URL, (req, res) => res.body('ok'));

      flux.unrefine(SELECTED_REFINEMENT)
        .then(() => {
          expect(flux.query.build().skip).to.eq(0);
          done();
        });
    });

    it('should skip reset paging on refinement', done => {
      flux.query.skip(20);
      mock.post(SEARCH_URL, (req, res) => res.body('ok'));

      flux.refine(SELECTED_REFINEMENT, { reset: false })
        .then(() => {
          expect(flux.query.build().skip).to.eq(20);
          done();
        });
    });

    describe('events', () => {
      it('should emit refinements_changed event on refinement', done => {
        mock.post(SEARCH_URL, (req, res) => res.body(JSON.stringify(REFINEMENT_RESULT)));

        flux.on(Events.REFINEMENTS_CHANGED, data => {
          expect(data.available).to.eq('a');
          expect(data.selected).to.eq('b');
          done();
        });
        flux.refine(SELECTED_REFINEMENT);
      });

      it('should emit refinements_changed event on un-refinement', done => {
        flux.query.withSelectedRefinements(SELECTED_REFINEMENT);
        mock.post(SEARCH_URL, (req, res) => res.body(JSON.stringify(REFINEMENT_RESULT)));

        flux.on(Events.REFINEMENTS_CHANGED, data => {
          expect(data.available).to.eq('a');
          expect(data.selected).to.eq('b');
          done();
        });
        flux.unrefine(SELECTED_REFINEMENT);
      });
    });
  });

  describe('paging behaviour', () => {
    beforeEach(() => {
      flux.query.skip(20);
      flux.results = <Results>{ totalRecordCount: 300 };
    });

    it('should reset paging', done => {
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).skip).to.eq(0);
        done();
      });
      flux.page.reset();
    });

    it('should page forward', done => {
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).skip).to.eq(30);
        done();
      });
      flux.page.next();
    });

    it('should page backward', done => {
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).skip).to.eq(10);
        done();
      });
      flux.page.prev();
    });

    it('should advance to last page', done => {
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).skip).to.eq(290);
        done();
      });
      flux.page.last();
    });
  });

  describe('resizing behaviour', () => {
    it('should resize the page and keep offset', done => {
      flux.query.skip(20);
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).skip).to.eq(20);
        expect(JSON.parse(req.body()).pageSize).to.eq(30);
        done();
      });
      flux.resize(30);
    });

    it('should resize the page', done => {
      flux.query.skip(20);
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).skip).to.eq(0);
        expect(JSON.parse(req.body()).pageSize).to.eq(30);
        done();
      });
      flux.resize(30, 0);
    });
  });

  describe('reset behaviour', () => {
    it('should reset the query', done => {
      flux.query
        .withQuery('alabama')
        .withPageSize(20)
        .skip(34)
        .withSelectedRefinements({ navigationName: 'a', value: 'b', type: 'Value' })
        .withOrFields('boots', 'hats');
      mock.post(SEARCH_URL, (req, res) => {
        const body = JSON.parse(req.body());
        expect(body.pageSize).to.be.ok;
        expect(body.orFields).to.be.ok;
        expect(body.refinements).to.not.be.ok;
        expect(body.skip).to.not.be.ok;
        expect(body.query).to.eq('');
        done();
      });
      flux.reset();
    });

    it('should accept a new query on reset', done => {
      flux.query.withQuery('alabama');
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).query).to.eq('texas');
        done();
      });
      flux.reset('texas');
    });

    describe('events', () => {
      it('should emit events', done => {
        mock.post(SEARCH_URL, (req, res) => res.body('ok'));

        let count = 0;
        const checkComplete = () => {
          if (++count === 2) done();
        };
        flux.on(Events.RESET, checkComplete);
        flux.on(Events.PAGE_CHANGED, checkComplete);
        flux.reset();
      });
    });
  });

  describe('sort behaviour', () => {
    it('should reset paging but not refinements', (done) => {
      const refinement: SelectedValueRefinement = { navigationName: 'brand', type: 'Value', value: 'DeWalt' };
      flux.query.skip(30)
        .withSelectedRefinements(refinement);
      mock.post(SEARCH_URL, (req, res) => {
        const body = JSON.parse(req.body());
        expect(body.skip).to.eql(0);
        expect(body.sort).to.eql([{ field: 'price', order: 'Ascending' }]);
        expect(body.refinements).to.eql([refinement]);
        done();
      });
      flux.sort({ field: 'price', order: 'Ascending' });
    });

    it('should add sorts', (done) => {
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).sort).to.eql([{ field: 'price', order: 'Ascending' }]);
        done();
      });
      flux.sort({ field: 'price', order: 'Ascending' });
    });

    it('should add more sorts', (done) => {
      flux.query.withSorts({ field: 'title', order: 'Descending' });
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).sort.length).to.eq(2);
        done();
      });
      flux.sort({ field: 'price', order: 'Ascending' });
    });

    it('should remove sorts', (done) => {
      flux.query.withSorts({ field: 'price', order: 'Descending' });
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).sort).to.eql([{ field: 'price', order: 'Ascending' }]);
        done();
      });
      flux.sort({ field: 'price', order: 'Ascending' });
    });

    it('should remove all sorts', (done) => {
      const sorts: Sort[] = [{ field: 'price', order: 'Descending' }, { field: 'other', order: 'Ascending' }, { field: 'type', order: 'Descending' }];
      flux.query.withSorts(...sorts);
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).sort).to.eql([{ field: 'price', order: 'Ascending' }]);
        done();
      });
      flux.sort({ field: 'price', order: 'Ascending' }, sorts);
    });
  });

  describe('details behaviour', () => {
    it('should refine by id', (done) => {
      mock.post(SEARCH_URL, (req, res) => {
        expect(JSON.parse(req.body()).refinements).to.eql([{ navigationName: 'id', type: 'Value', value: '14830' }]);
        done();
      });
      flux.details('14830');
    });

    it('should persist area, collection, language, fields', (done) => {
      flux.query.withConfiguration({
        area: 'nonProd',
        collection: 'offbrand',
        language: 'zh',
        fields: ['title', 'price']
      });
      mock.post(SEARCH_URL, (req, res) => {
        const body = JSON.parse(req.body());
        expect(body.area).to.eq('nonProd');
        expect(body.collection).to.eq('offbrand');
        expect(body.language).to.eq('zh');
        expect(body.fields).to.eql(['title', 'price']);
        done();
      });
      flux.details('14830');
    });

    it('should emit details event', (done) => {
      mock.post(SEARCH_URL, (req, res) => res.body(JSON.stringify(DETAILS_RESULT)));

      flux.on(Events.DETAILS, data => {
        expect(data).to.be.ok;
        done();
      });
      flux.details('14830');
    });
  });
});
