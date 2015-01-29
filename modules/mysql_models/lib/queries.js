/*
** Require dependancies
*/

var mysql = require('mysql');

/*
** Currently requires a mysql connection on 'this'.
** On refactor build to have a local connection
*/


/* 
** joinIdentifiers - join sql statement WHERE identifers
**
** api private
** obj {Object} - key value pairs to be joined
** method {String} - method used to join (possible values are AND, OR)
*/

function joinValues (obj, method) {
	var validMethods = ['AND', 'OR'];
	var identifiersString = '';
	var identifiers = [];

	if (typeof method !== 'string' || validMethods.indexOf(method.toUpperCase()) === -1) {
		throw new Error('invalid join method used');
	};

	for (key in obj) {
		identifiers.push(key + '=' + mysql.escape(obj[key]));
	}

	identifiersString = identifiers.join(' ' + method.toUpperCase() + ' ');

	return identifiersString;
}


/* 
** Queries - Exported class
*/

function Queries() {};

/*
** select - select sql satement
**
** api public
** values {Array}, options {Object} (optional), callback {Function}
*/

Queries.prototype.select = function select (values, options, callback) {

	var valuesString = '';
	var optionsString = '';
	var identifiers = '';
	var method = '';

	// Do some checking on passed arguments
	
	// values needs to exist, and be an array, or throw an error
	if (!Array.isArray(values)) {
		throw new Error('A values array is required.');
	};

	// second value should be either an object of a callback
	if (typeof options === 'function') {
		callback = options;
	} else if (typeof options === 'object') {
		if(options.identifiers && options.method) {
			identifiers = joinValues(options.identifiers, options.method);
		};
	};

	// one last check on the last argument passed - should be a callback
	if (typeof arguments[arguments.length - 1] !== 'function') {
		throw new Error('The last value passed must be a function');
	};

	// build the SELECT 'values' string
	for (i = 0; i < values.length; ++i) {
		valuesString += values[i];
		if(i < values.length - 1) {
			valuesString += ',';
		};
	};

	// build the sql string and query the database
	var sql = 'SELECT ' + valuesString + ' FROM ' + this.table;
	if (identifiers) {
		sql += ' WHERE ' + identifiers;
	};

	this.connection.query(sql, callback);
	
};

// Select 'AND'
Queries.prototype.selectAnd = function selectAnd () {
	this.connection.query();
};

// Select 'OR'
Queries.prototype.selectOR = function selectOr () {
	this.connection.query();
};

// Insert
Queries.prototype.insert = function insert () {
	this.connection.query();
};

// Update
Queries.prototype.update = function update (values, options, callback) {
	var sql = 'UPDATE ' + this.table;
	sql += ' SET ' + values.toString();
	sql += ' WHERE ' + mysql.escape(options.id);
	sql += ' AND modified=' + mysql.escape(options.modified);
	console.dir(this);
	this.connection.query(sql);
};

// Delete
Queries.prototype.del = function del () {
	this.connection.query();
};

module.exports = new Queries;