'use strict';

var Book = require('../models').Books;
var User = require('../models').Users;

module.exports = {
    addBook: function addBook(req, res) {
        User.findOne({
            // attributes: ['role'],
            where: {
                username: req.decoded

            }
        }).then(function (result) {
            console.log(result.role);
            if (result.role === 'user') {
                console.log('Access Denied!');
                return res.status(403).send({
                    message: 'Access Denied!'
                });
            }

            return Book.create({
                bookTitle: req.body.bookTitle,
                author: req.body.author,
                category: req.body.category,
                isbn: req.body.isbn,
                stocknumber: req.body.stocknumber
            }).then(function (result) {
                return res.status(201).send(result);
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        }).catch(function (error) {
            return error;
        });
    },
    getAllBooks: function getAllBooks(req, res) {
        return Book.all().then(function (result) {
            return res.status(200).send(result);
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    updateBook: function updateBook(req, res) {
        User.findOne({
            // attributes: ['role'],
            where: {
                username: req.decoded

            }
        }).then(function (result) {
            console.log(result.role);
            if (result.role === 'user') {
                console.log('Access Denied!');
                return res.status(403).send({
                    message: 'Access Denied!'
                });
            }
            return Book.findById(req.params.bookId).then(function (result) {
                if (!result) {
                    return res.status(404).send({
                        message: 'book does not exist'
                    });
                }
                return result.update({
                    bookTitle: req.body.bookTitle || result.bookTitle,
                    author: req.body.author || result.author,
                    category: req.body.category || result.category,
                    isbn: req.body.isbn || result.isbn,
                    stocknumber: req.body.stocknumber || result.stocknumber
                }).then(function () {
                    return res.status(200).send(result);
                }) // Send back the updated book
                .catch(function (error) {
                    return res.status(400).send(error);
                });
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    }
};