var express = require('express');
var crud = require('./util/crud.js');
var roles = require('../../data/roles.js');

var router = express.Router({
    mergeParams: true
});

crud(router,roles);
    
module.exports = router;