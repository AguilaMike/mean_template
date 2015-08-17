var mongodb = require('./mongodb.js');
var logger = require('../logger.js');
var colName = 'users';
var Data = require('./data.js');
var data = new Data(colName);

exports.finding = function(mongoQuery){ return data.finding(mongoQuery,null, null);};
exports.inserting = function(document){ return data.inserting(document);};
exports.updating = function(id,document){ return data.updating(id,document);};
exports.removing = function(id){ return data.removing(id);};