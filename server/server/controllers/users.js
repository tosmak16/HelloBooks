import jwt from 'jsonwebtoken';
import { SHA256 } from 'crypto-js';
import User from '../models/users';
import Book from '../models/books';
import borrowbook from '../models/borrowbook';
import db from '../models/index';

export default {
  signup(req, res) {
    if (!(req.body.password && req.body.username && req.body.email && req.body.firstName && req.body.lastName && req.body.membershipType)) {
      return res.status(400).send(' please enter the required fields');
    }
    db.Users.create({
      username: req.body.username.toLowerCase(),
      password: SHA256(req.body.password).toString(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowerCase(),
      membershipType: req.body.membershipType,
      role: 'user',

    })
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  },

  signin(req, res) {
    if (!(req.body.password && req.body.username)) {
      return res.status(400).send(' please enter the required fields');
    }
    db.Users
      .findAll({
        attributes: ['username'],
        where: {
          username: req.body.username.toLowerCase(),
          password: SHA256(req.body.password).toString(),
        },

      })
      .then((result) => {
        if (result.length === 0) {
          res.status(400).send();
        } else {
          // create a token
          jwt.sign(req.body.username, 'encoded', (err, token) => {
            res.status(201).send({ result, token });
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return db.Users
      .all()
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },

  borrowBooks(req, res) {
    db.Users
      .findById(req.params.userId)
      .then((report) => {
        if (report.username !== req.decoded) {
          return res.status(404).send({
            message: 'Invalid Identity',
          });
        }
        return db.Books
          .findById(req.body.bookId)
          .then((result) => {
            if (!result) {
              return res.status(404).send({
                message: 'book Not Found',
              });
            }

            if (result.stocknumber === 0) {
              return res.status(404).send({
                message: 'Book Not available in stock',
              });
            }

            result.update({ stocknumber: (result.stocknumber - 1) });

            return db.borrowbook
              .create({
                brdate: Date.now(),
                retype: false,
                userId: req.params.userId,
                bookId: result.id,


              })
              .then(ouput => res.status(200).send(ouput))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send(error));
  },

  getUnreturnedBooks(req, res) {
    db.Users
      .findById(req.params.userId)
      .then((report) => {
        if (report.username !== req.decoded) {
          return res.status(404).send({
            message: 'Invalid Identity',
          });
        }
        return db.borrowbook
          .findAll({
            where: {
              retype: req.query.returned,
              userId: req.params.userId,
            },
          }).then(result =>
            res.status(200).send(result))
          .catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send(error));
  },

  returnBooks(req, res) {
    db.Users
      .findById(req.params.userId)
      .then((report) => {
        if (report.username !== req.decoded) {
          return res.status(404).send({
            message: 'Invalid Identity',
          });
        }
        return db.borrowbook
          .findById(req.body.Id)
          .then((ouput) => {
            if (!ouput) {
              return res.status(404).send({
                message: 'Record Not Found',
              });
            }
            if (ouput.retype === true) {
              return res.status(404).send({
                message: 'This book has been returned before',
              });
            }

            return ouput
              .update({
                retype: true,
                rdate: Date.now(),

              })
              .then((result) => {
                db.Books
                  .findById(result.bookId)
                  .then((re) => {
                    re
                      .update({
                        stocknumber: (re.stocknumber + 1),
                      });
                  }).catch(error => res.status(400).send(error));
                res.status(200).send(result);
              })
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send(error));
  },

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
