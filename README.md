[![Build Status](https://travis-ci.org/tosmak16/HelloBooks.svg?branch=development)](https://travis-ci.org/tosmak16/HelloBooks)
[![Coverage Status](https://coveralls.io/repos/github/tosmak16/HelloBooks/badge.svg?branch=development)](https://coveralls.io/github/tosmak16/HelloBooks?branch=development)
[![Maintainability](https://api.codeclimate.com/v1/badges/a5a56f4d48add9c1ab06/maintainability)](https://codeclimate.com/github/tosmak16/HelloBooks/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a5a56f4d48add9c1ab06/test_coverage)](https://codeclimate.com/github/tosmak16/HelloBooks/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
# HelloBooks
Hello-Books​ is a simple application that helps manage a library and its processes like stocking,  tracking and renting books.With this application users are able to find and rent books. 

Visit my app [HelloBooks](https://hellobookstosmak.herokuapp.com)
## Table of Contents

* [Features](#features)
* [API Endpoints](#api-endpoints)
* [Technologies](#technology)
* [Installation](#installation)
* [Testing](#testing)
* [Contribution](#contribution)
* [Limitations](#limitations)
* [Frequently Asked Questions](#faqs)
* [License](#license)

## Features
HelloBooks consists of the following features:

### Authentication

- It uses JSON Web Token (JWT) for authentication.
- Token is generated on user login
- Token is perpetually verified to check the state of the user if logged in or not.
- Admin User will br pre-seeded into the application with administrative priviledges

### Unauthenticated Users
- Unauthenticated users can look at the recent books in the library

### Authenticated Users
- Authenticated Users can log in
- Authenticated Users can view all books in the library
- Authenticated Users can borrow books
- Authenticated Users can return books
- Authenticated Users can view borrowing history
- Authenticated Users can read books in application
- Authenticated Users can search through a list of books
- Authenticated Users can view their profile
- Authenticated Users can update their profile details
- Authenticated Users can upload their pictures
- Authenticated Users can log in with google signin
- Authenticated Users can reset their password

### Admin Users
- Admins can edit books
- Admins can add new books
- Admins can delete books
- Admin can see a list of users
- Admin gets notification when a book is borrowed or returned

## API Endpoints

Request type | Endpoint                                                 | Action
------------ | ---------------------------------------------------------|------
POST         | [ /api/users/signup](#Create-account)                    | User create account
POST         | [/api/users/login](#login)                               | To log a user in
GET          | [ /api/books](#get-books)                                | Get all books
POST         | [/api/users/:userId/books](#borrow-books)                | borrow books
PUT          | [/api/users/:userId/books](#return-books)                | return books
GET          | [/api/users/:userId/books?returned=false](#borrow-books) | get all the books that the user has borrowed but has not returned
PUT          | [ /api/books/:bookId](#modify-book-infor)                | API route that allow users to modify a book information
## Technology
**HelloBooks** makes use of a host of modern technologies. The core ones are:
Hello Books API is built with the following technologies;
- [JavaScript](https://www.javascript.com/)
- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [NodeJs](https://nodejs.org)
- [Express](http://expressjs.com/)
- [Postgresql](https://www.postgresql.org/)
- [Sequelize ORM](http://docs.sequelizejs.com/en/v3/)

## Installation
  - Install [NodeJs](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/) on your machine
  - Clone the repository
  - Change into the directory `$ cd /hb`
  - Install all required dependencies with `$npm install`
  - Create a `.env` file in your root directory as described in `.env.sample` file
  - Start the app with `npm start`
## Testing
  - Run Server Test `npm  test`  
  - Run Client Test `npm run client:test`
  - Run End to End Test `npm run e2e:test`

## Contribution
- Fork this repository to your GitHub account
- Clone the forked repository
- Create your feature branch
- Commit your changes
- Push to the remote branch
- Open a Pull Request
**Note** when making contributions, please endevour to follow the [Airbnb](https://github.com/airbnb/javascript) javascript style guide.

## Limitations
The limitations with this current version of Hello Books includes:
* Users cannot contribute books to the application based on their location

## FAQs
Contact tosmak16@gmail.com

## LICENSE
#### [MIT](./LICENSE) © [Oluwatosin Akinola]

Copyright (c) 2017 Oluwatosin Akinola

