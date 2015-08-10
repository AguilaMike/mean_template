var express = require('express');

/** routing for api calls */
module.exports.apiRoutes = function (app) {
    app.use('/api/roles', require('./api/roles.js'));
    app.use('/api/users', require('./api/users.js'));
}

