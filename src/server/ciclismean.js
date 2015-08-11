"use strict";

var settings = require("./lib/settings.js");
var logger = require("./lib/logger.js");
logger.info('ready... settings ok', settings);
var metrics = require("./lib/metrics.js");
metrics.count(settings.name + ".start");

var express = require('./lib/express.js');
var app = express.createApp();
logger.info('steady... express router ok');

app.listen(settings.port);
logger.warn('go... listening on port: ' + settings.port);