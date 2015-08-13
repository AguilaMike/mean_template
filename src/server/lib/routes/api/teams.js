var express = require('express');
var crud = require('./crud.js');
var teams = require('../../data/teams.js');
var riders = require('../../data/riders.js');
var convert = require('../../convert.js');

var router = express.Router({
    mergeParams: true
});

crud(router,teams);

router
    .get('/:id/riders', function (req, res) {
        convert.prom2res(riders.finding({query:{"team":req.params.id}}), res);
    });

module.exports = router;

