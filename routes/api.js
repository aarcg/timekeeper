var express = require('express');
var router = express.Router();

// Load api route modules
var items = require('./api_modules/items')(router);

module.exports = router;