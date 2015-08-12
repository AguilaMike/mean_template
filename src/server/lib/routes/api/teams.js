/* global . */
var express = require('express');
var logger = require('../../logger.js');
var convert = require('../../convert.js');
var teams = require('../../data/teams.js');
var riders = require('../../data/riders.js');

var router = express.Router({
    mergeParams: true
});

router
    .get('/', function (req, res) { convert.prom2res(teams.finding(convert.req2mongo(req)), res); })
    .get('/:id', function (req, res) { convert.prom2res(teams.finding(convert.req2mongo(req)), res); })
    .get('/:id/riders', function (req, res) {
        convert.prom2res(riders.finding({query:{"team":req.params.id}}), res);
    })
    .post('/', function (req, res) { })
    .put('/:id', function (req, res) { })
    .delete('/:id', function (req, res) { });

module.exports = router;

