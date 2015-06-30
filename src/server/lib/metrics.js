var mongodb = require('./data/mongodb.js');
var mongoCol = 'metrics';

exports.count = function(key) {
    mongodb.connecting(mongoCol)
        .then(function(collection) {
            collection.findOne({
                _id: key
            }, function(err, item) {
                if (!item) {
                    newMetric(key, collection);
                } else {
                    updateMetric(key, collection);
                }
            })
        });
};

function newMetric(key, collection) {
    var metric = {
        _id: key,
        first: new Date(),
        last: new Date(),
        counter: 1
    };
    collection.update({
        _id: key
    }, metric, {
        upsert: true
    }, function(err) {});
}

function updateMetric(key, collection) {
    collection.update({
        _id: key
    }, {
        $inc: {
            counter: 1
        },
        $set: {
            last: new Date()
        }
    }, function(err) {});
}
