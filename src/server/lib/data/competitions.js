var mongodb = require('./mongodb.js');
var logger = require('../logger.js');

var colName = 'competitions';

exports.finding = function (mongoQuery) {
    if (!mongoQuery.sort) {
        mongoQuery.sort = { _id: 1 }
    }
    if (mongoQuery.search) return mongodb, findingBySearch(mongoQuery);
    return mongodb.finding(colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit, mongoQuery.sort);
}

function findingBySearch(mongoQuery) {
    mongoQuery.query = { $or: [{ _id: mongoQuery.search }] }
    return mongodb.finding(colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit, mongoQuery.sort);
}

exports.inserting = function (document) {
    return mongodb.inserting(colName, document);
}

exports.updating = function (id, document) {
    return mongodb.updating(colName, {_id:id}, document, null);
}

exports.removing = function (id) {
    return mongodb.removing(colName, {_id:id}, null);
}
