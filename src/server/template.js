"use strict";

var settings = require("./lib/settings.js");
var logger = require("./lib/logger.js");
var metrics = require("./lib/metrics.js");
metrics.count("template.start");
logger.info('ready... settings ok', settings);

var express = require('./lib/express.js');
var app = express.configApp();
logger.info('steady... router ok');

app.listen(settings.port);
logger.warn('go... listening on port: ' + settings.port);
