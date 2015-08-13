var mongodb = require('./mongodb.js');
var logger = require('../logger.js');
var colName = 'teams';
var Data = require('./data.js');
var data = new Data(colName);

exports.finding = function (mongoQuery) {   
    if(!mongoQuery.sort){
        mongoQuery.sort = {
        name: 1}
    }
if (mongoQuery.search) return findingBySearch(mongoQuery);
    return data.finding(mongoQuery);
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
    return data.finding(mongoQuery.query);
}

exports.inserting = function(document){ return data.inserting(document);};
exports.updating = function(id,document){ return data.updating(id,document);};
exports.removing = function(id){ return data.removing(id);};