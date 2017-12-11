import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/index';
import { validateIds, checkUserInput } from '../helperFunctions/validator';
import { userDetailsValidator } from '../helperFunctions/userDetailsValidator';
import {
  queryUsers,
  checkQueryValidity,
  queryBorrowedBook
} from '../helperFunctions/databaseQuery';
import {
  checkBorrowLimit
} from '../helperFunctions/checkBorrowLimit';
import {
  checkBookStockNumber
} from '../helperFunctions/checkBookStockNumber';
import {
  handleReturnBooks
} from '../helperFunctions/handleReturnBooks';
import {
  handleUpdateUser
} from '../helperFunctions/handleUpdateUser';
import {
  handlePasswordChange
} from '../helperFunctions/handlePasswordChange';

export default {
  /**
   * @method signup
   * @desc this method is used for user registration
   * @param { object } req request
   * @param { object} res response
   * @returns { object } response
   */
  signup(req, res) {
    /* checks if required details are inputed if not sends status 400 message */
    userDetailsValidator(req.body)
      .then((validationError) => {
        if (validationError) {
          return res.status(400).send({
            status: 400,
            message: validationError
          });
        }
        const {
          username,
          password,
          firstName,
          lastName,
          email,
          membershipType
        } = req.body;
        /* query database by username to check if a user already exist */
        queryUsers({
          username: username.toLowerCase().toString()
        }).then((userResult) => {
          if (userResult) {
            return res.status(409).send({
              status: 409,
              message: 'username already exist'
            });
          }
          /* query database by email to check if a email already exist */
          queryUsers({
            email: email.toLowerCase().toString()
          }).then((userEmailResult) => {
            /* if email  already exist */
            if (userEmailResult) {
              return res.status(409).send({
                status: 409,
                message: 'email already exist'
              });
            }
            /* if email does not exist create user account */
            db.Users.create({
              username: username.toLowerCase(),
              password,
              firstName,
              lastName,
              email: email.toLowerCase(),
              membershipType,
              role: process.env.NODE_ENV === 'test' && req.body.role ? 'admin' : 'user'
            })
              .then(storedDetails => res.status(201).send({
                status: 201,
                message: 'Account created',
                storedDetails,
              }))
              .catch((errorMessage) => {
                res.status(500).send({
                  status: 500,
                  message: 'server error',
                  errorMessage
                });
              });
          });
        });
      });
  },
  /**
   * @method signin
   * @desc this method ensures registered users can login
   * @param { object } req request
   * @param { object} res response
   * @returns { object } response
   */
  signin(req, res) {
    /* check user's username and password if it is defined */
    checkUserInput(req.body)
      .then((checkUserDetailsResponse) => {
        if ((checkUserDetailsResponse)) {
          return res.status(400).send({
            status: 400,
            message: checkUserDetailsResponse
          });
        }
        queryUsers({
          username: req.body.username.toLowerCase(),
        }).then((user) => {
          if (!user
            ||
            !bcrypt.compareSync(req.body.password,
              user.dataValues.password)) {
            return res.status(400).send({
              status: 400,
              message: 'please enter valid details'
            });
          }
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
        })
          .catch(error => res.status(500).send({
            status: 500,
            message: 'server error',
            error
          }));
      });
  },
  /**
   * @method list
   * @desc This is a method used for displaying list of users
   * @param { object } req request
   * @param { object} res response
   * @returns { object } response
   */
  getUserList(req, res) {
    if (req.decoded.role === 'user') {
      return res.status(403).send({
        message: 'Access Denied!'
      });
    }
    return db.Users
      .all()
      .then((users) => {
        if (users) {
          return res.status(200).send({
            message: 'Success!',
            users
          });
        }
        return res.status(404).send({
          message: 'No users registerd yet',
        });
      })
      .catch(error => res.status(500).send(error));
  },
  /**
   * @method borrowbooks
   * @desc This is a method that handles the action of borrowing books
   * @param { object } req request
   * @param { object} res response
   * @returns { object } response
   */
  borrowBooks(req, res) {
    const {
      bookId
    } = req.body;
    const {
      userId
    } = req.params;
    /* validates book Id */
    validateIds(bookId)
      .then((bookIdValidator) => {
        if (bookIdValidator) {
          return res.status(400).send({
            status: 400,
            message: bookIdValidator
          });
        }
        /* checks if user has borrowed a book before */
        queryBorrowedBook({
          bookId,
          userId,
          returnType: false,
        }, 'findAll')
          .then((user) => {
            if ((user.length !== 0)) {
              return res.status(403).send({
                status: 403,
                message: 'You have borrowed this book before !'
              });
            }
            /* checks the number of books a user has borrowed and have not returned */
            queryBorrowedBook({
              userId,
              returnType: false,
            }, 'findAll')
              .then((response) => {
                const {
                  length
                } = response;
                /* checks user borrow limit by membership level */
                checkBorrowLimit({
                  id: req.params.userId,
                }, ['membershipType'], length)
                  .then((responseMessage) => {
                    if (responseMessage.status >= 400) {
                      return res.status(responseMessage.status).send({
                        status: responseMessage.status,
                        message: responseMessage.message
                      });
                    }
                    /* checks if a book is still available in stock */
                    checkBookStockNumber(bookId)
                      .then((bookStatus) => {
                        if (bookStatus.status >= 400) {
                          return res.status(bookStatus.status).send({
                            status: bookStatus.status,
                            message: bookStatus.message
                          });
                        }
                        /* create a new borred book resource */
                        return db.BorrowedBooks
                          .create({
                            borrowDate: Date.now(),
                            returnType: false,
                            userId,
                            bookId,
                          })
                          .then(borrowBookResponse => res.status(200).send({
                            status: 200,
                            message: 'Book added to personal archive. happy reading!',
                            borrowBookResponse
                          }))
                          .catch(errorMessage =>
                            res.status(500).send({
                              status: 500,
                              message: errorMessage
                            }));
                      });
                  });
              });
          }).catch(errorMessage =>
            res.status(400).send({
              status: 400,
              message: errorMessage.errors[0].message.toString()
            }));
      });
  },
  /**
   * @method getUnreturnedbooks
   * @desc This is a method that performs the action of listing
   * @desc all borrowed books that are yet to be returned
   * @param { object } req request
   * @param { object} res response
   * @returns { object } response
   */
  getUnreturnedBooks(req, res) {
    const returnedQueryIsBoolean = checkQueryValidity(req.query.returned);
    if (returnedQueryIsBoolean) {
      return res.status(400).send({
        message: returnedQueryIsBoolean
      });
    }
    return db.BorrowedBooks
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
   * @param { object } req request
   * @param { object} res response
   * @returns { object } response
   */
  returnBooks(req, res) {
    handleReturnBooks(req.body.Id)
      .then(handleReturnBooksResponse =>
        res.status(handleReturnBooksResponse.status).send({
          status: handleReturnBooksResponse.status,
          message: handleReturnBooksResponse.message
        })
      )
      .catch(errorMessage => res.status(500).send({
        status: 500,
        message: errorMessage.errors[0].message.toString(),
      }));
  },

  /**
   * @method getBorrowedbooks
   * @desc This method handles borrowed books history request
   * @param { object } req request
   * @param { object} res response
   * @returns { object } response
   */
  getBorrowedBooks(req, res) {
    return db.BorrowedBooks
      .findAll({
        where: {
          userId: req.params.userId,
        },
      }).then((borrowBooks) => {
        if (borrowBooks) {
          return res.status(200).send({
            status: 200,
            message: 'Borrowed books history retrieved',
            borrowBooks
          });
        }
        return res.status(400).send({
          status: 400,
          message: 'you have not borrowed any book',
        });
      })
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
    return db.Users
      .findAll({
        attributes: [
          'firstName',
          'lastName',
          'email',
          'mobileNumber',
          'membershipType',
          'profileImage'
        ],
        where: {
          id: req.params.userId,
        },
      }).then((userDetails) => {
        if (userDetails) {
          return res.status(200).send({
            status: 200,
            message: 'Success!',
            userDetails
          });
        }
        return res.status(400).send({
          status: 400,
          message: errorMessage.errors[0].message.toString()
        });
      })
      .catch(errorMessage => res.status(500).send({
        status: 500,
        message: errorMessage,
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
    handleUpdateUser(req.body, req.params.userId)
      .then(updateUserResponse => res.status(updateUserResponse.status).send({
        status: updateUserResponse.status,
        message: updateUserResponse.message
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
    handlePasswordChange(req.body, req.params)
      .then(changePasswordResponse => res.status(changePasswordResponse.status).send({
        status: changePasswordResponse.status,
        message: changePasswordResponse.message
      }));
  },
};
