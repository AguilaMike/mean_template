var mongodb = require('./mongodb.js');
var logger = require('../logger.js');
var colName = 'teams';
var Crud = require('./crud.js');
var crud = new Crud(colName);

exports.finding = function(mongoQuery){ 
    return crud.finding(mongoQuery,{
        name: 1}
        ,{ $or: [
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
            }]}
        );
    };
exports.inserting = function(document){ return crud.inserting(document);};
exports.updating = function(id,document){ return crud.updating(id,document);};
exports.removing = function(id){ return crud.removing(id);};