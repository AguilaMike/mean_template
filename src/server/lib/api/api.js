var cache = require('../cache.js');

/** routing for files fetched from fs */
module.exports.staticFileRoutes = function (app) {
    /** base route for index.html */
    app.get('/', function (req, res, next) {
        cache.getFile(req, res);
    });
    /** routes for client side static files */
    app.get('/app/*', function (req, res, next) {
        cache.getFile(req, res);
    });

}

/** routing for api calls */
module.exports.apiRoutes = function (app) {
    // TODO: declare routes and bind to data or service methods
    app.get('/api/roles', function (req, res, next) {
    
    });
    app.get('/api/users', function (req, res, next) {
    
    });
}

/** non controlled routes */
module.exports.otherRoutes = function (app) {
    app.get('/*', function (req, res, next) {
        // redirect everything else to index.html
        // TODO: control if it should respond with a 404
        cache.getFile(req, res, '/');
    });
}
