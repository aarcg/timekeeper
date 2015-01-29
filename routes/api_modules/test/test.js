var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var util = require('util');

var resProto = require('./res_mock');
var datastoreStub = require('./datastore_stub');

var items = require('../items')(datastoreStub);


describe('items', function() {

  it('Should have a getAll function', function() {
    expect(items.getAll).to.be.a('function');
  });
  it('Should have a getById function', function() {
    expect(items.getById).to.be.a('function');
  });
  it('Should have a create function', function() {
    expect(items.create).to.be.a('function');
  });
  it('Should have an update function', function() {
    expect(items.update).to.be.a('function');
  });
  it('Should have a delete function', function() {
    expect(items.del).to.be.a('function');
  });
  it('Should return all items when getAll() is called', function() {
    var res = util._extend({}, resProto);
    items.getAll({params: {customerId: '1'}}, res);
    expect(res.rendered).to.deep.equal({
      items: [{
        id: '1',
        description: 'test'
      }],
      layout: false,
      site: 'http://localhost:3000/api/1/items'
    });
  });

});