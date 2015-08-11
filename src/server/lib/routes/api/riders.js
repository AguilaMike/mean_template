var express = require('express');
var riders = require('../../data/riders.js');
var logger = require('../../logger.js');

var router = express.Router({
    mergeParams: true
});

router
    .get('/', function (req, res) { prom2res(riders.find(req2mongo(req)), res); })
    .get('/:id', function (req, res) { prom2res(riders.find(req2mongo(req)), res); })
//.get('/safename/:safe_name', function (req, res) { prom2res(riders.find({ safe_name: req.params.safe_name }), res); })
//http://localhost:3030/api/riders?query=safe_name:alberto-contador
//http://localhost:3030/api/riders?query=team:Tinkoff Saxo&query=country:es
    .post('/', function (req, res) { })
    .put('/:id', function (req, res) { })
    .delete('/:id', function (req, res) { });

function prom2res(prom, res) {
    prom
        .then(function response(result) {
            if (result) {
                logger.debug("result: ", result);
                res.json(result);
            } else {
                logger.warn("no result found ");
                res.status(404).json({});
            }
        })
        .fail(function error(err) {
            logger.error(err);
            res.status(500).send(err);
        });
}

function req2mongo(req) {
    var mongoQuery = {}

    
    // coll/:id
    if (req.params.id) {
        mongoQuery.query = {};
        mongoQuery.query._id = req.params.id;
    }
               
    // coll/?skip=0&limit=1000
    mongoQuery.skip = parseInt(req.query.skip) || 0;
    mongoQuery.limit = parseInt(req.query.limit) || 10; 
    
    // coll/?sort=field:-field2:field3
    // sort = { field: 1, field2: -1, field3: 1 }
    if (req.query.sort) {
        mongoQuery.sort = {};
        var sortFields = req.query.sort.split(":");
        sortFields.forEach(function (sortField) {
            mongoQuery.sort[sortField] = sortField.substring("-") ? -1 : 1
        })
    }
    

    // coll/?query=field+value
    //query = { field: new RegExp(req.query.field) };
    if (req.query.query) {
        logger.debug("req.query.query: " + JSON.stringify(req.query.query));
        mongoQuery.query = {};
        if (req.query.query instanceof Array) {
            req.query.query.forEach(function (queryField) {
                var queryFields = queryField.split(":");
                mongoQuery.query[queryFields[0]] = queryFields[1];
            })
        }
        else {
            var queryFields = req.query.query.split(":");
            mongoQuery.query[queryFields[0]] = queryFields[1];
        }
    }
    //mongoQuery: {"skip":0,"limit":10,"query":{"safe_name Alberto":{}}}
        
    // coll/?q=field+value&q=field2+value2
    //q = { field: new RegExp(req.query.field), field2: new RegExp(req.query.field2) };

    return mongoQuery;
}
module.exports = router;
