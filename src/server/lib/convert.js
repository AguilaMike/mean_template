var logger = require('./logger.js');

module.exports={
	/** promise to response */
	prom2res : promise2response,
	/** request to mongo query */
	req2mongo : request2mongoq,
    /** takes callback parameters and returns a promise response */
    cllbck2prom: callback2Promise
}
function promise2response(prom, res) {
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

function request2mongoq(req) {
    var mongoQuery = {}
    // coll/:id
    if (req.params.id) {
        mongoQuery.query = {};
        mongoQuery.query._id = req.params.id;
    }
    // coll/?search=contador
    mongoQuery.search = req.query.search;                
    // coll/?skip=1&limit=1000
    mongoQuery.skip = parseInt(req.query.skip) || 0;
    mongoQuery.limit = parseInt(req.query.limit) || 10;

    // coll/?sort=field:-field2:field3
    if (req.query.sort) {
        mongoQuery.sort = {};
        var sortFields = req.query.sort.split(":");
        sortFields.forEach(function (sortField) {
            mongoQuery.sort[sortField] = sortField.substring("-") ? -1 : 1
        })
    }
    // coll/?q=field+value
    if (req.query.q) {
        mongoQuery.query = {};
        if (req.query.q instanceof Array) {
            req.query.q.forEach(function (queryField) {
                parseQueryField(queryField);
            })
        }
        else {
            parseQueryField(req.query.q);
        }
        function parseQueryField(queryField) {
            var queryPairs = queryField.split(":");
            mongoQuery.query[queryPairs[0]] = queryPairs[1];
        }
    }
    return mongoQuery;
}


function callback2Promise(err, result, deferred) {
	if (err) {
		logger.error(err);
		deferred.reject(err);
	} else {
		deferred.resolve(result);
	}
}