var express = require('express');
var crud = require('./util/crud.js');
var users = require('../../data/users.js');

var router = express.Router({
    mergeParams: true
});

crud(router,users);
    
module.exports = router;