var express = require('express');
var crud = require('./util/crud.js');
var riders = require('../../data/riders.js');

var router = express.Router({
    mergeParams: true
});

crud(router,riders);

module.exports = router;


