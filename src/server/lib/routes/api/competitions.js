var express = require('express');
var crud = require('./crud.js');
var competitions = require('../../data/competitions.js');

var router = express.Router({
    mergeParams: true
});

crud(router,competitions);
    
module.exports = router;