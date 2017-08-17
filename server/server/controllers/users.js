import jwt from 'jsonwebtoken';
import { SHA256 } from 'crypto-js';
import db from '../models/index';

let membershipType;
let print;
let length;

/**
  * @param { object } req
  * @param { object} res
  * @returns { object } response
  */
export default {
  /**
  * @method signup
  * @desc it's a method used for user registration
  * @param { object } req
  * @param { object} res
  * @returns { object } response
  */
  signup(req, res) {
    if (!(req.body.password && req.body.username && req.body.email &&
      req.body.firstName && req.body.lastName && req.body.membershipType)) {
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
      .then(result => res.status(201).send({ message: 'Account created', result }))
      .catch(error => res.status(400).send(error));
  },
  /**
* @method signin
* @desc it's a method that ensure registered users can login
* @param { object } req
* @param { object} res
* @returns { object } response
*/

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
            res.status(200).send({ message: 'You have successfully logged in', result, token });
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },
  /**
  * @method list
  * @desc This is a method used for displaying list of users
  * @param { object } req
  * @param { object} res
  * @returns { object } response
  */
  list(req, res) {
    return db.Users
      .all()
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },
  /**
* @method borrowbooks
* @desc This is a method that peroforms the action of borrowing books
* @param { object } req
* @param { object} res
* @returns { object } response
*/

  borrowBooks(req, res) {
    db.borrowbook
      .findAll({
        attributes: ['userId', 'bookId'],
        where: {
          bookId: req.body.bookId,
          userId: req.params.userId,
          retype: false,
        },

      })
      .then((output) => {
        if ((output.length !== 0)) {
          return res.status(404).send({
            message: 'You have borrowed this book before',
          });
        }

        db.borrowbook
          .findAll({
            attributes: ['userId'],
            where: {
              userId: req.params.userId,
              retype: false,
            },

          })
          .then((rep) => {
            length = rep.length;

            db.Users
              .findOne({
                attributes: ['membershipType'],
                where: {
                  id: req.params.userId,
                },

              }).then((out) => {
                print = 0;
                membershipType = out.membershipType;
                if (membershipType === 'Basic') {
                  if (length !== 3) {
                    print = 1;
                  } else {
                    print = 0;
                  }
                } else if (membershipType === 'Silver') {
                  if (length !== 4) {
                    print = 1;
                  } else {
                    print = 0;
                  }
                } else if (membershipType === 'Gold') {
                  if (length !== 10) {
                    print = 1;
                  } else {
                    print = 0;
                  }
                }

                if (print === 0) {
                  return res.status(400).send({
                    message: `Sorry you can not borrow more than ${length} books`,
                  });
                }
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
                          .then(ouput => res.status(200).send({ message: 'Book added to personal archive. happy reading!', ouput }))
                          .catch(error => res.status(400).send(error));
                      })
                      .catch(error => res.status(400).send(error));
                  }).catch(error => res.status(400).send(error));
              }).catch(error => res.status(400).send(error));
          }).catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send(error));
  },

  /**
* @method getUnreturnedbooks
* @desc This is a method that peroforms the action of listing 
* @desc all borrowed books that are yet to be returned
* @param { object } req
* @param { object} res
* @returns { object } response
*/
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
            res.status(200).send({ message: 'Borrowed books history retrieved', result }))
          .catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send(error));
  },

  /**
* @method returnBooks
* @desc This is a method that peroforms the action of returning borrowed books
* @param { object } req
* @param { object} res
* @returns { object } response
*/
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
                res.status(200).send({ message: 'book has been returned successfully' });
              })
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }).catch(error => res.status(400).send(error));
  },


};
