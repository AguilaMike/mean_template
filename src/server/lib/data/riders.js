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
    mongoQuery.query = {
        $or: [
            {
                _id: mongoQuery.search
            }, 
            {
                lob: mongoQuery.search
            }, 
            {
                team: mongoQuery.search
            }, 
            {
                safe_name: mongoQuery.search
            }, 
            {
                team_rol: mongoQuery.search
            }
        ]
    }
    return mongodb.finding(colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit, mongoQuery.sort);
}

exports.removing = function (mongoQuery) {
    return mongodb.removing(colName, mongoQuery.query, null);
}
