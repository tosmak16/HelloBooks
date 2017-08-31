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
      return res.status(400).send('please enter the required fields');
    }
    db.Users
      .findOne({
        attributes: ['username'],
        where: {
          username: req.body.username.toLowerCase(),
        },

      }).then((m) => {
        if (m.username) {
          res.status(400).send('username already exist');
        }
      }).catch((error) => {
        db.Users.create({
          username: req.body.username.toLowerCase(),
          password: SHA256(req.body.password).toString(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email.toLowerCase(),
          membershipType: req.body.membershipType,
          role: req.body.role ? 'admin' : 'user',


        })
          .then(result => res.status(201).send({ message: 'Account created', result, error }))
          .catch((e) => {
            res.status(400).send(e.errors[0].message);
          });
      },
    );
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
      return res.status(400).send('please enter the required fields');
    }
    db.Users
      .findOne({
        attributes: ['username', 'id', 'role'],
        where: {
          username: req.body.username.toLowerCase(),
          password: SHA256(req.body.password).toString(),
        },

      })
      .then((result) => {
        if (result.length === 0) {
          res.status(404).send('username and password is incorrect');
        } else {
          // create a token
          jwt.sign({ id: result.id, user: result.username, role: result.role }, 'encoded', (err, token) => {
            res.status(200).send({ message: 'You have successfully logged in', token });
          });
        }
      })
      .catch(error => res.status(404).send('username and password is incorrect'));
  },
  /**
  * @method list
  * @desc This is a method used for displaying list of users
  * @param { object } req
  * @param { object} res
  * @returns { object } response
  */
  list(req, res) {
    if (req.decoded.role === 'user') {
      return res.status(403).send('Access Denied!');
    }
    return db.Users
      .all()
      .then(result => res.status(200).send({ message: 'Success!', result }))
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
    if (req.params.userId != req.decoded.id) {
      return res.status(403).send('Invalid Identity');
    }
    if (!(req.params.userId && req.body.bookId)) {
      return res.status(403).send('Book process not allowed');
    }
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
          return res.status(403).send('You have borrowed this book before please return it before you can borrow again!');
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
                  if (length !== 1) {
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
                  return res.status(403).send(`Sorry you can not borrow more than ${length} books`);
                }
                return db.Books
                  .findById(req.body.bookId)
                  .then((result) => {
                    if (!result) {
                      return res.status(404).send('Book Not Found');
                    }

                    if (result.stocknumber === 0) {
                      return res.status(404).send('Book Not available in stock');
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
    if (req.params.userId != req.decoded.id) {
      return res.status(403).send('Invalid Identity');
    }
    if (!(req.params.userId && req.query.returned)) {
      return res.status(403).send('Book process not allowed');
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
  },

  /**
  * @method returnBooks
  * @desc This is a method that peroforms the action of returning borrowed books
  * @param { object } req
  * @param { object} res
  * @returns { object } response
  */
  returnBooks(req, res) {
    if (req.params.userId != req.decoded.id) {
      return res.status(403).send('Invalid Identity');
    }
    if (!(req.params.userId && req.body.bookId)) {
      return res.status(403).send('Book process not allowed');
    }
    return db.borrowbook
      .findById(req.body.Id)
      .then((ouput) => {
        if (!ouput) {
          return res.status(404).send('Record Not Found');
        }
        if (ouput.retype === true) {
          return res.status(403).send('This book has been returned before');
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
  },


};
