const jwt = require('jsonwebtoken');
const User = require('../models').Users;


module.exports = {

    auth(req, res, next) {
        var token = req.body.token || req.headers['token'];
        if (token) {
            jwt.verify(token, 'encoded', function(err, decoded) {
                if (err) {
                    console.error('JWT Verification Error');
                    req.decoded = "0";
                    return res.status(403).send(err);
                } else {

                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(404).send('Token not provided');
        }
    }
}