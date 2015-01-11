var mysql = require('mysql');

module.exports = {

	createConnection: function createConnection(options) {
		global.mysqlConnection = mysql.createConnection({
		  host: options.db_host || 'localhost',
		  database: options.db || 'database',
		  user: options.db_user || 'user',
		  password: options.db_password || 'password'
		});
	},

	createPool: function createPool(options) {
		global.mysqlPool = mysql.createPool({
		  connectionLimit: options.db_connectionLimit || 5,
		  host: options.db_host || 'localhost',
		  database: options.db || 'database',
		  user: options.db_user || 'user',
		  password: options.db_password || 'password'
		});
	},

	getConnection: function getConnection() {
		return global.mysqlConnection;
	},

	getPool: function getPool() {
		return global.mysqlPool;
	}
}