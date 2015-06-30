"use strict";


exports.configApp = function() {
    var express = require('express');
    var middleware = require('./middleware.js');
    var api = require('./api/api.js')
    var settings = require('./settings.js');

    var app = express();

    if (settings.cacheMode == "debug") {
        middleware.expressLog(app);
    }
    middleware.compression(app);
    middleware.uploads(app);
    if (settings.cacheMode == "debug") {
        middleware.useStaticFiles(app, express);
    } else {
        api.staticCache(app);
    }
    middleware.useBodyParser(app);
    middleware.useSecurity(app);
    if (settings.cacheMode !== "debug") {
        middleware.expressLog(app);
    }
    api.apiRoutes(app);

    return app;
};
