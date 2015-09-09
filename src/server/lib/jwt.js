var jwt = require('jsonwebtoken');
var logger = require('./logger.js');
var settings = require("./settings.js");

exports.generate = function (user) {
    var token = jwt.sign(user, secret(), {
        expiresInMinutes: 20
    });
    return token;
}

exports.verify = function (req, res, next) {
    var token = req.headers['x-access-token'];
    console.log(token);
    try {
        req.user = jwt.verify(token, secret());
        console.log(req.user);
    } catch (err) {
        console.error(err);
        return res.status(403).send();
    }
}

function secret() {
    return settings.secret + "agorabinaria";
}