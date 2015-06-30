var winston = require('winston');
var MongoDB = require('winston-mongodb');
var settings = require("./settings.js");
var logger = null;
winston.emitErrs = true;
var console = new winston.transports.Console({
	level: 'debug',
	handleExceptions: true,
	json: false,
	colorize: true,
	timestamp: true
});
var mongoDb = {
	db: settings.mongoUrl,
	collection: 'logs',
	storeHost: true
};

module.exports = config();


function config() {
	if (!logger) {
		logger = new winston.Logger({
			transports: [console],
			exitOnError: false
		});
	}
	if (settings.mongoUrl) {
		logger.add(winston.transports.MongoDB, mongoDb);
	}
	return logger;
};

module.exports.morgan_stream = {
	write: function (message, encoding) {
		var morgan = message.slice(0, -1);
		try {
			var meta = JSON.parse(morgan);
			if (meta.cnt == "-") {
				meta.cnt = 0;
			} else {
				meta.cnt = parseInt(meta.cnt)
			}
			logger.info("express", meta);
		} catch (err) {
			logger.error("morgan_stream", err);
		}
	}
};
