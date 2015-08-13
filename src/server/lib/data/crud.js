var mongodb = require('./mongodb.js');
var logger = require('../logger.js');


module.exports.crud = function (colname) {
    logger.debug("crud para " + colname);
    return {
        _colName : colname,
        finding: finding,
        inserting: inserting,
        updating: updating,
        removing: removing
    };
}

function finding(mongoQuery) {
    if (mongoQuery.search) return mongodb, findingBySearch(mongoQuery);
    return mongodb.finding(this._colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit, mongoQuery.sort);
}

function findingBySearch(mongoQuery) {
    return mongodb.finding(this._colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit, mongoQuery.sort);
}
function inserting(document) {
    return mongodb.inserting(this._colName, document);
}

function updating(id, document) {
    return mongodb.updating(this._colName, {_id:id}, document, null);
}

function removing(id) {
    return mongodb.removing(this._colName, {_id:id}, null);
}