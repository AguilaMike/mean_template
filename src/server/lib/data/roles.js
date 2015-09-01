var colName = 'roles';
<<<<<<< HEAD
var _crud = require('./util/crud.js')
    .crud(colName,
        { _id: 1 });

exports.crud = _crud;


=======
var Crud = require('./crud.js');
var crud = new Crud(colName);

exports.finding = function(mongoQuery){ return crud.finding(mongoQuery,null,null)};
exports.inserting = function(document){ return crud.inserting(document);};
exports.updating = function(id,document){ return crud.updating(id,document);};
exports.removing = function(id){ return crud.removing(id);};
>>>>>>> 227f60fd8b5f30e1a7b0806924ec94c5a6cbb47f
