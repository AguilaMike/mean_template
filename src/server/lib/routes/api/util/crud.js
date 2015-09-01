var logger = require('../../../logger.js');
var convert = require('../../../convert.js');

module.exports = crudRouter;

function crudRouter(router, data) {
    logger.info(JSON.stringify(data));
    var crud = data.crud;
    router
        .get('/', function (req, res) { convert.prom2res(crud.finding(convert.req2mongo(req)), res); })
        .get('/:id', function (req, res) { convert.prom2res(crud.finding(convert.req2mongo(req)), res); })
        .post('/', function (req, res) { convert.prom2res(crud.inserting(req.body), res); })
        .put('/:id', function (req, res) { convert.prom2res(crud.updating(req.params.id, req.body), res); })
        .delete('/:id', function (req, res) { convert.prom2res(crud.removing(req.params.id), res); });
    return router;
}