const jwt = require('jsonwebtoken');
const user = require('../models').users;

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
                    if (req.params.userId)
                        return User
                            .findById(req.params.userId)
                            .then(result => {
                                if (result.username.length === 0) {
                                    return res.status(404).send({
                                        message: 'Invalid User',
                                    });
                                }

                                if (result.username !== req.decoded)
                                    return res.status(404).send({
                                        message: 'Invalid Identity',
                                    });
                            })

                    return next();
                }
            });
        } else {
            res.status(403).send('Token not provided');
        }
    }
}