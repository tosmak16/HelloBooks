'use strict';

var users = require('./users');
var books = require('./books');
var auth = require('./auth');

module.exports = {
  users: users,
  books: books,
  auth: auth
};