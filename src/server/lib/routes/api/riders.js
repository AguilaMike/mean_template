var express = require('express');
var logger = require('../../logger.js');
var convert = require('../../convert.js');
var data = require('../../data/riders.js');

var router = express.Router({
    mergeParams: true
});

router
    .get('/', function (req, res) { convert.prom2res(data.finding(convert.req2mongo(req)), res); })
    .get('/:id', function (req, res) { convert.prom2res(data.finding(convert.req2mongo(req)), res); })
    .post('/', function (req, res) { convert.prom2res(data.inserting(req.body), res); })
    .put('/:id', function (req, res) { convert.prom2res(data.updating(req.params.id,req.body), res);})
    .delete('/:id', function (req, res) { convert.prom2res(data.removing(req.params.id), res);});
    
module.exports = router;
