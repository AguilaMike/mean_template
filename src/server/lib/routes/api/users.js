var express = require('express');
var crud = require('./crud.js');
var users = require('../../data/users.js');

var router = express.Router({
    mergeParams: true
});

crud(router,users);
    
module.exports = router;