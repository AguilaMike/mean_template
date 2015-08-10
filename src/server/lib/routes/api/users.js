var express = require('express');

var router = express.Router({
    mergeParams: true
});

router
    .get('/', function (req, res) { res.send("users"); })
    .get('/:id', function (req, res) { res.send("user: " + req.params.id) })
    .post('/', function (req, res) { })
    .put('/:id', function (req, res) { })
    .delete('/:id', function (req, res) { });



module.exports = router;