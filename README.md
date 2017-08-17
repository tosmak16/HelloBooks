[![Build Status](https://travis-ci.org/tosmak16/HelloBooks.svg?branch=seeddatabase)](https://travis-ci.org/tosmak16/HelloBooks)
[![Test Coverage](https://codeclimate.com/github/codeclimate/codeclimate/badges/coverage.svg)](https://codeclimate.com/github/codeclimate/codeclimate/coverage)

# HelloBooks
Hello-Books​ is a simple application that helps manage a library and its processes like stocking,  tracking and renting books. With this application users are able to find and rent books. 

Visit my app [here]

# API Documentation
The API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API status and errors.

## Features

*Users*:
A created user will have a role, either an admin or a regular user.
- A Regular User can:
    - Create an account
    - Edit his profile.
    - Search books
    - Borrow books


- An Admin User can:
    - login
    - Edit his profile.
    - Search books
    - Edit books
    - Delete books
    - Add books 
    

*Books*:
Books can be created by Admin and must have:
  - Title
  - Author
  - Categories


*Authentication*:
Users are authenticated and validated using JSON web token (JWT).
By generating a token on registration and login, API endpoints and documents are protected from unauthorised access.
Requests to protected routes are validated using the generated token.

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
PUT  | [ /api/books/:bookId](#modify-book-infor) |  API route that allow users to modify a book information




The following are some sample request and response from the API.

## Users
Endpoint for Users resource.

### Register User

#### Request
- Endpoint: POST: `/users/signup`
- Body `(application/json)`
json{
       "username": "tosmak",
        "password": "password",
        "firstName": "Tosin",
        "lastName": "Akinola",
        "email": "tosmak@gmail.com",
        "membershipType": "Basic",
        "role": "user",
}
#### Response
- Status: `201: Created`
- Body `(application/json)`
json{
    "message": "Account created",
    "result": {
        "id": 36,
        "username": "tosmak",
        "password": "da6e2f539726fabd1f8cd7c9469a22b36769137975b28abc65fe2dc29e659b77",
        "firstName": "Tosin",
        "lastName": "Akinola",
        "email": "tosmak@gmail.com",
        "membershipType": "Basic",
        "role": "user",
        "updatedAt": "2017-08-17T04:43:57.988Z",
        "createdAt": "2017-08-17T04:43:57.988Z"
    }
}

### Login

#### Request
- Endpoint: POST: `/users/signin`
- Body `(application/json)`
json
{
  "username": "tosmak",
  "password": "password",
}


#### Response
- Status: `200: Ok`
- Body `(application/json)`
json{
    "message": "You have successfully logged in",
    "result": [
        {
            "username": "tosmak"
        }
    ],
    "token": "eyJhbGciOiJIUzI1NiJ9.dG9zbWFr._e0TwSaIo2RkWC_PntbkEB-rMbgsuGWi7BnuRiBPRcM"
}

### Borrow books

#### Request
- Endpoint: POST: `/users/userId/books`
- Requires: Authentication
- Body `(application/json)`
json
{
        "bookId": 20
}


#### Response
- Status: `200: Ok`
- Body `(application/json)`

json
{
    "message": "Book added to personal archive. happy reading!",
    "ouput": {
        "id": 1,
        "brdate": "2017-08-17T05:26:50.083Z",
        "retype": false,
        "userId": 36,
        "bookId": 20,
        "updatedAt": "2017-08-17T05:26:50.084Z",
        "createdAt": "2017-08-17T05:26:50.084Z",
    }
}

### getUnreturnedbooks

#### Request
- Endpoint: GET: `/users/userId/books?returned=false`
- Requires: Authentication

#### Response
- Status: `200: Ok`
- Body `(application/json)`

json
{
    "message": "Borrowed books history retrieved",
    "result": [
        {
            "id": 14,
            "brdate": "2017-08-17T05:26:50.083Z",
            "retype": false,
            "userId": 36,
            "bookId": 20,
            "createdAt": "2017-08-17T05:26:50.084Z",
            "updatedAt": "2017-08-17T05:26:50.084Z"
        }
    ]
}
### returnBooks

#### Request
- Endpoint: PUT: `/users/userId/books`
- Requires: Authentication
- Body `(application/json)`
json
{
        Id: 1
}


#### Response
- Status: `200: Ok`
- Body `(application/json)`

json
{
    "message": "book has been returned succesfully"
}

### addBook

#### Request
- Endpoint: POST: `/books`
- Requires: Authentication
- Body `(application/json)`
json
{
        "bookTitle": "Thinkers Tools",
        "author": "Tosmak Pac",
        "category": "psychology ",
        "isbn": "1235-4-12746-8",
        "stocknumber": 10,
}


#### Response
- Status: `200: Ok`
- Body `(application/json)`

json
{
    "message": "Book has been added to store",
    "report": {
        "id": 20,
        "bookTitle": "Thinkers Tools",
        "author": "Tosmak Pac",
        "category": "psychology ",
        "isbn": "1235-4-12746-8",
        "stocknumber": 10,
        "updatedAt": "2017-08-17T05:24:12.944Z",
        "createdAt": "2017-08-17T05:24:12.944Z",
    }
}

## Books
Endpoint for Books resource.

### addBook

#### Request
- Endpoint: POST: `/books`
- Requires: Authentication
- Body `(application/json)`
json
{
        "bookTitle": "Thinkers Tools",
        "author": "Tosmak Pac",
        "category": "psychology ",
        "isbn": "1235-4-12746-8",
        "stocknumber": 10,
}


#### Response
- Status: `200: Ok`
- Body `(application/json)`

json
{
    "message": "Book has been added to store",
    "report": {
        "id": 1,
        "bookTitle": "Thinkers Tools",
        "author": "Tosmak Pac",
        "category": "psychology ",
        "isbn": "1235-4-12746-8",
        "stocknumber": 10,
        "updatedAt": "2017-08-17T05:24:12.944Z",
        "createdAt": "2017-08-17T05:24:12.944Z",
    }
}

### UpdateBooks

#### Request
- Endpoint: PUT: `/books/bookId`
- Requires: Authentication
- Body `(application/json)`

json
{
    "report": {
        "stocknumber": 5,
    }
}

#### Response
- Status: `200: Ok`
- Body `(application/json)`

json
{
    "message": "Book has been updated",
    "result": {
        "id": 1,
        "bookTitle": "Thinkers Tools",
        "author": "Tosmak Pac",
        "category": "psychology ",
        "isbn": "1235-4-12746-8",
        "stocknumber": "5",
        "createdAt": "2017-08-17T05:24:12.944Z",
        "updatedAt": "2017-08-17T07:37:32.217Z"
    }
}

### DeleteBooks

#### Request
- Endpoint: PUT: `/books/bookId`
- Requires: Authentication

#### Response
- Status: `200: Ok`
- Body `(application/json)`
json{
  {
    "message": "Deleted"
  }
}


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
