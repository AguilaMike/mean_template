var jwt = require('jsonwebtoken');
var logger = require('./logger.js');
var settings = require("./settings.js");

exports.generate = function(user){
	var token = jwt.sign(user, secret(), {
          expiresInMinutes: 20 
        });
	return token;
}

exports.verify = function(token, cb){
	jwt.verify(token, secret(), cb);
}

function secret(){
	return settings.secret + "agorabinaria";
}