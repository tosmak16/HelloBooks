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

## Roles
Endpoint for Roles resource.

### Get All Roles

#### Request
- Endpoint: GET: `/roles`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "You have successfully retrived all roles",
  "roles": [
    {
      "id": 1,
      "title": "admin",
      "createdAt": "2017-03-06T21:35:05.840Z",
      "updatedAt": "2017-03-06T21:35:05.840Z"
    },
    {
      "id": 2,
      "title": "regular",
      "createdAt": "2017-03-06T21:35:05.840Z",
      "updatedAt": "2017-03-06T21:35:05.840Z"
    }
  ]
}


### Create Role

#### Request
- Endpoint: POST: `/roles`
- Requires: Authentication and Admin role.
- Body `(application/json)`
json
{
  "title": "fellow"
}


#### Response
- Status: `201: Created`
- Body `(application/json)`
json
{
  "message": "Role has been created",
  "role": {
    "id": 3,
    "title": "fellow",
    "updatedAt": "2017-03-07T16:49:15.507Z",
    "createdAt": "2017-03-07T16:49:15.507Z"
  }
}


### Edit Role

#### Request
- Endpoint: PUT: `/roles/3`
- Requires: Authentication and Admin role.
- Body `(application/json)`
json
{
  "title": "fellow-d0"
}


#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "This role has been updated",
  "updatedRole": {
    "id": 3,
    "title": "fellow-d0",
    "createdAt": "2017-03-07T16:49:15.507Z",
    "updatedAt": "2017-03-07T16:52:35.408Z"
  }
}


### Get Role

#### Request
- Endpoint: GET: `/roles/3`
- Requires: Authentication and Admin role.

#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "This role has been retrieved successfully",
  "role": {
    "id": 3,
    "title": "fellow-d0",
    "createdAt": "2017-03-07T16:49:15.507Z",
    "updatedAt": "2017-03-07T16:52:35.408Z"
  }
}


### Delete Role

#### Request
- Endpoint: DELETE: `/roles/3`
- Requires: Authentication and Admin role.

#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "This role has been deleted"
}



## Users
Endpoint for Users resource.

### Get All Users

#### Request
- Endpoint: GET: `/users`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "You have successfully retrived all users",
  "users": {
    "rows": [
      {
        "id": 2,
        "username": "pleroonigeria",
        "firstname": "pleroo",
        "lastname": "nigeria",
        "email": "pleroonigeria@gmail.com",
        "createdAt": "2017-03-06T21:35:06.038Z"
      },
      {
        "id": 1,
        "username": "nelsonabieno",
        "firstname": "Nelson",
        "lastname": "Rotimi",
        "email": "nelsonabieno@gmail.com",
        "createdAt": "2017-03-06T21:35:05.971Z"
      }
    ]
  },
  "pagination": {
    "page_count": 1,
    "page": 1,
    "page_size": 10,
    "total_count": 2
  }
}


### Create User

#### Request
- Endpoint: POST: `/users`
- Body `(application/json)`
json
{
  "username": "fecit",
  "firstname": "fecit",
  "lastname": "fecit",
  "email": "fecit@mail.com",
  "password": "password",
}


#### Response
- Status: `201: Created`
- Body `(application/json)`
json
{
  "message": "Your account has been created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTQ4ODkwNTg3OCwiZXhwIjoxNDg5NTEwNjc4fQ.3cJlim3wV60kA2LjskSXm5633EcK56A3AayCLceEuLo",
  "user": {
    "id": 4,
    "username": "fecit",
    "firstname": "fecit",
    "lastname": "fecit",
    "email": "fecit@mail.com",
    "roleId": 2,
    "createAt": "2017-03-07T16:57:58.444Z",
    "updatedAt": "2017-03-07T16:57:58.444Z"
  }
}


### Login

#### Request
- Endpoint: POST: `/users`
- Body `(application/json)`
json
{
  "email": "nelsonabieno@gmail.com",
  "password": "password",
}


#### Response
- Status: `200: Ok`
- Body `(application/json)`
json
{
  "message": "You have successfully logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ4ODkwOTA0OCwiZXhwIjoxNDg5NTEzODQ4fQ.YKsL2EfuLDmhHDySTQjWHA5qbkN77m76-DpLtFKFF-8",
  "user": {
    "id": 1,
    "username": "nelsonabieno",
    "firstname": "Nelson",
    "lastname": "Rotimi",
    "email": "nelsonabieno@gmail.com"
  }
}


### Logout

#### Request
- Endpoint: POST: `/users`
- Requires: Authentication

#### Response
- Status: `200: Ok`
- Body `(application/json)`
json
{
  "message": "You have successfully logged out"
}



### Get User

#### Request
- Endpoint: GET: `/users/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "You have successfully retrived this user",
  "user": {
    "id": 4,
    "username": "fecit",
    "firstname": "fecit",
    "lastname": "fecit",
    "email": "fecit@mail.com"
  }
}


### Edit User

#### Request
- Endpoint: PUT: `/users/:id`
- Requires: Authentication
- Body `(application/json)`:
json
{
  "firstname": "fecitandela",
  "lastname": "fecitandela"
}


#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "Your profile has been updated",
  "updatedUser": {
    "id": 4,
    "username": "fecitandela",
    "firstname": "fecitandela",
    "lastname": "fecit",
    "email": "fecit@mail.com"
  }
}


### Delete User

#### Request
- Endpoint: DELETE: `/users/:id`
- Requires: Authentication and Admin role

#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "This account has been successfully deleted"
}


### Search User

#### Request
- Endpoint: GET: `/users/search?q=nel`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "Your search was successful",
  "users": {
    "rows": [
      {
        "id": 3,
        "username": "nelsonabieno",
        "firstname": "Nelson",
        "lastname": "Rotimi",
        "email": "nelsonabieno@gmail.com",
        "createdAt": "2017-03-07T14:25:19.942Z"
      },
      {
        "id": 1,
        "username": "nelsonabieno",
        "firstname": "Nelson",
        "lastname": "Rotimi",
        "email": "nelsonabieno@gmail.com",
        "createdAt": "2017-03-06T09:42:31.763Z"
      }
    ]
  },
  "pagination": {
    "page_count": 1,
    "Page": 1,
    "page_size": 10,
    "total_count": 2
  }
}


## Documents
Endpoint for document resource.

### Get All Documents

#### Request
- Endpoint: GET: `/documents`
- Requires: Authentication
- Optional parameters for limiting and pagination:
  - `limit=5` Number of items to return.
  - `offset=5` Number of items to skip.

#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "You have successfully retrieved all documents",
  "documents": {
    "rows": [
      {
        "id": 2,
        "title": "Andela",
        "content": "Andela is an American talent accelerator that recruits and trains software developers and connects them with employers globally",
        "access": "public",
        "createdAt": "2017-03-07T17:19:19.651Z",
        "updatedAt": "2017-03-07T17:19:19.651Z"
      },
      {
        "id": 1,
        "title": "new andela",
        "content": "new new new new new ",
        "access": "public",
        "createdAt": "2017-03-07T14:26:48.940Z",
        "updatedAt": "2017-03-07T14:26:48.940Z"
      }
    ]
  },
  "pagination": {
    "page_count": 1,
    "Page": 1,
    "page_size": 5,
    "total_count": 2
  }
}


### Search Documents

#### Request
- Endpoint: GET: `/documents/search?query=andela&limit=5&offset=5&publishedDate=ASC`
- Requires: Authentication
- Optional parameters
  - `query` Search query string
  - `limit` Number of items to return.
  - `offset` Number of items to skip.
  - `publishedDate` Order to return document `DESC|ASC`.

#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "This search was successfull",
  "documents": {
    "rows": [
      {
        "id": 2,
        "title": "Andela",
        "content": "Andela is an American talent accelerator that recruits and trains software developers and connects them with employers globally",
        "access": "public",
        "createdAt": "2017-03-07T17:19:19.651Z",
        "updatedAt": "2017-03-07T17:19:19.651Z"
      },
      {
        "id": 1,
        "title": "new andela",
        "content": "new new new new new ",
        "access": "public",
        "createdAt": "2017-03-07T14:26:48.940Z",
        "updatedAt": "2017-03-07T14:26:48.940Z"
      }
    ]
  },
  "pagination": {
    "page_count": 1,
    "Page": 1,
    "page_size": 5,
    "total_count": 2
  }
}


### User Documents

#### Request
- Endpoint: GET: `/users/:id/documents`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "This user's documents was successfully retrieved",
  "userDocuments": {
    "user": {
      "id": 1,
      "username": "nelsonabieno",
      "firstname": "Nelson",
      "lastname": "Rotimi",
      "email": "nelsonabieno@gmail.com"
    },
    "documents": {
      "count": 1,
      "rows": [
        {
          "id": 2,
          "title": "Andela",
          "content": "Andela is an American talent accelerator that recruits and trains software developers and connects them with employers globally",
          "access": "public",
          "createdAt": "2017-03-07T17:19:19.651Z",
          "updatedAt": "2017-03-07T17:19:19.651Z"
        }
      ]
    }
  },
  "pagination": {
    "page_count": 1,
    "Page": 1,
    "page_size": 10,
    "total_count": 1
  }
}


### Create Document

#### Request
- Endpoint: POST: `/documents`
- Requires: Authentication
- Body `(application/json)`
json
{
  "title": "Andela",
  "content": "Andela is an American talent accelerator that recruits and trains software developers and connects them with employers globally",
}


#### Response
- Status: `201: Created`
- Body `(application/json)`
json
{
  "message": "Your document has been successfully created",
  "document": {
    "id": 3,
    "title": "Andela",
    "content": "Andela is an American talent accelerator that recruits and trains software developers and connects them with employers globally",
    "access": "public",
    "createdAt": "2017-03-07T17:23:23.113Z",
    "updatedAt": "2017-03-07T17:23:23.113Z"
  }
}



### Get Document

#### Request
- Endpoint: GET: `/documents/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "You have successfully retrived this document",
  "document": {
    "id": 3,
    "title": "Andela",
    "content": "Andela is an American talent accelerator that recruits and trains software developers and connects them with employers globally",
    "access": "public",
    "createdAt": "2017-03-07T17:23:23.113Z",
    "updatedAt": "2017-03-07T17:23:23.113Z"
  }
}


### Edit Document

#### Request
- Endpoint: PUT: `/documents/:id`
- Requires: Authentication
- Body `(application/json)`:
json
{
  "title": "Overview",
  "content": "Andela's training and education program unites qualified African students, regardless of age or income, with leading developers who teach them to code.[5] The four-year training program, which pays its students, is highly selective"
}


#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "This document has been updated successfully",
  "updatedDocument": {
    "id": 3,
    "ownerId": 1,
    "title": "Overview",
    "content": "Andela's training and education program unites qualified African students, regardless of age or income, with leading developers who teach them to code.[5] The four-year training program, which pays its students, is highly selective",
    "access": "public",
    "ownerRoleId": 1,
    "createdAt": "2017-03-07T17:23:23.113Z",
    "updatedAt": "2017-03-07T17:26:18.297Z"
  }
}


### Delete Document

#### Request
- Endpoint: DELETE: `/documents/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
json
{
  "message": "This document has been deleted successfully"
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
