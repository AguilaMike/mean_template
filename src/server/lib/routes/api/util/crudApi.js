var logger = require('../../../logger.js');
var convert = require('../../../convert.js');
var ZSchema = require("z-schema");
var validator = new ZSchema({});

module.exports = crudRouter;

function crudRouter(router, data, schema) {
    var crud = data.crud;
    router
        .get('/', function (req, res) { convert.prom2res(crud.finding(convert.req2mongo(req)), res, 200); })
        .get('/:id', function (req, res) { 
            var mongoQuery = convert.req2mongo(req);
            var mongoPromise = crud.finding(mongoQuery);
            convert.prom2res(mongoPromise, res, 200); })
        .post('/', function (req, res) {
            if (!schema || validator.validate(req.body, schema)) {
                convert.prom2res(crud.inserting(req.body), res, 201);
            }
            else {
                var error = validator.getLastError();
                res.status(400).send(error);
            }
        })
        .put('/:id', function (req, res) {
            if (!schema || validator.validate(req.body, schema)) {
                convert.prom2res(crud.updating(req.params.id, req.body), res, 200);
            }
            else {
                var error = validator.getLastError();
                res.status(400).send(error);
            }
        })
        .delete('/:id', function (req, res) { convert.prom2res(crud.removing(req.params.id), res, 204); });
    return router;
}