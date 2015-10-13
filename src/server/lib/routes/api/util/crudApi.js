var logger = require('../../../logger.js');
var convert = require('../../../convert.js');
var ZSchema = require("z-schema");
var validator = new ZSchema({});

module.exports = crudRouter;

/** a geeneric router for CRUD operations */
function crudRouter(router, data, schema) {
    var crud = data.crud;
    router
        .get('/', function (req, res) {
            getCrud(req, res, crud);
        })
        .get('/:id', function (req, res) {
            getCrud(req, res, crud);
        })
        .post('/', function (req, res) {
            postCrud(req, res, crud, schema);
        })
        .put('/:id', function (req, res) {
            putCrud(req, res, crud, schema);
        })
        .delete('/:id', function (req, res) { 
            deleteCrud(req, res, crud);
        });
    return router;
}

function getCrud(req, res, crud) {
    var mongoQuery = convert.req2mongo(req);
    var promise = crud.finding(mongoQuery);
    convert.prom2res(promise, res, 200);
}

function postCrud(req, res, crud, schema) {
    if (!schema || validator.validate(req.body, schema)) {
        var promise = crud.inserting(req.body);
        convert.prom2res(promise, res, 201);
    }
    else {
        resError(validator,res);
    }
}

function putCrud(req, res, crud, schema) {
    if (!schema || validator.validate(req.body, schema)) {
        var promise = crud.updating(req.params.id, req.body);
        convert.prom2res(promise, res, 200);
    }
    else {
        resError(validator,res);
    }
}

function deleteCrud(req, res, crud) {
    var promise = crud.removing(req.params.id);
    convert.prom2res(promise, res, 204);
}


/** utility to send an error when validation fails */
function resError(validator , res) {
    var error = validator.getLastError();
    res.status(400).send(error);
}