var convert = require('../../convert.js');
var ZSchema = require("z-schema");
var validator = new ZSchema({});

module.exports = crudRouter;

function crudRouter(router, data, schema) {
    router
        .get('/', function (req, res) { convert.prom2res(data.finding(convert.req2mongo(req)), res, 200); })
        .get('/:id', function (req, res) { convert.prom2res(data.finding(convert.req2mongo(req)), res, 200); })
        .post('/', function (req, res) {
            if (!schema || validator.validate(req.body, schema)) {
                convert.prom2res(data.inserting(req.body), res, 201);
            }
            else {
                var error = validator.getLastError();
                res.status(400).send(error);
            }
        })
        .put('/:id', function (req, res) { convert.prom2res(data.updating(req.params.id, req.body), res, 200); })
        .delete('/:id', function (req, res) { convert.prom2res(data.removing(req.params.id), res, 204); });
    return router;
}