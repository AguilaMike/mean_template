var logger = require('../../logger.js');
var express = require('express');
var crud = require('./util/crud.js');
var competitions = require('../../data/competitions.js');

var router = express.Router({
    mergeParams: true
});
logger.info("hola");
crud(router,competitions);
    
module.exports = router;