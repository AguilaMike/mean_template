var Q = require('q');
var MongoClient = require('mongodb').MongoClient;
var logger = require('../logger.js');
var settings = require('../settings.js');



exports.connecting = function (mongoCol) {
    var deferred = Q.defer();
    MongoClient.connect(settings.mongoUrl, function (err, db) {
        if (!err) {
            deferred.resolve(db.collection(mongoCol));
        } else {
            rejectOnError(deferred, err);
        }
    });
    return deferred.promise;
}



function rejectOnError(deferred, err) {
    logger.error(err);
    deferred.reject(err);
}
