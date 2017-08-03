const Book = require('../models').Books;

module.exports = {
    addBook(req, res) {
        return Book
            .create({
                bookTitle: req.body.bookTitle,
                author: req.body.author,
                category: req.body.category,
                isbn: req.body.isbn,
                stocknumber: req.body.stocknumber,

            })
            .then(result => res.status(201).send(result))
            .catch(error => res.status(400).send(error));
    },


    getAllBooks(req, res) {
        return Book
            .all()
            .then(result => res.status(200).send(result))
            .catch(error => res.status(400).send(error));
    },

    updateBook(req, res) {
        return Book
            .findById(req.params.bookId)
            .then(result => {
                if (!result) {
                    return res.status(404).send({
                        message: 'book Not Found',
                    });
                }
                return result
                    .update({
                        bookTitle: req.body.bookTitle || result.bookTitle,
                        author: req.body.author || result.author,
                        category: req.body.category || result.category,
                        isbn: req.body.isbn || result.isbn,
                        stocknumber: req.body.stocknumber || result.stocknumber,
                    })
                    .then(() => res.status(200).send(result)) // Send back the updated book
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

};