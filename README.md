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




## Development
Document Management System API is built with the following technologies;
- JavaScript (ES6)
- [NodeJs](https://nodejs.org)
- [Express](http://expressjs.com/)
- [Postgresql](https://www.postgresql.org/)
- [Sequelize ORM](http://docs.sequelizejs.com/en/v3/)

## Installation
  - Install [NodeJs](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/) on your machine
  - Clone the repository `$ git clone https://github.com/andela-nrotimi/document-manager.git`
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

## Limitations
The limitations of the API are:


## LICENSE
 © Oluwatosin Akinola
