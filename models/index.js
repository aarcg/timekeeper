var config = require('../config');
var db = require('../modules/mysql_models').connect(config);

var models = [
	"item"
];
models.forEach(function(model) {
	module.exports[model] = require(__dirname + '/' + model);
});