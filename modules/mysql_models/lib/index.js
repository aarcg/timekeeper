/* Build a factory/singleton that keeps intrinsic data
 . Connection
 . Attached functions
 Buld a manager for the extrinsic data
 . schema
 . table name
 . primary key
 */

/*
Set up the cached module to have an active connection
Models should be built off of a flyweight
Flyweight should have query and validate methods
*/

/* Require dependancies */
if (process.env.TEST === '1') {
	var mysql = require('../test/mysql_stub.js')
} else {
	var mysql = require('mysql');
}

var nodeUtil = require('util');

/* Require local libraries to inherit from */
var util = require('./util');
var Model = require('./Model');

var MysqlModels = function(){

	this.connection = {};
	this.models = [];

};

// set up a connection
// consider makeing this a smart process. i.e. if a connectionLimit is supplied, create a pool
// otherwise, create a standard connection.
MysqlModels.prototype.connect = function connect (options) {

	this.connection = mysql.createPool({
		connectionLimit: options.db_connectionLimit || 5,
		host: options.db_host || 'localhost',
		database: options.db || 'database',
		user: options.db_user || 'user',
		password: options.db_password || 'password'
	});

	return this;
};

MysqlModels.prototype.getConnection = function getConnection() {
	return this.connection;
};

// add utilities
MysqlModels.prototype.datetime = util.datetime;


// Model factory
// schema(Object), table(String), options(Object)
MysqlModels.prototype.model = function() {
	var model = new Model;
	var args = [].slice.call(arguments, 0);
	var options = {};

	model.schema = args[0];
	model.table = args[1];

	if(args[3] && typeof args[3] === 'object') {
		options = args[3];
	};

	if (options.hasOwnProperty('primaryKey')) {
		model.primaryKey = options.primaryKey;
	} else {
		model.primaryKey = 'id';
	};

	model.connection = this.connection;
	return model;
};

function logthis() {
	console.dir(this);
};

// Queries should take a where object, a values object and a callback.
// Where and values = {"identifier": "value"}
// callback = function(err, result);
MysqlModels.prototype.select = function(where, values, callback) {
	logthis.call(this);
	queries.select.call(this, where, values, callback);
}

// add all mysql functions under 'mysql' namespace
MysqlModels.prototype.mysql = mysql;

MysqlModels.prototype.MysqlModels = MysqlModels;

module.exports = new MysqlModels;