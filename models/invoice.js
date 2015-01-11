var db = require('../modules/db');
var pool = db.getPool();

module.exports = {

	readTotal: function getTotal(company) {
		var sql = 'SELECT SUM((TIME_TO_SEC(TIMEDIFF(end, start))/3600) * rate) AS invoiceTotalCost, SUM(TIME_TO_SEC(TIMEDIFF(end, start))/3600) AS invoiceTotalHours FROM items WHERE customer=(SELECT id FROM customers WHERE name=?)';
		pool.query(sql, [company], function(err, rows) {
			console.dir(rows);
		});
	},

	readItems: function getItems(company) {
		var sql = 'SELECT description, rate, TIME_TO_SEC(TIMEDIFF(end, start))/3600 AS itemTotalHours, TIME_TO_SEC(TIMEDIFF(end, start))/3600 * rate AS itemTotalCost FROM items WHERE customer=(SELECT id FROM customers WHERE name=?)';
		pool.query(sql, [company], function(err, rows) {
			console.dir(rows);
		});
	}

}
