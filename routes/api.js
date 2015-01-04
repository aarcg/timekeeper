var express = require('express');
var router = express.Router();
var items = require('../models/item');

/* GET home page. */
router.get('/:customer/items', function(req, res) {
	items.readCustomerItems(req.params.customer, function(err, dbRes){
		if (err) {
			//handle error
		} else {
			res.send(dbRes);
		}
	});
});

router.get('/:customer/item/:id', function(req, res) {
	var values = {
		customer: req.params.customer,
		id: req.params.id
	};

	items.readCustomerItem(values, function(err, dbRes) {
		if (err) {
			//handle error
		} else {
			res.send(dbRes);
		}
	});
});

module.exports = router;