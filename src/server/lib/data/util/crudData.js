var ObjectID = require('mongodb').ObjectID;
var mongodb = require('./mongodb.js');
var logger = require('../../logger.js');


module.exports.crud = function (colname, sort, limit, oID) {
    logger.debug("crud para " + colname);
    return {
        _colName: colname,
        _sort: sort || {
            _id: -1
        },
        _limit: limit || 100,
        _oID: oID || true,
        finding: finding,
        inserting: inserting,
        updating: updating,
        removing: removing
    };
}

function finding(mongoQ) {
    return mongodb.finding(this._colName, forceId(mongoQ.query, this._oID), null, mongoQ.skip, mongoQ.limit || this._limit, mongoQ.sort || this._sort);
}

function inserting(document) {
    return mongodb.inserting(this._colName, document);
}

function updating(id, document) {
    return mongodb.updating(this._colName, forceId({ _id: id }, this._oID), forceId(document, this._oID), null);
}

function removing(id, document) {
    return mongodb.removing(this._colName, forceId({ _id: id }, this._oID), null);
}

function forceId(document, oID) {
    if (document._id && oID) {
        document._id = new ObjectID(document._id);
    }
    return document;
}