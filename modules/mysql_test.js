var mysql = require('mysql');

var MysqlTest = function(){
	var connection;
};

MysqlTest.prototype.connect = function connect (options) {

	this.connection = mysql.createPool({
		connectionLimit: options.db_connectionLimit || 5,
		host: options.db_host || 'localhost',
		database: options.db || 'database',
		user: options.db_user || 'user',
		password: options.db_password || 'password'
	});
};

MysqlTest.prototype.getConnection = function getConnection() {
	return this.connection;
};

module.exports = new MysqlTest;