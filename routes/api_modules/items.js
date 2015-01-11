var items = require('../../models/item');
var db = require('../../modules/mysql_models');

module.exports = function(router) {

	/* GET items for a given customer*/
	router.get('/:customerId/items', function(req, res) {
		items.selectCustomerItems(req.params.customerId, function(err, result) {
			if (err) {
				res.status(500)
					.set('Content-Type', 'application/vnd.siren+json')
					.render('siren_json_generic', {
						layout: false,
						entityClass: "error",
						site: 'http://localhost:3000/api/' + req.params.customerId + '/items',
						properties: JSON.stringify({error: err})
					});
			} else {
				if(result.length > 0) {
					res.set('Content-Type', 'application/vnd.siren+json');
					res.render('siren_json_items', {
						layout: false,
						site: 'http://localhost:3000/api/' + req.params.customerId + '/items',
						items: result
					});
				} else {
					res.status(404)
						.set('Content-Type', 'application/vnd.siren+json')
						.render('siren_json_generic', {
							layout: false,
							entityClass: "error",
							site: 'http://localhost:3000/api/' + req.params.customerId + '/items',
							properties: JSON.stringify({error: 'Not Found'})
						});
				};
			};
		});
	});

	/* GET a specific item */
	router.get('/:customerId/items/:id', function(req, res) {
		var values = {
			customerId: req.params.customerId,
			id: req.params.id
		};

		items.selectCustomerItem(values, function(err, result) {
			if (err) {
				res.status(500)
					.set('Content-Type', 'application/vnd.siren+json')
					.render('siren_json_generic', {
						layout: false,
						entityClass: "error",
						site: 'http://localhost:3000/api/' + req.params.customerId + '/items',
						properties: JSON.stringify({error: err})
					});
			} else {
				
				if(result.length > 0) {
					res.set('Content-Type', 'application/vnd.siren+json');
					res.render('siren_json_item', {
						layout: false,
						site: 'http://localhost:3000/api/' + req.params.customerId + '/items/' + req.params.id,
						items: result
					});
				} else {
					res.status(404).end('Not Found');
				};
			};
		});
	});

	/* POST a new item for a specific customer */
	router.post('/:customerId/items', function(req, res) {
		var now = new Date();
		var values = req.body;
		values.customer = req.params.customerId;
		values.created = db.datetime(now);
		if (!values.start) {
			values.start = db.datetime(now);
		}

		items.insert(values, function(err, result) {
			if (err) {
				res.status(500)
					.set('Content-Type', 'application/vnd.siren+json')
					.render('siren_json_generic', {
						layout: false,
						entityClass: "error",
						site: 'http://localhost:3000/api/' + req.params.customerId + '/items',
						properties: JSON.stringify({error: err})
					});
			} else {
				if (result.affectedRows === 1) {
					res.status(201)
						.set('Content-Type', 'application/vnd.siren+json')
						.set('Location', 'http://localhost:3000/api/' + req.params.customerId + '/items/' + result.insertId)
						.send('Created');
				}
			}
		});
	});

	router.put('/:customerId/items/:id', function(req, res) {
		// get a new date for modified
		// use body modified value for versioning
		var identifiers = {};
		var now = new Date();
		var values = req.body;
		if (!req.body.version) {
			res.send('versioning required. use modified time');
			//send an error about versioning being required
		} else {
			var modified = new Date(req.body.version);
			values.customer = req.params.customerId;
			identifiers.id = req.params.id;
			identifiers.modified = db.datetime(modified);

			items.update(values, identifiers, function(err, result) {
				console.log(err);
				res.send(result);
			})
		}

	});

	router.delete('/:customerId/items/:id', function(req, res) {
		items.del(req.params.id, function(err, result) {
			res.send(result);
		});
	});
};