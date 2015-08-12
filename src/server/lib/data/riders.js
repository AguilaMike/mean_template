var mongodb = require('./mongodb.js');
var logger = require('../logger.js');

var colName = 'riders';

exports.finding = function (mongoQuery) {   
    if(!mongoQuery.sort){
        mongoQuery.sort = {
        total_victories: -1,
        name: 1}
    }
    if(mongoQuery.search) return mongodb,findingBySearch(mongoQuery);
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
                lob: rq
            }, 
            {
                team: rq
            }, 
            {
                safe_name: rq
            }, 
            {
                team_rol: rq
            }
        ]
    }
    return mongodb.finding(colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit, mongoQuery.sort);
}

exports.removing = function (mongoQuery) {
    return mongodb.removing(colName, mongoQuery.query, null);
}
