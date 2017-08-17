import db from '../models/index';

export default {
  /**
* @method addbook
* @desc This is a method that allows only admin to add books
* @param { object } req
* @param { object} res
* @returns { object } response
*/
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
          .then(report => res.status(201).send({ message: 'Book has been added to store', report }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => error);
  },

  /**
* @method getAllBooks
* @desc This is a method that allows users to get all available books
* @param { object } req
* @param { object} res
* @returns { object } response
*/

  getAllBooks(req, res) {
    return db.Books
      .all()
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },

  /**
* @method UpdateBook
* @desc This is a method that allows only admin to edit a book
* @param { object } req
* @param { object} res
* @returns { object } response
*/
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
              .then(() => res.status(200).send({ message: 'Book has been updated', result })) // Send back the updated book
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  /**
* @method deletebooks
* @desc This is a method that allows only admin to delete books
* @param { object } req
* @param { object} res
* @returns { object } response
*/
  deleteBooks(req, res) {
    db.Users
      .findById(req.params.userId)
      .then((report) => {
        if (report.username !== req.decoded) {
          return res.status(404).send({
            message: 'Invalid Identity',
          });
        }

        if (report.role !== 'admin') {
          return res.status(403).send({
            message: 'Access Denied!',
          });
        }

        return db.Books
          .findById(req.body.bookId)
          .then((result) => {
            result
              .destroy()
              .then(() => res.status(204).send({ message: 'deleted' }))
              .catch(error => res.status(400).send(error));
          }).catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send(error));
  },

};
