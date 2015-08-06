"use strict";

/** Creates the express application*/
exports.createApp = function () {
    var express = require('express');
    var middleware = require('./middleware.js');
    var api = require('./api/api.js')
    var app = express();
    
    middleware.useExpressLog(app);
    middleware.useCache(app);
    middleware.useCompression(app);
    middleware.useUploader(app);
    middleware.useBodyParser(app);
    middleware.useSecurity(app);
    
    api.staticFileRoutes(app);
    api.apiRoutes(app);
    api.otherRoutes(app);
    
    return app;
};
