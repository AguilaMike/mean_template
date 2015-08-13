var mongodb = require('./mongodb.js');
var logger = require('../logger.js');
var colName = 'teams';
var _crud = require('./crud.js').crud(colName);
exports.crud = _crud;

exports.finding = function (mongoQuery) {   
    if(!mongoQuery.sort){
        mongoQuery.sort = {
        name: 1}
    }
    if (mongoQuery.search) return mongodb, findingBySearch(mongoQuery);
    return _crud.finding( mongoQuery);
}

function findingBySearch(mongoQuery) {   
    mongoQuery.query = {
        $or: [
            {
                _id: mongoQuery.search
            },  
            {
                uci: mongoQuery.search
            }, 
            {
                safe_name: mongoQuery.search
            }, 
            {
                country: mongoQuery.search
            }]
    }
    return _crud.finding( mongoQuery.query);
}