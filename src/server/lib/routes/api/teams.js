var express = require('express');

var router = express.Router({
    mergeParams: true
});

router
    .get('/', function (req, res) { res.send("teams"); })
    .get('/:id', function (req, res) { res.send("team: " + req.params.id) })
    .get('/safename/:safe_name', function (req, res) { res.send("team: " + req.params.safe_name) })
    .get('/:id/riders', function (req, res) { res.send("riders for team: " + req.params.id) })
    .post('/', function (req, res) { })
    .put('/:id', function (req, res) { })
    .delete('/:id', function (req, res) { });

module.exports = router;

