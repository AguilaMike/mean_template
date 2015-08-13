var convert = require('../../convert.js');

module.exports = crudRouter;

function crudRouter(router, data) {
    router
        .get('/', function (req, res) { convert.prom2res(data.finding(convert.req2mongo(req)), res); })
        .get('/:id', function (req, res) { convert.prom2res(data.finding(convert.req2mongo(req)), res); })
        .post('/', function (req, res) { convert.prom2res(data.inserting(req.body), res); })
        .put('/:id', function (req, res) { convert.prom2res(data.updating(req.params.id, req.body), res); })
        .delete('/:id', function (req, res) { convert.prom2res(data.removing(req.params.id), res); });
    return router;
}