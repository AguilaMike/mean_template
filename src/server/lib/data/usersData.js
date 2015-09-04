var colName = 'users';
var Q = require('q');
var convert = require('../convert.js');
var crudData = require('./util/crudData.js')
    .crud(colName,
        { _id: 1 });

var mongodb = require('./util/mongodb.js');

exports.findingByEmail = function (email) {
    return mongodb.findingOne(colName, { email: email }, null);
}
exports.findingByEmailPassword = function (email,password) {
    return mongodb.findingOne(colName, { email: email, password:password}, null);
}
exports.count = function () {
	var deferred = Q.defer();
	var collection = mongodb.getConnection().collection(colName);
	collection
		.count(function (err, result) {
			convert.cllbck2prom(err, result, deferred);
		});
	return deferred.promise;
}
exports.crud = crudData;

