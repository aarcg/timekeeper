var queries = require('./queries');

function Model () {};

Model.prototype = queries;

Model.prototype.setConnection = function setConnection(connection) {

}

exports = module.exports = Model;