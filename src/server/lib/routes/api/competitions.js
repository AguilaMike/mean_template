var logger = require('../../logger.js');
var express = require('express');
var crud = require('./util/crud.js');
var competitions = require('../../data/competitions.js');

var router = express.Router({
    mergeParams: true
});
<<<<<<< HEAD
logger.info("hola");
crud(router,competitions);
=======

var schema = {
        id: "competitionDetails",
        type: "object",
        properties: {
            _id: { type: "string" },
            category: { type: "string" }
        },
        required: ["_id", "category"]
    }
>>>>>>> 227f60fd8b5f30e1a7b0806924ec94c5a6cbb47f
    
crud(router,competitions, schema);




module.exports = router;