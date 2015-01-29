var db = require('../modules/mysql_models');
var myModel = db.model({
	primaryKey: 'id',
	table: 'items',
	schema: {
		id: 'number',
		created: 'datetime',
		modified: 'datetime',
		start: 'datetime',
		end: 'datetime',
		rate: 'number',
		description: 'text',
		customer: 'number',
		invoice: 'number'
	}
});
var myModel2 = db.model({
	primaryKey: 'id',
	table: 'invoices',
	schema: {
		id: 'number',
		created: 'datetime',
		modified: 'datetime',
		start: 'datetime',
		end: 'datetime',
		rate: 'number',
		description: 'text',
		customer: 'number',
		invoice: 'number'
	}
});
var pool = db.getConnection();
var primaryKey = 'id';
var table = 'items';
var schema = {
	id: 'number',
	created: 'datetime',
	modified: 'datetime',
	start: 'datetime',
	end: 'datetime',
	rate: 'number',
	description: 'text',
	customer: 'number',
	invoice: 'number'
};

function checkValues(values, schema) {
	var whitelistedValues = {};
	//first, check values object agains schema
	for (var key in schema) {
		if (values.hasOwnProperty(key)) {
			whitelistedValues[key] = values[key];
		};
	};
	return whitelistedValues;
}

module.exports = {

	insert: function insert(values, callback) {
		var whitelistedValues = checkValues(values, schema);
		var result;
		var sql = 'INSERT INTO ' + table + ' SET ?';
		var query = pool.query(sql, whitelistedValues, function(err, result) {
			/*successful result object*/
			/*
			{ fieldCount: 0,
			  affectedRows: 1,
			  insertId: 12,
			  serverStatus: 2,
			  warningCount: 0,
			  message: '',
			  protocol41: true,
			  changedRows: 0 }
			  */

			callback(err, result);
		});
	},

	update: function update(values, identifiers, callback) {
		var whitelistedValues = checkValues(values, schema);
		var result;
		var sql = 'UPDATE ' + table + ' SET ? WHERE id=' + db.mysql.escape(identifiers.id) + ' AND modified=' + db.mysql.escape(identifiers.modified);

		var query = pool.query(sql, whitelistedValues, function(err, result) {
			callback(err, result);
		});

	},

	del: function del(id, callback) {
		var sql = 'DELETE FROM ' + table + ' WHERE id=?';

		var query = pool.query(sql, id, function(err, result) {
			callback(err, result);
		})
	},

	select: function select(id, callback) {
		var result = [];
		var sql = 'SELECT * FROM ' + table + ' WHERE id=' + db.mysql.escape(id);

		query = pool.query(sql);
		query
			.on('error', function(err) {
				callback(err, null);
			})
			.on('result', function(row) {
				result.push(row);
			})
			.on('end', function() {
				callback(null, result);
			});

	},

	selectCustomerItem: function selectCustomerItem(values, callback) {
		var result = [];
		var sql = 'SELECT * FROM ' + table + ' WHERE customer=' + db.mysql.escape(values.customerId) + ' AND id=' + db.mysql.escape(values.id);

		query = pool.query(sql);
		query
			.on('error', function(err) {
				callback(err, null);
			})
			.on('result', function(row) {
				result.push(row);
			})
			.on('end', function() {
				callback(null, result);
			});

	},

	selectCustomerItems: function selectCustomerItems(customer, callback) {
		var result = [];
		var sql = 'SELECT * FROM ' + table + ' WHERE customer=' + db.mysql.escape(customer);

		query = pool.query(sql);
		query
			.on('error', function(err) {
				callback(err, null);
			})
			.on('result', function(row) {
				result.push(row);
			})
			.on('end', function() {
				callback(null, result);
			});

	}

}