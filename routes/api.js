var express = require('express');
var router = express.Router();

//testing mysqlTest
// var mysqltest = require('../modules/mysql_test');
// var connection = mysqltest.getConnection();
// connection.query('SELECT * FROM items', function(err, result) {
// 	console.dir(result);
// });


module.exports = function(app) {
	var itemModel = app.get('models').item; // refactor to remove this? causing some strange code in app.js
	var items = require('./api_modules/items')(itemModel);

	// Load api route modules
	//var items = require('./api_modules/items')(router);

	router.get('/:customerId/items', items.getAll);
	router.get('/:customerId/items/:id', items.getById);
	router.post('/:customerId/items', items.create);
	router.put('/:customerId/items/:id', items.update);
	router.delete('/:customerId/items/:id', items.del);

	return router;
}