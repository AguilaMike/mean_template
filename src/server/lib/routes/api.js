var express = require('express');

/** routing for api calls */
module.exports.apiRoutes = function (app) {
    app.use('/api/roles', require('./api/roles.js'));
    app.use('/api/users', require('./api/users.js'));
<<<<<<< HEAD
    
    app.use('/api/riders', require('./api/riders.js'));
    app.use('/api/teams', require('./api/teams.js'));
    app.use('/api/competitions', require('./api/competitions.js'));
=======
>>>>>>> 04699a1b4765096764f9212676a10fe4a523e8be
}

