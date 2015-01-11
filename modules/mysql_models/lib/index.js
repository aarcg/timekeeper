var mysql = require('mysql');
var connection = require('./connection');
var util = require('./util');

function MysqlModels() {

};

//add connection methods
MysqlModels.prototype.createConnection = connection.createConnection;
MysqlModels.prototype.createPool = connection.createPool;
MysqlModels.prototype.getConnection = connection.getConnection;
MysqlModels.prototype.getPool = connection.getPool;

//add util methods
MysqlModels.prototype.datetime = util.datetime;

var mysqlModels = module.exports = new MysqlModels;