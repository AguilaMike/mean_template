var mongodb = require('./mongodb.js');
var logger = require('../logger.js');
var colName = 'riders';
var Data = require('./data.js');
var data = new Data(colName);

exports.finding = function(mongoQuery){ 
    return data.finding(mongoQuery,{
        total_victories: -1,
        name: 1}
        ,{ $or: [{
                _id: mongoQuery.search
            }, {
                lob: mongoQuery.search
            }, {
                team: mongoQuery.search
            }, {
                safe_name: mongoQuery.search
            }, {
                team_rol: mongoQuery.search
                }
            ]}
        );
    };
exports.inserting = function(document){ return data.inserting(document);};
exports.updating = function(id,document){ return data.updating(id,document);};
exports.removing = function(id){ return data.removing(id);};
