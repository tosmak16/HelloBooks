const jwt = require('jsonwebtoken');
const user = require('../models').users;


module.exports = {

    auth(req, res, next) {
        var token = req.body.token || req.headers['token'];
        if (token) {
            jwt.verify(token, 'encoded', function(err, decoded) {
                if (err) {
                    console.error('JWT Verification Error');
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