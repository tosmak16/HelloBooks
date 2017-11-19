import isEmpty from 'lodash/isEmpty';
import db from '../models/index';
import {
  validateIds
} from '../helperFunctions/validator';
import {
  bookDetailsValidator
} from '../helperFunctions/bookDetailsValidator';
import {
  queryBooks
} from '../helperFunctions/queryReducer';
import {
  updateBooksValidator
} from '../helperFunctions/updateBooksValidator';


export default {
  /**
   * @method addbook
   * @desc This method handles add books request
   * @param { object} req request
   * @param { object} res response
   * @returns { object } response
   */
  addBook(req, res) {
    if (req.decoded.role.toString() === 'user') {
      return res.status(403).send({
        status: 403,
        message: 'Access Denied!'
      });
    }
    const {
      bookTitle,
      author,
      category,
      isbn,
      stockNumber,
      image,
      bookFileUrl,
      summary
    } = req.body;
    const validationErrorMessage = bookDetailsValidator(req.body);
    if (validationErrorMessage) {
      return res.status(400).send({
        status: 400,
        message: validationErrorMessage
      });
    }
    /* query database by isbn to check if a book already exist */
    queryBooks({
      isbn: isbn.toString()
    }).then((bookResult) => {
      if (bookResult) {
        return res.status(400).send({
          status: 400,
          message: 'isbn must be unique'
        });
      }
      return db.Books
        .create({
          bookTitle,
          author,
          category,
          isbn,
          stockNumber,
          image,
          summary,
          bookFile: bookFileUrl,
        })
        .then(bookReport => res.status(201).send({
          status: 201,
          message: 'Book has been added to store',
          bookReport
        }))
        .catch(errorMessage => res.status(500).send({
          status: 500,
          message: errorMessage
        }));
    });
  },

  /**
   * @method getAllBooks
   * @desc This method handles get all books request
   * @param { object } req request
   * @param { object} res response
   * @returns { object } response
   */
  getAllBooks(req, res) {
    return db.Books
      .all()
      .then((books) => {
        if (books) {
          return res.status(200).send({
            status: 200,
            message: 'Success!',
            books
          });
        }
        return res.status(404).send({
          status: 404,
          message: 'No books in store',
          books
        });
      })
      .catch(errorMessage => res.status(500).send({
        status: 500,
        message: errorMessage
      }));
  },

  /**
   * @method UpdateBook
   * @desc This method handles edit book request
   * @param { object} req request
   * @param { object} res response
   * @returns { object } response
   */
  updateBook(req, res) {
    if (req.decoded.role === 'user') {
      return res.status(403).send({
        status: 403,
        message: 'Access Denied!'
      });
    }
    const {
      bookTitle,
      author,
      category,
      stockNumber,
      image,
      bookFileUrl,
      summary
    } = req.body;
    const validateBookId = validateIds(req.params.bookId);
    if (validateBookId) {
      return res.status(400).send({
        status: 400,
        message: validateBookId
      });
    }
    const validationErrorMessage = updateBooksValidator(req.body);
    if (validationErrorMessage) {
      return res.status(400).send({
        status: 400,
        message: validationErrorMessage
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
            stockNumber: stockNumber || book.stockNumber,
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
            res.status(500).send({
              status: 500,
              message: errorMessage
            }));
      });
  },
  /**
   * @method deletebooks
   * @desc This method handles delete books request
   * @param { object } req request
   * @param { object} res response
   * @returns { object } response
   */
  deleteBooks(req, res) {
    if (req.decoded.role === 'user') {
      return res.status(403).send({
        status: 403,
        message: 'Access Denied!'
      });
    }
    const validateBookId = validateIds(req.params.bookId);
    if (validateBookId) {
      return res.status(400).send({
        status: 400,
        message: validateBookId
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
            res.status(500).send({
              status: 500,
              message: errorMessage
            }));
      });
  },
};
