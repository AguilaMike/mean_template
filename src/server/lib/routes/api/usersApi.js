var express = require('express');
var crudApi = require('./util/crudApi.js');
var usersData = require('../../data/usersData.js');
var convert = require('../../convert.js');
var jwt = require('../../jwt.js');

var router = express.Router({
    mergeParams: true
});

var schema = {
    id: "rolesDetails",
    type: "object",
    properties: {
        _id: { type: "string" },
        name: { type: "string" },
        password: { type: "string" },
        email: { type: "string" }
    },
    required: ["_id", "name", "password", "email"]
}

router.post('/', function (req, res) {
    // UN REGISTRO
    /*
    - mirar si ya existe
    - mirar si es el primero
    - insertar usuario
    //usersData.inserting(req.body);
    - insertar sesion
    - devolver token
    */
    var token = generateToken({});
    return res.status(201).json(token);
    
});

router.post('/session', function (req, res) {
    // UN LOGIN
    /*
    - mirar si existe el par email-password
    - insertar sesion
    - devolver token
    */
    var token = generateToken({email:'albertobasalo@agorabinaria.com'});
    return res.status(201).json(token);

});

function generateToken(user){
    user.password ="";
    return jwt.generate(JSON.stringify(user));
}

crudApi(router, usersData, schema);
module.exports = router;