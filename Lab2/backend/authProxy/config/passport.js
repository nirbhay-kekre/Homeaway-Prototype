'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const kafka = require('./../../kafka/client');
var config = require('./settings');
const { PASSPORT_REQUEST_TOPIC, PASSPORT_RESPONSE_TOPIC } = require('./../../kafka/topics');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        kafka.make_request(PASSPORT_REQUEST_TOPIC, PASSPORT_RESPONSE_TOPIC, {username: jwt_payload.username}, function (err, result) {
            if (err) {
                callback(err, false);
            } else {
                if(result.code === 200){
                    let user = result.data;
                    callback(null, user);
                } else{
                    return callback(result, false);
                }
            }
        });
    }));
};

