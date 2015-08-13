var express = require('express');
var crud = require('./crud.js');
var riders = require('../../data/riders.js');

var router = express.Router({
    mergeParams: true
});

crud(router,riders);

module.exports = router;


