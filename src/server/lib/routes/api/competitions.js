var express = require('express');

var router = express.Router({
    mergeParams: true
});

router
    .get('/', function (req, res) { res.send("competitions"); })
    .get('/:id', function (req, res) { res.send("competition: " + req.params.id) })
    .post('/', function (req, res) { })
    .put('/:id', function (req, res) { })
    .delete('/:id', function (req, res) { });



module.exports = router;
