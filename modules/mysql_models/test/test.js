// process.env.TEST = '1';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var mysqlModels = require('../lib');

var config = require('../../../config');

describe('MysqlModels', function() {
	it('Should return an object with a connection on connect', function() {
		expect(mysqlModels.connect(config).connection).to.be.an('object');
	})
	// Should be able to connect
	// Should be able to return the connection
	// Should return models

});

describe('MysqlModels Model', function() {
	mysqlModels.connect(config);
	var schema = {id: 'string', description: 'test'};
	var table = 'items';

	var model = mysqlModels.model(schema, table);

	// Models should have a connection
	it('Should have a connection', function() {
		expect(model.connection).to.be.an('object');
	});

	// Models should have schema
	it('Should have a schema', function() {
		expect(model.schema).to.deep.equal(schema);
	});

	// Models should have table names
	it('Should have a table name', function() {
		expect(model.table).to.equal(table);
	});

	// Models should have primary keys
	it('Should have a primary key', function() {
		expect(model.primaryKey).to.equal('id');
	});

	// Models should have query functions
	// . select()
	it('Should have a select method', function(done) {
		model.select(['id', 'description'], function(err, result) {
			if(result) {
				done();
			} else {
				done(err);
			};
		});
	});
	it('Should be able to select using "OR"', function(done) {
		model.select(['id', 'description'], {identifiers: {id: '1', description: 'testing 1'}, method: 'or'}, function(err, result) {
			if(result) {
				done();
			} else {
				done(err);
			};
		});
	});
	it('Should be able to select using "AND"', function(done) {
		model.select(['id', 'description'], {identifiers: {id: '1', description: 'testing 1'}, method: 'and'}, function(err, result) {
			if(result) {
				done();
			} else {
				done(err);
			};
		});
	});
	// . insert()
	// . update()
	// . delete()
})

