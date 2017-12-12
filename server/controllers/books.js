import isEmpty from 'lodash/isEmpty';
import db from '../models/index';
import { validateIds } from '../helperFunctions/validator';
import { bookDetailsValidator } from '../helperFunctions/bookDetailsValidator';
import { queryBooks } from '../helperFunctions/databaseQuery';
import { updateBooksValidator } from '../helperFunctions/updateBooksValidator';

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
        message: 'Access Denied!'
      });
    }
    const { bookTitle, author, category, isbn, stockNumber,
      image, bookFileUrl, summary } = req.body;
    bookDetailsValidator(req.body)
      .then((validationErrorMessage) => {
        if (validationErrorMessage) {
          return res.status(400).send({
            message: validationErrorMessage
          });
        }
        /* query database by isbn to check if a book already exist */
        queryBooks({
          isbn: isbn.toString()
        }).then((bookResult) => {
          if (bookResult) {
            return res.status(400).send({
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
              message: 'Book has been added to store',
              bookReport
            }))
            .catch(errorMessage => res.status(500).send({
              message: errorMessage
            }));
        });
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
            message: 'Success!',
            books
          });
        }
        return res.status(404).send({
          message: 'No books in store',
          books
        });
      })
      .catch(errorMessage => res.status(500).send({
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
    validateIds(req.params.bookId)
      .then((validateBookId) => {
        if (validateBookId) {
          return res.status(400).send({
            message: validateBookId
          });
        }
        updateBooksValidator(req.body)
          .then((validationResponse) => {
            if (validationResponse) {
              return res.status(validationResponse.status).send({
                status: validationResponse.status,
                message: validationResponse.message
              });
            }
            return db.Books
              .findById(req.params.bookId)
              .then((book) => {
                if (isEmpty(book)) {
                  return res.status(404).send({
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
                    message: 'Book has been updated',
                    book
                  }))
                  .catch(errorMessage =>
                    res.status(500).send({
                      message: errorMessage
                    }));
              });
          });
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
        message: 'Access Denied!'
      });
    }
    validateIds(req.params.bookId)
      .then((validateBookId) => {
        if (validateBookId) {
          return res.status(400).send({
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
                message: 'book has been deleted'
              }))
              .catch(errorMessage =>
                res.status(500).send({
                  message: errorMessage
                }));
          });
      });
  },
};
