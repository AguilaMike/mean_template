var colName = 'riders';
<<<<<<< HEAD
var _crud = require('./util/crud.js')
    .crud(colName,
        { total_victories: -1,
        name: 1 });

exports.crud = _crud;

=======
var Crud = require('./crud.js');
var crud = new Crud(colName);

exports.finding = function(mongoQuery){ 
    return crud.finding(mongoQuery,{
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
exports.inserting = function(document){ return crud.inserting(document);};
exports.updating = function(id,document){ return crud.updating(id,document);};
exports.removing = function(id){ return crud.removing(id);};
>>>>>>> 227f60fd8b5f30e1a7b0806924ec94c5a6cbb47f
