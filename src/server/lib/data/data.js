var mongodb = require('./mongodb.js');
var logger = require('../logger.js');

module.exports = Data;

function Data(colName) {
    this.colName = colName;
    logger.debug("crud para " + this.colName);
}

Data.prototype.finding = function finding(mongoQuery) {
    if (mongoQuery.search) return findingBySearch(mongoQuery);
    return mongodb.finding(this.colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit, mongoQuery.sort);
};
Data.prototype.inserting = function inserting(document) {
    logger.debug("inserting  " + this.colName);
    return mongodb.inserting(this.colName, document);
};
Data.prototype.updating = function updating(id, document) {
    return mongodb.updating(this.colName, { _id: id }, document, null);
};
Data.prototype.removing = function removing(id) {
    return mongodb.removing(this.colName, { _id: id }, null);
};



function findingBySearch(mongoQuery) {
    return mongodb.finding(this.colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit, mongoQuery.sort);
}




