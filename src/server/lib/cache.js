var logger = require('./logger.js');
var metrics = require('./metrics.js');
var cacheManager = require('cache-manager');
var path = require('path');
var fs = require("fs");
var mime = require('mime');
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var memoryFileCache = cacheManager.caching({
	store: 'memory',
	max: 300,
	ttl: day
});
var memoryJsonCache = cacheManager.caching({
	store: 'memory',
	max: 300,
	ttl: hour
});


exports.resetCache = function (req, res) {
	memoryFileCache.reset();
	memoryJsonCache.reset();
	res.status(200).send();
}

exports.getFile = function (req, res, urlRedirect) {
	var key = urlRedirect || decodeURI(req.path);
	if (key === "/") key = '/index.html'
	var filePath = path.join(__dirname, './../../client' + key);
	var mimeType = mime.lookup(filePath);
	memoryFileCache.wrap(key,
		function (cb) {
			fs.readFile(filePath, function (err, data) {
				metrics.count("cache.feed: " + key);
				cb(err, data);
			});
		},
		function (err, result) {
			metrics.count("cache.use: " + key);
			sendResponse(err, result, res, mimeType, day);
		}
		);
};

exports.getJsonApi = function (req, res) {
	var key = req.url;
	memoryJsonCache.wrap(key,
		function (cb) {
			metrics.count("cache.feed: " + key);
			cb(error, body);
		},
		function (err, result) {
			metrics.count("cache.use: " + key);
			sendResponse(err, result, res, 'application/json', hour);
		}
		);
};


function sendResponse(err, result, res, content_type, max_age) {
	if (err) {
		logger.error(err);
		res.status(500).send(err);
	} else {
		res.set('content-type', content_type);
		res.set('cache-control', 'max-age=' + max_age);
		res.send(result);
	}
}
