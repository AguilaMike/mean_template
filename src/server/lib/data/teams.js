var mongodb = require('./mongodb.js');
var logger = require('../logger.js');

var colName = 'teams';

exports.finding = function (mongoQuery) {   
    if(!mongoQuery.sort){
        mongoQuery.sort = {
        name: 1}
    }
    if(mongoQuery.search) return findingBySearch(mongoQuery);
    return mongodb.finding(colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit, mongoQuery.sort);
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
    return mongodb.finding(colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit, mongoQuery.sort);
}

exports.removing = function (mongoQuery) {
    return mongodb.removing(colName, mongoQuery.query, null);
}
