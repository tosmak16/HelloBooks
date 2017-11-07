[![Build Status](https://travis-ci.org/tosmak16/HelloBooks.svg?branch=develop)](https://travis-ci.org/tosmak16/HelloBooks)
[![Coverage Status](https://coveralls.io/repos/github/tosmak16/HelloBooks/badge.svg?branch=develop)](https://coveralls.io/github/tosmak16/HelloBooksbranch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/a5a56f4d48add9c1ab06/maintainability)](https://codeclimate.com/github/tosmak16/HelloBooks/maintainability)
# HelloBooks
Hello-Books​ is a simple application that helps manage a library and its processes like stocking,  tracking and renting books. With this application users are able to find and rent books. 

Visit my app [here]

## Endpoints

*Users*

Request type | Endpoint | Action
------------ | -------- | ------
POST | [ /api/users/signup](#Create-account) | User create account
POST | [/api/users/login](#login) | To log a user in
GET  | [ /api/books](#get-books) | Get all books
POST | [/api/users/:userId/books](#borrow-books) | borrow books
PUT  | [/api/users/:userId/books](#return-books) | return books
GET  | [/api/users/:userId/books?returned=false](#borrow-books) | get all the books that the user has borrowed but has not returned
PUT  | [ /api/books/:bookId](#modify-book-infor) | API route that allow users to modify a book information
## Development
Document Management System API is built with the following technologies;
- JavaScript (ES6)
- [NodeJs](https://nodejs.org)
- [Express](http://expressjs.com/)
- [Postgresql](https://www.postgresql.org/)
- [Sequelize ORM](http://docs.sequelizejs.com/en/v3/)

## Installation
  - Install [NodeJs](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/) on your machine
   - Clone the repository
  - Change into the directory `$ cd /dms`
  - Install all required dependencies with `$ npm install`
  - Create a `.env` file in your root directory as described in `.env.sample` file
  - Start the app with `npm start`
  - Run Test `npm test`

## Contributing
- Fork this repository to your GitHub account
- Clone the forked repository
- Create your feature branch
- Commit your changes
- Push to the remote branch
- Open a Pull Request




## LICENSE
 © Oluwatosin Akinola
