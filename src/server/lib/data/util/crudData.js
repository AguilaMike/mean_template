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
        finding:finding,
        inserting: inserting,
        updating: updating,
        removing: removing
    };
}

function finding(mongoQuery) {
    return mongodb.finding(this._colName, forceId(mongoQuery.query, this._oID), null, mongoQuery.skip, mongoQuery.limit || this._limit, mongoQuery.sort || this._sort);
}

function inserting(document) {
    return mongodb.inserting(this._colName, document);
}

function updating(id, document) {
    return mongodb.updating(this._colName, getId(id,this._oID), forceId(document,this._oID), null);
}

function removing(id, document) {
    return mongodb.removing(this._colName,  getId(id,this._oID), null);
}

function getId(id,oID) {
    if (oID) {
        return {
            _id: new ObjectID(id)
        }
    }
    else {
        return {
            _id: id
        }
    }
}

function forceId(document, oID) {
    if (document._id && oID) {
        document._id = new ObjectID(document._id);
    }
    return document;
}