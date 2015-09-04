var express = require('express');
var crudApi = require('./util/crudApi.js');
var usersData = require('../../data/usersData.js');
var convert = require('../../convert.js');
var logger = require('../../logger.js');
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
    // REGISTERING NEW USER
    usersData.findingByEmail(req.body.email)
        .then(function (user) {
            if (user) {
                return res.status(409).send();
            } else {
                user = req.body;
                usersData.count()
                    .then(function (count) {
                        if (count == 0) user.role = "GOD";
                        usersData.crud.inserting(user)
                            .then(function (user) {
                                var token = generateToken(user);
                                return res.status(201).json(token);
                            })
                            .fail(function (err) {
                                logger.error(err);
                                return res.status(500).send(err);
                            });
                    })
                    .fail(function (err) {
                        logger.error(err);
                        return res.status(500).send(err);
                    });
            }
        })
        .fail(function (err) {
            logger.error(err);
            return res.status(500).send(err);
        });
});

router.post('/session', function (req, res) {
    // LOGIN OF AN ALREADY REGISTERD USER
    usersData.findingByEmailPassword(req.body.email, req.body.password)
        .then(function (user) {
            if (user) {
                var token = generateToken(user);
                return res.status(200).json(token);
            } else {
                return res.status(400).send();
            }
        })
        .fail(function (err) {
            logger.error(err);
            return res.status(500).send(err);
        });

});

function generateToken(user) {
    user.password = "";
    return jwt.generate(JSON.stringify(user));
}

crudApi(router, usersData, schema);
module.exports = router;