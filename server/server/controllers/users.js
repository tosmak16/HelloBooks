const User = require('../models').Users;
const Book = require('../models').Books;
const Transaction = require('../models').Transaction;

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
                        rdate: "2",
                        userId: req.params.userId,
                        bookId: req.body.bookId


                    })
                    .then((re) => res.status(200).send(re))
                    .catch((error) => res.status(400).send(error));

            })
            .catch((error) => res.status(400).send(error));
    }
};