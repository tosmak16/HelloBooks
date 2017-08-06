const User = require('../models').Users;
const Book = require('../models').Books;
const Transaction = require('../models').Transaction;
const jwt = require('jsonwebtoken');
var myt;

module.exports = {
    signup(req, res) {
        return User
            .create({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                membershipType: req.body.membershipType,

            })
            .then(result => res.status(201).send(result))
            .catch(error => res.status(400).send(error));
    },

    signin(req, res) {
        User
            .findAll({
                attributes: ['username'],
                where: {
                    username: req.body.username,
                    password: req.body.password,
                },


            })
            .then(result => {
                // create a token
                jwt.sign(req.body.username, "encoded", (err, token) => {
                    myt = token;
                    console.log(myt);

                });
                res.status(201).send({ result, myt })
            })
            .catch(error => res.status(400).send(error));


    },

    list(req, res) {
        return User
            .all()
            .then(result => res.status(200).send(result))
            .catch(error => res.status(400).send(error));
    },

    borrowBooks(req, res) {

        return Book
            .findById(req.body.bookId)
            .then(result => {
                if (!result) {
                    return res.status(404).send({
                        message: 'book Not Found',
                    });
                }

                return Transaction
                    .create({
                        brdate: Date.now(),
                        retype: false,
                        userId: req.params.userId,
                        bookId: req.body.bookId


                    })
                    .then((re) => res.status(200).send(re))
                    .catch((error) => res.status(400).send(error));

            })
            .catch((error) => res.status(400).send(error));
    },

    getUnreturnBooks(req, res) {
        return Transaction
            .findAll({
                where: {
                    retype: req.query.returned
                }
            }).then((result) =>
                res.status(200).send(result))
            .catch((error) => res.status(400).send(error));
    },

    returnBooks(req, res) {

        return Transaction
            .findById(req.body.Id)
            .then(result => {
                if (!result) {
                    return res.status(404).send({
                        message: 'Record Not Found',
                    });
                }

                return result
                    .update({
                        retype: true,
                        rdate: Date.now(),

                    })
                    .then((re) => res.status(200).send(re))
                    .catch((error) => res.status(400).send(error));

            })
            .catch((error) => res.status(400).send(error));

    }

};