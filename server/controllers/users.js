import jwt from 'jsonwebtoken';
import { SHA256 } from 'crypto-js';
import isEmpty from 'lodash/isEmpty';

import db from '../models/index';

let membershipType;
let print;
let length;

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
      return res.status(400).send({ status: 400, message: 'please enter the required fields' });
    }
    db.Users
      .findOne({
        attributes: ['username'],
        where: {
          username: req.body.username.toLowerCase(),
        },

      }).then((m) => {
        if (m.username) {
          res.status(400).send({ status: 400, message: 'username already exist' });
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
          .then(result => res.status(201).send({ status: 201, message: 'Account created', result, error }))
          .catch((e) => {
            res.status(400).send({ status: 400, message: e.errors[0].message.toString(), e });
          });
      }
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
      return res.status(400).send({ status: 400, message: 'please enter the required fields' });
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
          res.status(404).send({ status: 404, message: 'username and password is incorrect' });
        } else {
          // create a token
          jwt.sign({ id: result.id, user: result.username, role: result.role }, 'encoded', (err, token) => {
            res.status(200).send({ status: 200, message: 'You have successfully logged in', token });
          });
        }
      })
      .catch(error => res.status(404).send({ status: 404, message: 'username and password is incorrect', error }));
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
      return res.status(403).send({ message: 'Access Denied!' });
    }
    return db.Users
      .all()
      .then(result => res.status(200).send({ message: 'Success!', result }))
      .catch(error => res.status(400).send(error));
  },


  /**
  * @method borrowbooks
  * @desc This is a method that performs the action of borrowing books
  * @param { object } req
  * @param { object} res
  * @returns { object } response
  */

  borrowBooks(req, res) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(403).send({ status: 403, message: 'Invalid Identity' });
    }
    if (!(req.params.userId && req.body.bookId)) {
      return res.status(403).send({ status: 403, message: 'Book process not allowed' });
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
          return res.status(403).send({ status: 403, message: 'You have borrowed this book before please return it before you can borrow again!' });
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
                  if (length >= 1) {
                    print = 1;
                  } else {
                    print = 0;
                  }
                } else if (membershipType === 'Silver') {
                  if (length >= 4) {
                    print = 1;
                  } else {
                    print = 0;
                  }
                } else if (membershipType === 'Gold') {
                  if (length >= 7) {
                    print = 1;
                  } else {
                    print = 0;
                  }
                }

                if (print === 1) {
                  return res.status(403).send({ status: 403, message: `Sorry you can not borrow more than ${length} books` });
                }
                return db.Books
                  .findById(req.body.bookId)
                  .then((result) => {
                    if (!result) {
                      return res.status(404).send({ status: 404, message: 'Book Not Found' });
                    }

                    if (result.stocknumber === 0) {
                      return res.status(404).send({ status: 404, message: 'Book Not available in stock' });
                    }

                    result.update({ stocknumber: (result.stocknumber - 1) });

                    return db.borrowbook
                      .create({
                        brdate: Date.now(),
                        retype: false,
                        userId: req.params.userId,
                        bookId: result.id,


                      })
                      .then(ouput => res.status(200).send({ status: 200, message: 'Book added to personal archive. happy reading!', ouput }))
                      .catch(e =>
                        res.status(400).send({
                          status: 400, message: e.errors[0].message.toString(),
                        }));
                  })
                  .catch(e =>
                    res.status(400).send({
                      status: 400, message: e.errors[0].message.toString(),
                    }));
              }).catch(e =>
                res.status(400).send({ status: 400, message: e.errors[0].message.toString(), }));
          }).catch(e =>
            res.status(400).send({ status: 400, message: e.errors[0].message.toString(), }));
      }).catch(e =>
        res.status(400).send({ status: 400, message: e.errors[0].message.toString(), }));
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
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(403).send({ status: 403, message: 'Invalid Identity' });
    }
    if (!(req.params.userId && req.query.returned)) {
      return res.status(403).send({ status: 403, message: 'Book process not allowed' });
    }
    return db.borrowbook
      .findAll({
        where: {
          retype: req.query.returned,
          userId: req.params.userId,
        },
      }).then(result =>
        res.status(200).send({ status: 200, message: 'Borrowed books history retrieved', result }))
      .catch(e => res.status(400).send({ status: 400, message: e.errors[0].message.toString(), }));
  },

  /**
  * @method returnBooks
  * @desc This is a method that peroforms the action of returning borrowed books
  * @param { object } req
  * @param { object} res
  * @returns { object } response
  */

  returnBooks(req, res) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(403).send({ status: 403, message: 'Invalid Identity' });
    }
    if (!(req.params.userId && req.body.bookId)) {
      return res.status(403).send({ status: 403, message: 'Book process not allowed' });
    }
    return db.borrowbook
      .findById(req.body.Id)
      .then((ouput) => {
        if (!ouput) {
          return res.status(404).send({ status: 404, message: 'Record Not Found' });
        }
        if (ouput.retype === true) {
          return res.status(403).send({ status: 403, message: 'This book has been returned before' });
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
              }).catch(e => res.status(400).send({
                status:
                400,
                message: e.errors[0].message.toString(),
              }));
            res.status(200).send({
              status: 200, message: 'book has been returned successfully'
            });
          })
          .catch(e => res.status(400).send({
            status: 400, message: e.errors[0].message.toString(),
          }));
      })
      .catch(e => res.status(400).send({
        status: 400, message: e.errors[0].message.toString(),
      }));
  },

  /**
* @method getBorrowedbooks
* @desc This is a method that performs the action of listing 
* @desc all borrowed boks by a user
* @param { object } req
* @param { object} res
* @returns { object } response
*/

  getBorrowedBooks(req, res) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(403).send({ status: 403, message: 'Invalid Identity' });
    }
    if (!(req.params.userId)) {
      return res.status(403).send({ status: 403, message: 'Book process not allowed' });
    }
    return db.borrowbook
      .findAll({
        where: {
          userId: req.params.userId,
        },
      }).then(result =>
        res.status(200).send({ status: 200, message: 'Borrowed books history retrieved', result }))
      .catch(e => res.status(400).send({ status: 400, message: e.errors[0].message.toString(), }));
  },

  /**
   * @method getUserDetails
   * @description this method get some of the user details when requested
   * @param {any} req 
   * @param {any} res 
   * @returns 
   */

  getUserDetails(req, res) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(403).send({ status: 403, message: 'Invalid Identity' });
    }
    return db.Users
      .findAll({
        attributes: ['firstName', 'lastName', 'email', 'mobileNumber', 'membershipType', 'profileImage'],
        where: {
          id: req.params.userId,
        },
      }).then(result => res.status(200).send({ status: 200, message: 'Success!', result }))
      .catch(e => res.status(400).send({ status: 400, message: e.errors[0].message.toString(), }));
  },

  /**
   * @method updateUser
   * @description this method edit user details
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   */

  updateUser(req, res) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(403).send({ status: 403, message: 'Invalid Identity' });
    }
    return db.Users
      .findById(req.params.userId)
      .then((result) => {
        if (isEmpty(result)) {
          return res.status(404).send({ status: 404, message: 'User does not exist' });
        }
        return result
          .update({
            firstName: req.body.firstName || result.firstName,
            lastName: req.body.lastName || result.lastName,
            mobileNumber: req.body.mobileNumber || result.mobileNumber,
            membershipType: req.body.membershipType || result.membershipType,
            profileImage: req.body.profileImage || result.profileImage,
          })
          .then(() => res.status(200).send({ status: 200, message: 'Details has been updated', result }))
          .catch(error => res.status(400).send({ status: 400, message: error.errors[0].message }));
      })
      .catch(error => res.status(400).send({ status: 400, message: error.errors[0].message }));
  },

  /**
   * @method changePassword
   * @description this method changes user password 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   */


  changePassword(req, res) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(403).send({ status: 403, message: 'Invalid Identity' });
    }
    return db.Users
      .findOne({
        where: {
          id: req.params.userId,
          password: SHA256(req.body.oldPassword).toString()
        },
      }).then((result) => {
        if (isEmpty(result)) {
          return res.status(404).send({ status: 404, message: 'Current password is wrong' });
        }

        return result
          .update({
            password: SHA256(req.body.newPassword).toString() || result.password,
          })
          .then(() => res.status(200).send({ status: 200, message: 'Password has been changed', result }))
          .catch(error => res.status(400).send({ status: 400, message: error.errors[0].message }));
      })
      .catch(error => res.status(400).send({ status: 400, message: error.errors[0].message }));
  },
};
