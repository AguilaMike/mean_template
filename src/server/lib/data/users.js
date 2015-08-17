var mongodb = require('./mongodb.js');
var logger = require('../logger.js');
var colName = 'users';
var Crud = require('./crud.js');
var crud = new Crud(colName);

exports.finding = function(mongoQuery){ return crud.finding(mongoQuery,null, null);};
exports.inserting = function(document){ return crud.inserting(document);};
exports.updating = function(id,document){ return crud.updating(id,document);};
exports.removing = function(id){ return crud.removing(id);};