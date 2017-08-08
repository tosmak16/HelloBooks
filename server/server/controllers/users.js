const User = require('../models').Users;
const Book = require('../models').Books;
const borrowbook = require('../models').borrowbook;
const jwt = require('jsonwebtoken');
const { SHA256 } = require('crypto-js');
var myt;

module.exports = {
    signup(req, res) {
        User
            .create({
                username: req.body.username,
                password: SHA256(req.body.password).toString(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                membershipType: req.body.membershipType,
                role: req.body.role

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
                    password: SHA256(req.body.password).toString(),
                },


            })
            .then(result => {
                if (result.length === 0) {
                    res.status(400).send();
                } else {
                    // create a token
                    jwt.sign(req.body.username, "encoded", (err, token) => {

                        res.status(201).send({ result, token })
                    });

                }
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
        User
            .findById(req.params.userId)
            .then(result => {
                if (result.username !== req.decoded)
                    return res.status(404).send({
                        message: 'Invalid Identity',
                    });


                Book
                    .findById(req.body.bookId)
                    .then(result => {
                        if (!result) {
                            return res.status(404).send({
                                message: 'book Not Found',
                            });
                        }

                        if (result.stocknumber === 0) {
                            return res.status(404).send({
                                message: 'Book Not available in stock',
                            });
                        }


                        result.update({ stocknumber: (result.stocknumber - 1) });

                        return borrowbook
                            .create({
                                brdate: Date.now(),
                                retype: false,
                                userId: req.params.userId,
                                bookId: result.id


                            })
                            .then((result) => res.status(200).send(result))
                            .catch((error) => res.status(400).send(error));

                    })
                    .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
    },

    getUnreturnBooks(req, res) {
        User
            .findById(req.params.userId)
            .then(result => {
                if (result.username !== req.decoded)
                    return res.status(404).send({
                        message: 'Invalid Identity',
                    });
                return borrowbook
                    .findAll({
                        where: {
                            retype: req.query.returned,
                            userId: req.params.userId
                        }
                    }).then((result) =>
                        res.status(200).send(result))
                    .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
    },

    returnBooks(req, res) {
        User
            .findById(req.params.userId)
            .then(result => {
                if (result.username !== req.decoded)
                    return res.status(404).send({
                        message: 'Invalid Identity',
                    });
                return borrowbook
                    .findById(req.body.Id)
                    .then(result => {
                        if (!result) {
                            return res.status(404).send({
                                message: 'Record Not Found',
                            });
                        }
                        if (result.retype === true) {
                            return res.status(404).send({
                                message: 'This book have been returned before',
                            });
                        }

                        return result
                            .update({
                                retype: true,
                                rdate: Date.now(),

                            })
                            .then((result) => {
                                Book
                                    .findById(result.bookId)
                                    .then(report => {
                                        report
                                            .update({
                                                stocknumber: (report.stocknumber + 1)
                                            })
                                    }).catch((error) => res.status(400).send(error));
                                res.status(200).send(result)
                            })
                            .catch((error) => res.status(400).send(error));

                    })
                    .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));

    },

    deleteBooks(req, res) {
        User
            .findById(req.params.userId)
            .then(result => {
                if (result.username !== req.decoded)
                    return res.status(404).send({
                        message: 'Invalid Identity',
                    });

                if (result.role !== 'admin') {
                    return res.status(404).send({
                        message: 'Error not allowed!',
                    });
                }

                Book
                    .findById(req.body.bookId)
                    .then(result => {
                        result
                            .destroy()
                            .then(() => res.status(204).send({ message: 'deleted' }))
                            .catch(error => res.status(400).send(error));
                    })
            })
    }

};