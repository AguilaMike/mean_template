var express = require('express');
var riders = require('../../data/riders.js');
var logger = require('../../logger.js');

var router = express.Router({
    mergeParams: true
});

router
    .get('/', function (req, res) { prom2res(riders.find(req.query),res); })
    .get('/:id', function (req, res) { prom2res(riders.find(req.query),res); })
    .get('/safename/:safe_name', function (req, res) { prom2res(riders.find({safe_name: req.params.safe_name}),res); })
    .post('/', function (req, res) { })
    .put('/:id', function (req, res) { })
    .delete('/:id', function (req, res) { });

function prom2res(prom, res) {
    prom
        .then(function response(result) {
            if (result) {
                logger.debug("result: ", result);
                res.json(result);
            }else{
               logger.warn("no result found ");
                res.status(404).json({}); 
            }
        })
        .fail(function error(err) {
            logger.error(err);
            res.status(500).send(err);
        });
}
module.exports = router;
