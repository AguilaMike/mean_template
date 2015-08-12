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
    var rq = {
        $regex: ".*" + mongoQuery.search + ".*",
        $options: 'i'
    };
    mongoQuery.query = {
        $or: [
            {
                _id: rq
            },  
            {
                uci: rq
            }, 
            {
                safe_name: rq
            }, 
            {
                country: rq
            }]
    }
    return mongodb.finding(colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit, mongoQuery.sort);
}

exports.removing = function (mongoQuery) {
    return mongodb.removing(colName, mongoQuery.query, null);
}
