var mongodb = require('./mongodb.js');
var logger = require('../logger.js');

var colName = 'riders';

exports.find = function (mongoQuery) {
    logger.debug("mongoQuery: " + JSON.stringify(mongoQuery));
    
    if(!mongoQuery.sort){
        mongoQuery.sort = {
        total_victories: -1,
        name: 1}
    }
    return mongodb.finding(colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit, mongoQuery.sort);
}


/*
exports.selectById = function (id, respuesta) {
    mongodb.connecting(mongoCol)
        .then(function (collection) {
            collection.find({
                _id: id
            }).toArray(function (err, result) {
                respuesta.json(result[0]);
            });
        })
        .fail(function (err) {
            respuesta.status(500).send(err)
        });
}

exports.selectBySafeName = function (safe_name, respuesta) {
    mongodb.connecting(mongoCol)
        .then(function (collection) {
            collection.find({
                safe_name: safe_name
            }).toArray(function (err, result) {
                respuesta.json(result[0]);
            });
        })
        .fail(function (err) {
            respuesta.status(500).send(err)
        });
}


exports.selectRidersByTeam = function (team, respuesta) {
    mongodb.connecting(mongoCol)
        .then(function (collection) {
            collection.find({
                team: team
            }).sort({
                total_victories: -1,
                name: 1
            }).toArray(function (err, result) {
                respuesta.json(result);
            });
        })
        .fail(function (err) {
            respuesta.status(500).send(err)
        });
}

exports.deleteRider = function (id, respuesta) {
    mongodb.connecting(mongoCol)
        .then(function (collection) {
            var query = {
                _id: id
            };
            collection
                .remove(query, {},
                    function (err, num) {
                        if (err) {
                            logger.error(err);
                            respuesta.status(500).send(err);
                        } else {
                            respuesta.status(200).send("borrados " + num);
                        }

                    });
        });
}

exports.selectByQuery = function (q, respuesta) {
    mongodb.connecting(mongoCol)
        .then(function (collection) {
            var rq = {
                $regex: ".*" + q + ".*",
                $options: 'i'
            };
            collection.find({
                $or: [{
                    _id: rq
                }, {
                        lob: rq
                    }, {
                        team: rq
                    }, {
                        safe_name: rq
                    }, {
                        team_rol: rq
                    }]
            }).toArray(function (err, result) {
                respuesta.json(result);
            });
        })
        .fail(function (err) {
            respuesta.status(500).send(err)
        });
}


exports.selectOrderedVictories = function (skip, limit, respuesta) {
    mongodb.connecting(mongoCol)
        .then(function (collection) {
            collection.find().skip(parseInt(skip)).limit(parseInt(limit)).sort({
                total_victories: -1
            }).toArray(function (err, result) {
                respuesta.json(result);
            });
        })
        .fail(function (err) {
            respuesta.status(500).send(err)
        });
}
*/