var mongodb = require('./mongodb.js');
var logger = require('../logger.js');
var colName = 'competitions';
var Data = require('./data.js');
var data = new Data(colName);

exports.finding = function (mongoQuery) {
    if (!mongoQuery.sort) {
        mongoQuery.sort = { _id: 1 }
    }
    if (mongoQuery.search) return findingBySearch(mongoQuery);
    return data.finding(mongoQuery);
}

function findingBySearch(mongoQuery) {
    mongoQuery.query = { $or: [{ _id: mongoQuery.search }] }
    return data.finding(mongoQuery.query);
}

exports.inserting = function(document){ return data.inserting(document);};
exports.updating = function(id,document){ return data.updating(id,document);};
exports.removing = function(id){ return data.removing(id);};