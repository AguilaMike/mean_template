var cache = require('../cache.js');

var logger = require('../logger.js');



module.exports.staticCache = function (app) {
    app.get('/', function (req, res, next) {
        cache.getFile(req, res);
    });

    app.get('/static/*', function (req, res, next) {
        cache.getFile(req, res);
    });

}
module.exports.apiRoutes = function (app) {
    app.get('/api/roles', function (req, res, next) {
    
    });
    app.get('/api/users', function (req, res, next) {
    
    });
    
    app.get('/*', function (req, res, next) {
        var url = req.url;
        if ((url.indexOf("app/") >= 0) || url.indexOf("api/") >= 0) {
            next();
        } else {
            //metrics.count("homePage-Revisited");
            cache.getFile(req, res, '/');
        }
    });
}
