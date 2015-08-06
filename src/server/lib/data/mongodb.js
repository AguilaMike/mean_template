var Q = require('q');
var MongoClient = require('mongodb').MongoClient;
var logger = require('../logger.js');
var settings = require('../settings.js');

module.exports = {
	/** connects to a database */
	connecting:connecting,
	/** performs a find operation that returna an array*/
	finding: finding,
	/** performs a find operation that returns an item*/
	findingOne:findingOne,
	/** performs an aggegation operation */
	aggregating:aggregating,
	/** inserts a new document  */
	inserting:inserting,
	/** updates existing documents  */
	updating:updating
}

function connecting() {
    var deferred = Q.defer();
    MongoClient.connect(settings.mongoUrl, function (err, db) {
        callback2Promise(err, db, deferred);
    });
    return deferred.promise;
}

function finding(colName, query, projection) {
	var deferred = Q.defer();
	connecting()
		.then(function (db) {
			if(projection){
			db.collection(colName).find(query, projection).toArray(function (err, result) {
				callback2Promise(err, result, deferred);
			});}
			else{
				db.collection(colName).find(query).toArray(function (err, result) {
				callback2Promise(err, result, deferred);
			});}
			}
		)
		.fail(function (err) {
			callback2Promise(err, null, deferred);
		});
	return deferred.promise;
}

function findingOne(colName, query, projection) {
	var deferred = Q.defer();
	connecting()
		.then(function (db) {
			var col =db.collection(colName);
			if(projection){
			col.findOne(query, projection , function (err, result) {
				callback2Promise(err, result, deferred);
			});}
			else{
				col.findOne(query,  function (err, result) {
				callback2Promise(err, result, deferred);
			});
			}
		})
		.fail(function (err) {
			callback2Promise(err, null, deferred);
		});
	return deferred.promise;
}

function aggregating(colName, query) {
	var deferred = Q.defer();
	connecting()
		.then(function (db) {
			db.collection(colName).aggregate(query, function (err, result) {
				callback2Promise(err, result, deferred);
			});
		})
		.fail(function (err) {
			callback2Promise(err, null, deferred);
		});
	return deferred.promise;
}

function inserting(colName, document) {
	var deferred = Q.defer();
	connecting()
		.then(function (db) {
			db.collection(colName).insert(document, function (err, result) {
				callback2Promise(err, result, deferred);
			});
		})
		.fail(function (err) {
			callback2Promise(err, null, deferred);
		});
	return deferred.promise;
}

function updating(colName, query, update, options) {
	var deferred = Q.defer();
	connecting()
		.then(function (db) {
			db.collection(colName).update(query, update, options, function (err, result) {
				callback2Promise(err, result, deferred);
			});
		})
		.fail(function (err) {
			callback2Promise(err, null, deferred);
		});
	return deferred.promise;
}

/** takes callback parameters and returns a promise response */
function callback2Promise(err, result, deferred) {
	if (err) {
		logger.error(err);
		deferred.reject(err);
	} else {
		deferred.resolve(result);
	}
}