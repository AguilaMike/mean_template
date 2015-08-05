var morgan = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var multer = require('multer');
var logger = require('./logger.js');
var securityData = require('./data/security-data.js');

/** Use the compression middleware to gzip files sent to the client */
exports.useCompression = function (app) {
    app.use(compression());
};

exports.uploads = function (app) {
    app.use(multer({ inMemory: true, limits: { fieldNameSize: 100, files: 1 } }));
};

exports.expressLog = function expressLog(app) {
    var jsonLog = '{"url": ":url" , "sts": :status, "rtm": :response-time, "cnt": ":res[content-length]" , "ipa": ":remote-addr"}';
    app.use(morgan(jsonLog, {
        "skip": function (req, res) {
            return res.statusCode == 304
        },
        "stream": logger.morgan_stream
    }));
    app.use(clientErrorHandler);
    function clientErrorHandler(err, req, res, next) {
        logger.error(err.message, err.stack);
        if (req.xhr) {
            res.send(500, {
                error: err.message
            });
        } else {
            next(err);
        }
    }
};



exports.useStaticFiles = function staticFiles(app, express) {
    var static_options = {
        maxAge: '1d',
        setHeaders: function (res, path, stat) {
            res.set('x-timestamp', Date.now());
        }
    };
    logger.debug("using useStaticFiles");   
    app.use(express.static(__dirname + './../../client', static_options));
}

exports.useBodyParser = function useBodyParser(app) {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
}


exports.useSecurity = function name(app) {
    app.use('/api/priv/', function (req, res, next) {
        // JWT
        next();
    });
}
