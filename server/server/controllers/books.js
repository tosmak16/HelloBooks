import multer from 'multer';

import isEmpty from 'lodash/isEmpty';
import db from '../models/index';

// const upload = multer({ dest: 'client/public/' });

let filename = '';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './client/public/img/');
  },
  filename(req, file, cb) {
    cb(null, filename);
  }
});

export const upload = multer({
  storage
}).single('file');


export default {
  /**
* @method addbook
* @desc This is a method that allows only admin to add books
* @param { object } req
* @param { object} res
* @returns { object } response
*/
  addBook(req, res) {
    filename = req.body.image;
    if (req.decoded.user === 'user') {
      return res.status(403).send('Access Denied!');
    }

    if (!(req.body.bookTitle && req.body.author && req.body.category &&
      req.body.stocknumber && req.body.isbn)) {
      return res.status(400).send('please enter the required book details');
    }

    return db.Books
      .create({
        bookTitle: req.body.bookTitle,
        author: req.body.author,
        category: req.body.category,
        isbn: req.body.isbn,
        stocknumber: req.body.stocknumber,
        image: req.body.image,
        summary: req.body.summary
      })
      .then(report => res.status(201).send({ message: 'Book has been added to store', report }))
      .catch(error => res.status(400).send('error! check the book information'));
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
      .then(result => res.status(200).send({ message: 'Success!', result }))
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
    if (req.decoded.role === 'user') {
      return res.status(403).send('Access Denied!');
    }
    return db.Books
      .findById(req.params.bookId)
      .then((result) => {
        if (isEmpty(result)) {
          return res.status(404).send('Book does not exist');
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
  },
  /**
  * @method deletebooks
  * @desc This is a method that allows only admin to delete books
  * @param { object } req
  * @param { object} res
  * @returns { object } response
  */
  deleteBooks(req, res) {
    if (req.decoded.role !== 'admin') {
      return res.status(403).send('Access Denied!');
    }

    return db.Books
      .findById(req.params.bookId)
      .then((result) => {
        if (isEmpty(result)) {
          return res.status(404).send('Book does not exist');
        }
        result
          .destroy()
          .then(() => res.status(204).send(''))
          .catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send(error));
  },
  // / upload image
  uploadImage(req, res) {
    upload(req, res, (err) => {
      if (err) {
        // An error occurred when uploading
        res.status(400).send('Invalid input field');
      }
      // Everything went fine

      res.status(200).send({ message: 'Image uploaded successfully' });
    });
  }

};
