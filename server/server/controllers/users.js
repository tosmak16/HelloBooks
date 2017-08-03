const User = require('../models').Users;

module.exports = {
    signup(req, res) {
        return User
            .create({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                membershipType: req.body.lastName,

            })
            .then(result => res.status(201).send(result))
            .catch(error => res.status(400).send(error));
    },

    signin(req, res) {
        return User
            .findAll({
                attributes: ['username'],
                where: {
                    username: req.body.username,
                    password: req.body.password,
                },


            })
            .then(result => res.status(201).send(result))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return User
            .all()
            .then(result => res.status(200).send(result))
            .catch(error => res.status(400).send(error));
    },
};