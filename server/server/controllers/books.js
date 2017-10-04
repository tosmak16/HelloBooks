import multer from 'multer';

import isEmpty from 'lodash/isEmpty';
import db from '../models/index';


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
    if (req.decoded.role === 'user') {
      return res.status(403).send({ status: 403, message: 'Access Denied!' });
    }

    if (!(req.body.bookTitle && req.body.author && req.body.category &&
      req.body.stocknumber && req.body.isbn)) {
      return res.status(400).send({ status: 400, message: 'please enter the required book details' });
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
      .then(report => res.status(201).send({ status: 201, message: 'Book has been added to store', report }))
      .catch(e => res.status(400).send({ status: 400, message: e.errors[0].message }));
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
      .then(result => res.status(200).send({ status: 200, message: 'Success!', result }))
      .catch(e => res.status(400).send({ status: 400, message: e.errors[0].message.toString() }));
  },

  /**
  * @method UpdateBook
  * @desc This is a method that allows only admin to edit a book
  * @param { object } req
  * @param { object} res
  * @returns { object } response
  */
  updateBook(req, res) {
    filename = req.body.image;
    if (req.decoded.role === 'user') {
      return res.status(403).send({ status: 403, message: 'Access Denied!' });
    }
    return db.Books
      .findById(req.params.bookId)
      .then((result) => {
        if (isEmpty(result)) {
          return res.status(404).send({ status: 404, message: 'Book does not exist' });
        }
        return result
          .update({
            bookTitle: req.body.bookTitle || result.bookTitle,
            author: req.body.author || result.author,
            category: req.body.category || result.category,
            isbn: req.body.isbn || result.isbn,
            stocknumber: req.body.stocknumber || result.stocknumber,
            image: req.body.image || result.image,
            summary: req.body.summary || result.summary
          })
          .then(() => res.status(200).send({ status: 200, message: 'Book has been updated', result })) // Send back the updated book
          .catch(e => res.status(400).send({ status: 400, message: e.errors[0].message.toString() }));
      })
      .catch(e => res.status(400).send({ status: 400, message: e.errors[0].message.toString() }));
  },
  /**
  * @method deletebooks
  * @desc This is a method that allows only admin to delete books
  * @param { object } req
  * @param { object} res
  * @returns { object } response
  */
  deleteBooks(req, res) {
    if (req.decoded.role === 'user') {
      return res.status(403).send({ status: 403, message: 'Access Denied!' });
    }

    return db.Books
      .findById(req.params.bookId)
      .then((result) => {
        if (isEmpty(result)) {
          return res.status(404).send({ status: 404, message: 'Book does not exist' });
        }
        result
          .destroy()
          .then(() => res.status(204).send({ status: 204, message: 'book has been deleted' }))
          .catch(e => res.status(400).send({ status: 400, message: e.errors[0].message.toString() }));
      }).catch(e => res.status(400).send({ status: 400, message: e.errors[0].message.toString() }));
  },
  // / upload image
  uploadImage(req, res) {
    upload(req, res, (err) => {
      if (err) {
        // An error occurred when uploading
        res.status(400).send({ status: 400, message: 'upload Failed' });
      }
      // Everything went fine

      res.status(200).send({ status: 200, message: 'Image uploaded successfully' });
    });
  }

};
