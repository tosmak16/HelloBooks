import Book from '../models/books';
import User from '../models/users';
import db from '../models/index';

export default {
  addBook(req, res) {
    db.Users
      .findOne({
        where: {
          username: req.decoded,
        },
      })
      .then((result) => {
        if (result.role === 'user') {
          return res.status(403).send({
            message: 'Access Denied!',
          });
        }

        return db.Books
          .create({
            bookTitle: req.body.bookTitle,
            author: req.body.author,
            category: req.body.category,
            isbn: req.body.isbn,
            stocknumber: req.body.stocknumber,
          })
          .then(report => res.status(201).send(report))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => error);
  },


  getAllBooks(req, res) {
    return db.Books
      .all()
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },

  updateBook(req, res) {
    db.Users
      .findOne({
        where: {
          username: req.decoded,
        },
      })
      .then((output) => {
        if (output.role === 'user') {
          return res.status(403).send({
            message: 'Access Denied!',
          });
        }
        return db.Books
          .findById(req.params.bookId)
          .then((result) => {
            if (!result) {
              return res.status(404).send({
                message: 'book does not exist',
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
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};
