const jwt = require('jsonwebtoken');

module.exports = {

    auth(req, res, next) {
        var token = req.body.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, 'encoded', function(err, decoded) {
                if (err) {
                    console.error('JWT Verification Error', err);
                    return res.status(403).send(err);
                } else {
                    req.decoded = decoded;
                    return next();
                }
            });
        } else {
            res.status(403).send('Token not provided');
        }
    }
}