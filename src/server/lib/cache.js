var logger = require('./logger.js');
var metrics = require('./metrics.js');
var cacheManager = require('cache-manager');
var path = require('path');
var fs = require("fs");
var mime = require('mime');
var settings = require('./settings.js');
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var memoryFileCache = {};
var memoryJsonCache = {};

/** initializes cache with settings data */
exports.initCache = function () {
	if (settings.cacheMode == "off") {
		memoryFileCache = null;
		memoryJsonCache = null;
	}
	else {
		memoryFileCache = cacheManager.caching({
			store: 'memory',
			max: 300,
			ttl: day
		});
		memoryJsonCache = cacheManager.caching({
			store: 'memory',
			max: 300,
			ttl: hour
		})
	}
}
/** restes all cache data, forcing to fetch fresh data */
exports.resetCache = function (req, res) {
	memoryFileCache.reset();
	memoryJsonCache.reset();
	res.status(200).send();
}
/** gets a file form fs or memory */
exports.getFile = function (req, res, urlRedirect) {
	var key = urlRedirect || decodeURI(req.path);
	if (key === "/") key = '/index.html'
	var filePath = path.join(__dirname, './../../client' + key);
	var mimeType = mime.lookup(filePath);
	if (memoryFileCache) {
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
	} else {
		fs.readFile(filePath, function (err, data) {
			sendResponse(err, data, res, mimeType, minute);
		});
	}
};
/** not imoplemented data cache */
exports.getJsonApi = function (req, res) {
	if (memoryJsonCache) {
		var key = req.url;
		memoryJsonCache.wrap(key,
			function (cb) {
				// TODO: call for data
				metrics.count("cache.feed: " + key);
				cb(error, body);
			},
			function (err, result) {
				metrics.count("cache.use: " + key);
				sendResponse(err, result, res, 'application/json', hour);
			}
			);
	} else {
		// TODO: call for data
	}
};

/** utility to send a common response */
function sendResponse(err, result, res, content_type, max_age) {
	if (err) {
		if (err.code ==='ENOENT') {
			logger.warn('Not Found: ' + err.path);
			res.status(404).send(err);
		}
		else {
			logger.error(err);
			res.status(500).send(err);
		}
	} else {
		res.set('x-timestamp', Date.now());
		res.set('content-type', content_type);
		res.set('cache-control', 'max-age=' + max_age);
		res.send(result);
	}
}
