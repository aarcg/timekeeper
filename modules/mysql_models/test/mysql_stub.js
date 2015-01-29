function Connection() {};

var data = [];


Connection.prototype.query = function (sql, callback) {
	console.log(sql);
	callback(null, []);
};

module.exports = {
	createPool: function createPool(options) {
		return new Connection;
	}
};