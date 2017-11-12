import isEmpty from 'lodash/isEmpty';
import db from '../models/index';


export default {
  /**
   * @method addbook
   * @desc This method handles add books request
   * @param { object} req
   * @param { object} res
   * @returns { object } response
   */
  addBook(req, res) {
    const {
      bookTitle,
      author,
      category,
      isbn,
      stocknumber,
      image,
      bookFileUrl,
      summary
    } = req.body;
    if (req.decoded.role === 'user') {
      return res.status(403).send({
        status: 403,
        message: 'Access Denied!'
      });
    }

    if (!(bookTitle && author && category &&
        stocknumber && isbn && image && bookFileUrl)) {
      return res.status(400).send({
        status: 400,
        message: 'please enter the required book details'
      });
    }

    return db.Books
      .create({
        bookTitle,
        author,
        category,
        isbn,
        stocknumber,
        image,
        summary,
        bookFile: bookFileUrl,
      })
      .then(bookReport => res.status(201).send({
        status: 201,
        message: 'Book has been added to store',
        bookReport
      }))
      .catch(errorMessage => res.status(400).send({
        status: 400,
        message: errorMessage.errors[0].message
      }));
  },

  /**
   * @method getAllBooks
   * @desc This method handles get all books request
   * @param { object } req
   * @param { object} res
   * @returns { object } response
   */
  getAllBooks(req, res) {
    return db.Books
      .all()
      .then(books => res.status(200).send({
        status: 200,
        message: 'Success!',
        books
      }))
      .catch(errorMessage => res.status(400).send({
        status: 400,
        message: errorMessage.errors[0].message.toString()
      }));
  },

  /**
   * @method UpdateBook
   * @desc This method handles edit book request
   * @param { object} req
   * @param { object} res
   * @returns { object } response
   */
  updateBook(req, res) {
    const {
      bookTitle,
      author,
      category,
      isbn,
      stocknumber,
      image,
      bookFileUrl,
      summary
    } = req.body;
    if (req.decoded.role === 'user') {
      return res.status(403).send({
        status: 403,
        message: 'Access Denied!'
      });
    }
    return db.Books
      .findById(req.params.bookId)
      .then((book) => {
        if (isEmpty(book)) {
          return res.status(404).send({
            status: 404,
            message: 'Book does not exist'
          });
        }
        return book
          .update({
            bookTitle: bookTitle || book.bookTitle,
            author: author || book.author,
            category: category || book.category,
            isbn: isbn || book.isbn,
            stocknumber: stocknumber || book.stocknumber,
            image: image || book.image,
            bookFile: bookFileUrl || book.bookFile,
            summary: summary || book.summary,
          })
          .then(() => res.status(200).send({
            status: 200,
            message: 'Book has been updated',
            book
          }))
          .catch(errorMessage =>
            res.status(400).send({
              status: 400,
              message: errorMessage.errors[0].message.toString()
            }));
      })
      .catch(errorMessage => res.status(400).send({
        status: 400,
        message: errorMessage.errors[0].message.toString()
      }));
  },
  /**
   * @method deletebooks
   * @desc This method handles delete books request
   * @param { object } req
   * @param { object} res
   * @returns { object } response
   */
  deleteBooks(req, res) {
    if (req.decoded.role === 'user') {
      return res.status(403).send({
        status: 403,
        message: 'Access Denied!'
      });
    }

    return db.Books
      .findById(req.params.bookId)
      .then((book) => {
        if (isEmpty(book)) {
          return res.status(404).send({
            status: 404,
            message: 'Book does not exist'
          });
        }
        book
          .destroy()
          .then(() => res.status(204).send({
            status: 204,
            message: 'book has been deleted'
          }))
          .catch(errorMessage =>
            res.status(400).send({
              status: 400,
              message: errorMessage.errors[0].message.toString()
            }));
      }).catch(errorMessage =>
        res.status(400).send({
          status: 400,
          message: errorMessage.errors[0].message.toString()
        }));
  },
};
