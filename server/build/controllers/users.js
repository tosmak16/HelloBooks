'use strict';

var User = require('../models').Users;
var Book = require('../models').Books;
var borrowbook = require('../models').borrowbook;
var jwt = require('jsonwebtoken');

var _require = require('crypto-js'),
    SHA256 = _require.SHA256;

var myt = void 0;

module.exports = {
  signup: function signup(req, res) {
    User.create({
      username: req.body.username,
      password: SHA256(req.body.password).toString(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      membershipType: req.body.membershipType,
      role: req.body.role

    }).then(function (result) {
      return res.status(201).send(result);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  signin: function signin(req, res) {
    User.findAll({
      attributes: ['username'],
      where: {
        username: req.body.username,
        password: SHA256(req.body.password).toString()
      }

    }).then(function (result) {
      if (result.length === 0) {
        res.status(400).send();
      } else {
        // create a token
        jwt.sign(req.body.username, 'encoded', function (err, token) {
          res.status(201).send({ result: result, token: token });
        });
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  list: function list(req, res) {
    return User.all().then(function (result) {
      return res.status(200).send(result);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  borrowBooks: function borrowBooks(req, res) {
    console.log(req.params.userId);
    User.findById(req.params.userId).then(function (report) {
      if (report.username !== req.decoded) {
        return res.status(404).send({
          message: 'Invalid Identity'
        });
      }
      return Book.findById(req.body.bookId).then(function (result) {
        if (!result) {
          return res.status(404).send({
            message: 'book Not Found'
          });
        }

        if (result.stocknumber === 0) {
          return res.status(404).send({
            message: 'Book Not available in stock'
          });
        }

        result.update({ stocknumber: result.stocknumber - 1 });

        return borrowbook.create({
          brdate: Date.now(),
          retype: false,
          userId: req.params.userId,
          bookId: result.id

        }).then(function (ouput) {
          return res.status(200).send(ouput);
        }).catch(function (error) {
          return res.status(400).send(error);
        });
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  getUnreturnedBooks: function getUnreturnedBooks(req, res) {
    User.findById(req.params.userId).then(function (report) {
      if (report.username !== req.decoded) {
        return res.status(404).send({
          message: 'Invalid Identity'
        });
      }
      return borrowbook.findAll({
        where: {
          retype: req.query.returned,
          userId: req.params.userId
        }
      }).then(function (result) {
        return res.status(200).send(result);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  returnBooks: function returnBooks(req, res) {
    User.findById(req.params.userId).then(function (report) {
      if (report.username !== req.decoded) {
        return res.status(404).send({
          message: 'Invalid Identity'
        });
      }
      return borrowbook.findById(req.body.Id).then(function (ouput) {
        if (!ouput) {
          return res.status(404).send({
            message: 'Record Not Found'
          });
        }
        if (ouput.retype === true) {
          return res.status(404).send({
            message: 'This book has been returned before'
          });
        }

        return ouput.update({
          retype: true,
          rdate: Date.now()

        }).then(function (result) {
          Book.findById(result.bookId).then(function (re) {
            re.update({
              stocknumber: re.stocknumber + 1
            });
          }).catch(function (error) {
            return res.status(400).send(error);
          });
          res.status(200).send(result);
        }).catch(function (error) {
          return res.status(400).send(error);
        });
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  deleteBooks: function deleteBooks(req, res) {
    User.findById(req.params.userId).then(function (report) {
      if (report.username !== req.decoded) {
        return res.status(404).send({
          message: 'Invalid Identity'
        });
      }

      if (report.role !== 'admin') {
        return res.status(403).send({
          message: 'Access Denied!'
        });
      }

      return Book.findById(req.body.bookId).then(function (result) {
        result.destroy().then(function () {
          return res.status(204).send({ message: 'deleted' });
        }).catch(function (error) {
          return res.status(400).send(error);
        });
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};