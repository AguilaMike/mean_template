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
        _id: {
            type: "string"
        },
        name: {
            type: "string"
        },
        password: {
            type: "string"
        },
        email: {
            type: "string"
        }
    },
    required: ["_id", "name", "password", "email"]
}

router
    .post('/', function (req, res) {
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
                                    return jwt.generate(JSON.stringify(user), res);
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
    })
    .get('/', function (req, res) {
        jwt.verify(req, res);
        return res.json(req.user);
    });
router.post('/sessions', function (req, res) {
    // LOGIN OF AN ALREADY REGISTERD USER
    usersData.findingByEmailPassword(req.body.email, req.body.password)
        .then(function (user) {
            if (user) {
                return jwt.generate(JSON.stringify(user), res);
            } else {
                return res.status(401).send({error:"Invalid email or password"});
            }
        })
        .fail(function (err) {
            logger.error(err);
            return res.status(500).send(err);
        });

});

crudApi(router, usersData, schema);
module.exports = router;