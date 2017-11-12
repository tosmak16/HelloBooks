import jwt from 'jsonwebtoken';
import {
  SHA256
} from 'crypto-js';
import isEmpty from 'lodash/isEmpty';
import db from '../models/index';

export default {
  /**
   * @method signup
   * @desc this method is used for user registration
   * @param { object } req
   * @param { object} res
   * @returns { object } response
   */
  signup(req, res) {
    /* checks if required details are inputed if not sends status 400 message */
    if (!(req.body.password && req.body.username && req.body.email &&
      req.body.firstName && req.body.lastName && req.body.membershipType)) {
      return res.status(400).send({
        status: 400,
        message: 'please enter the required fields'
      });
    }
    db.Users
      .findOne({
        attributes: ['username'],
        where: {
          username: req.body.username.toLowerCase(),
        },

      }).then((user) => {
        if (user.username) {
          res.status(400).send({
            status: 400,
            message: 'username already exist'
          });
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
          .then(storedDetails => res.status(201).send({
            status: 201,
            message: 'Account created',
            storedDetails,
            error
          }))
          .catch((errorMessage) => {
            res.status(400).send({
              status: 400,
              message: errorMessage.errors[0].message.toString(),
              errorMessage
            });
          });
      });
  },
  /**
   * @method signin
   * @desc this method ensures registered users can login
   * @param { object } req
   * @param { object} res
   * @returns { object } response
   */
  signin(req, res) {
    if (!(req.body.password && req.body.username)) {
      return res.status(400).send({
        status: 400,
        message: 'please enter the required fields'
      });
    }
    db.Users
      .findOne({
        attributes: ['username', 'id', 'role'],
        where: {
          username: req.body.username.toLowerCase(),
          password: SHA256(req.body.password).toString(),
        },

      })
      .then((user) => {
        if (user.length === 0) {
          res.status(404).send({
            status: 404,
            message: 'username and password is incorrect'
          });
        } else {
          const {
            id,
            username,
            role
          } = user;
          /* creates a token */
          jwt.sign({
            id,
            user: username,
            role
          }, process.env.SECRET, (err, token) => {
            res.status(200).send({
              status: 200,
              message: 'You have successfully logged in',
              token,
              user
            });
          });
        }
      })
      .catch(error => res.status(404).send({
        status: 404,
        message: 'username and password is incorrect',
        error
      }));
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
      return res.status(403).send({
        message: 'Access Denied!'
      });
    }
    return db.Users
      .all()
      .then(users => res.status(200).send({
        message: 'Success!',
        users
      }))
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
    const {
      bookId
    } = req.body;
    const {
      userId
    } = req.params;
    if (userId.toString() !== req.decoded.id.toString()) {
      return res.status(401).send({
        status: 401,
        message: 'Invalid Identity'
      });
    }
    if (!(userId && bookId)) {
      return res.status(403).send({
        status: 403,
        message: 'Book process not allowed'
      });
    }
    db.borrowbook
      .findAll({
        attributes: ['userId', 'bookId'],
        where: {
          bookId,
          userId,
          returnType: false,
        },

      })
      .then((user) => {
        if ((user.length !== 0)) {
          return res.status(403).send({
            status: 403,
            message: 'You have borrowed this book before please return it before you can borrow again!'
          });
        }

        db.borrowbook
          .findAll({
            attributes: ['userId'],
            where: {
              userId,
              returnType: false,
            },

          })
          .then((response) => {
            const {
              length
            } = response;

            db.Users
              .findOne({
                attributes: ['membershipType'],
                where: {
                  id: req.params.userId,
                },

              }).then((userMembershipType) => {
                let checkBorrowingLimit = 0;
                const {
                  membershipType
                } = userMembershipType;
                if (membershipType === 'Basic') {
                  if (length >= 1) {
                    checkBorrowingLimit = 1;
                  } else {
                    checkBorrowingLimit = 0;
                  }
                } else if (membershipType === 'Silver') {
                  if (length >= 4) {
                    checkBorrowingLimit = 1;
                  } else {
                    checkBorrowingLimit = 0;
                  }
                } else if (membershipType === 'Gold') {
                  if (length >= 7) {
                    checkBorrowingLimit = 1;
                  } else {
                    checkBorrowingLimit = 0;
                  }
                }

                if (checkBorrowingLimit === 1) {
                  return res.status(403).send({
                    status: 403,
                    message: `Sorry you can not borrow more than ${length} books`
                  });
                }
                return db.Books
                  .findById(bookId)
                  .then((book) => {
                    if (!book) {
                      return res.status(404).send({
                        status: 404,
                        message: 'Book Not Found'
                      });
                    }

                    if (book.stocknumber === 0) {
                      return res.status(404).send({
                        status: 404,
                        message: 'Book Not available in stock'
                      });
                    }

                    book.update({
                      stocknumber: (book.stocknumber - 1)
                    });

                    return db.borrowbook
                      .create({
                        borrowDate: Date.now(),
                        returnType: false,
                        userId,
                        bookId: book.id,
                      })
                      .then(borrowBookResponse => res.status(200).send({
                        status: 200,
                        message: 'Book added to personal archive. happy reading!',
                        borrowBookResponse
                      }))
                      .catch(errorMessage =>
                        res.status(400).send({
                          status: 400,
                          message: errorMessage.errors[0].message.toString(),
                        }));
                  })
                  .catch(errorMessage =>
                    res.status(400).send({
                      status: 400,
                      message: errorMessage.errors[0].message.toString(),
                    }));
              }).catch(errorMessage =>
                res.status(400).send({
                  status: 400,
                  message: errorMessage.errors[0].message.toString()
                }));
          }).catch(errorMessage =>
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
  /**
   * @method getUnreturnedbooks
   * @desc This is a method that performs the action of listing
   * @desc all borrowed books that are yet to be returned
   * @param { object } req
   * @param { object} res
   * @returns { object } response
   */
  getUnreturnedBooks(req, res) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(401).send({
        status: 401,
        message: 'Invalid Identity'
      });
    }
    if (!(req.params.userId && req.query.returned)) {
      return res.status(403).send({
        status: 403,
        message: 'Book process not allowed'
      });
    }
    return db.borrowbook
      .findAll({
        where: {
          returnType: req.query.returned,
          userId: req.params.userId,
        },
      }).then(unreturnedBook =>
        res.status(200).send({
          status: 200,
          message: 'Borrowed books history retrieved',
          unreturnedBook
        }))
      .catch(errorMessage => res.status(400).send({
        status: 400,
        message: errorMessage.errors[0].message.toString()
      }));
  },

  /**
   * @method returnBooks
   * @desc This method handles return borrowed books request
   * @param { object } req
   * @param { object} res
   * @returns { object } response
   */
  returnBooks(req, res) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(401).send({
        status: 401,
        message: 'Invalid Identity'
      });
    }
    if (!(req.params.userId && req.body.bookId)) {
      return res.status(403).send({
        status: 403,
        message: 'Book process not allowed'
      });
    }
    return db.borrowbook
      .findById(req.body.Id)
      .then((borrowbook) => {
        if (!borrowbook) {
          return res.status(404).send({
            status: 404,
            message: 'Record Not Found'
          });
        }
        if (borrowbook.returnType === true) {
          return res.status(403).send({
            status: 403,
            message: 'This book has been returned before'
          });
        }

        return borrowbook
          .update({
            returnType: true,
            returnDate: Date.now(),

          })
          .then((returnedBook) => {
            db.Books
              .findById(returnedBook.bookId)
              .then((book) => {
                book
                  .update({
                    stocknumber: (book.stocknumber + 1),
                  });
              }).catch(errorMessage => res.status(400).send({
                status: 400,
                message: errorMessage.errors[0].message.toString(),
              }));
            res.status(200).send({
              status: 200,
              message: 'book has been returned successfully',
              returnedBook,
            });
          })
          .catch(errorMessage => res.status(400).send({
            status: 400,
            message: errorMessage.errors[0].message.toString(),
          }));
      })
      .catch(errorMessage => res.status(400).send({
        status: 400,
        message: errorMessage.errors[0].message.toString(),
      }));
  },

  /**
   * @method getBorrowedbooks
   * @desc This method handles borrowed books history request
   * @param { object } req
   * @param { object} res
   * @returns { object } response
   */
  getBorrowedBooks(req, res) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(401).send({
        status: 401,
        message: 'Invalid Identity'
      });
    }
    return db.borrowbook
      .findAll({
        where: {
          userId: req.params.userId,
        },
      }).then(borrowBooks =>
        res.status(200).send({
          status: 200,
          message: 'Borrowed books history retrieved',
          borrowBooks
        }))
      .catch(errorMessage => res.status(400).send({
        status: 400,
        message: errorMessage.errors[0].message.toString()
      }));
  },

  /**
   * @method getUserDetails
   * @description this method handles get user details request
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  getUserDetails(req, res) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(401).send({
        status: 401,
        message: 'Invalid Identity'
      });
    }
    return db.Users
      .findAll({
        attributes: ['firstName', 'lastName', 'email', 'mobileNumber', 'membershipType', 'profileImage'],
        where: {
          id: req.params.userId,
        },
      }).then(userDetails => res.status(200).send({
        status: 200,
        message: 'Success!',
        userDetails
      }))
      .catch(errorMessage => res.status(400).send({
        status: 400,
        message: errorMessage.errors[0].message.toString()
      }));
  },

  /**
   * @method updateUser
   * @description this method handles edit user details request
   * @param {object} req
   * @param {object} res
   * @returns { object } response
   */
  updateUser(req, res) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(401).send({
        status: 401,
        message: 'Invalid Identity'
      });
    }
    return db.Users
      .findById(req.params.userId)
      .then((user) => {
        if (isEmpty(user)) {
          return res.status(401).send({
            status: 401,
            message: 'User does not exist'
          });
        }
        return user
          .update({
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            mobileNumber: req.body.mobileNumber || user.mobileNumber,
            membershipType: req.body.membershipType || user.membershipType,
            profileImage: req.body.profileImage || user.profileImage,
          })
          .then(() => res.status(200).send({
            status: 200,
            message: 'Details has been updated',
            user
          }))
          .catch(errorMessage => res.status(400).send({
            status: 400,
            message: errorMessage.errors[0].message
          }));
      })
      .catch(errorMessage => res.status(400).send({
        status: 400,
        message: errorMessage.errors[0].message
      }));
  },

  /**
   * @method changePassword
   * @description this method handles changes password request
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  changePassword(req, res) {
    if (req.params.userId.toString() !== req.decoded.id.toString()) {
      return res.status(401).send({
        status: 401,
        message: 'Invalid Identity'
      });
    }
    return db.Users
      .findOne({
        where: {
          id: req.params.userId,
          password: SHA256(req.body.oldPassword).toString(),
        },
      }).then((user) => {
        if (isEmpty(user)) {
          return res.status(406).send({
            status: 406,
            message: 'Current password is wrong'
          });
        }

        return user
          .update({
            password: SHA256(req.body.newPassword).toString()
          })
          .then(() => res.status(200).send({
            status: 200,
            message: 'Password has been changed',
            user
          }))
          .catch(errorMessage => res.status(400).send({
            status: 400,
            message: errorMessage.errors[0].message
          }));
      })
      .catch(errorMessage => res.status(400).send({
        status: 400,
        message: errorMessage.errors[0].message
      }));
  },
};
