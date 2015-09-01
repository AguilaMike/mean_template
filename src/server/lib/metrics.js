var mongodb = require('./data/util/mongodb.js');
var logger = require('./logger.js');

var colName = 'metrics';

/** to count how many times an event has ocurred */
exports.count = function (key) {
    var q = { _id: key };
    mongodb.findingOne(colName, q, null)
        .then(function (item) {
            if (!item) {
                newMetric(q);
            } else {
                updateMetric(q);
            }
        });
};
/** creates a new entry for new event category */
function newMetric(q) {
    var updt = {
        _id: q._id,
        first: new Date(),
        last: new Date(),
        counter: 1
    };
    var opt = { upsert: true };
    mongodb.updating(colName, q, updt, opt);
}

/** updates the counter */
function updateMetric(q) {
    var updt = {
        $inc: { counter: 1 },
        $set: { last: new Date() }
    };
    mongodb.updating(colName, q, updt, null);
}

