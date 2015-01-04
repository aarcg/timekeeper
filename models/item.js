var mysql = require('mysql');
var db = require('../modules/db');
var pool = db.getPool();


module.exports = {

	readCustomerItem: function readCustomerItem(values, callback) {
		var sql = 'SELECT * FROM items WHERE company=(SELECT id FROM companies WHERE name=' + mysql.escape(values.customer) + ') AND id=' + mysql.escape(values.id);

		var query = pool.query(sql, [values], function(err, rows) {
			if (err) {
				callback(err, null);
			} else {
				callback(null, rows);
			}
		});

	},

	readCustomerItems: function readCustomerItems(customer, callback) {
		var sql = 'SELECT * FROM items WHERE company=(SELECT id FROM companies WHERE name=?)';

		var query = pool.query(sql, [customer], function(err, rows) {
			if (err) {
				callback(err, null);
			} else {
				callback(null, rows);
			}
		});

	}

}