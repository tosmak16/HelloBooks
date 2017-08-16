import jwt from 'jsonwebtoken';
import sequelise from 'sequelize';
import pg from 'pg';
import pgh from 'pg-hstore';
import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { SHA256 } from 'crypto-js';

import server from '../../app';
import auth from '../server/controllers/auth';
import User from '../server/models/users';
import Book from '../server/models/books';
import borrowbook from '../server/models/borrowbook';


const should = chai.should();
const expect = chai.expect;


chai.use(chaiHttp);
let token;
let adminToken;
const next = sinon.spy();

// Registration test
describe('Check for user registration', () => {
  it('it should not register the user because no required parameter was inputed', (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should register user if username does not exist and if all required parameters are inputed', (done) => {
    const user = {
      username: 'y34',
      password: SHA256('hello').toString(),
      firstName: 'bayren',
      lastName: 'helen',
      email: 'user@gmail.com',
      membershipType: 'basic',
      role: 'user',
    };
    chai.request(server)
      .post('/api/users/signup')
      .send(user)
      .end((err, res) => {
        if (!err) {
          res.text;
          res.should.have.status(201);
        } else {
          res.should.have.status(400);
        }

        done();
      });
  });
});

// sign in test

describe('Check for login ', () => {
  it('should not allow the user to login', (done) => {
    chai.request(server)
      .post('/api/users/signin')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should generate token and allow the user to login', (done) => {
    const user = {
      username: 'y34',
      password: SHA256('hello').toString(),
    };
    chai.request(server)
      .post('/api/users/signin')
      .send(user)
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
        } else {
          console.log(res.text);
          token = res.body.token;
          res.should.have.status(201);
          console.log(token);
        }
        done();
      });
  });

  it('should generate token for admin to login', (done) => {
    const user = {
      username: 'admin',
      password: SHA256('hello').toString(),
    };
    chai.request(server)
      .post('/api/users/signin')
      .send(user)
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
        } else {
          console.log(res.text);
          adminToken = res.body.token;
          res.should.have.status(201);
          console.log(adminToken);
        }
        done();
      });
  });
});

// Authetication middleware
describe('Check for token for user authentication', () => {
  it('should return token not provided if no token was entered', (done) => {
    chai.request(server)
      .post('/')
      .end((err, res) => {
        console.log(res.text);
        res.should.have.status(404);
        done();
      });
  });
});

// borrow books API route Test
describe('check borrowbooks route', () => {
  it('should return 404 invalid user ', (done) => {
    chai.request(server)
      .post('/api/users/1/books')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        console.log(res.text);
        done();
      });
  });
  it('should not borrow a book if bookId is not specified', (done) => {
    chai.request(server)
      .post('/api/users/26/books')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        console.log(res.text);
        done();
      });
  });

  it('should not borrow a book if bookId is specified but user is invalid', (done) => {
    const bookId = '7';
    chai.request(server)
      .post('/api/users/1/books')
      .set('token', token)
      .send({ bookId })
      .end((err, res) => {
        res.should.have.status(404);
        console.log(res.text);
        done();
      });
  });
  it('should not borrow a book if the number in stock is zero', (done) => {
    const bookId = '1';
    chai.request(server)
      .post('/api/users/26/books')
      .set('token', token)
      .send({ bookId })
      .end((err, res) => {
        res.should.have.status(404);
        console.log(res.text);
        done();
      });
  });
  it('should borrow a book if number in stock is not zero', (done) => {
    const bookId = '4';
    chai.request(server)
      .post('/api/users/26/books')
      .set('token', token)
      .send({ bookId })
      .end((err, res) => {
        res.should.have.status(200);
        console.log(res.text);
        done();
      });
  });
});

// Test for return borrowed books

describe('Check for return borrowed books API route', () => {
  it('should return 404 invalid user if user used the wrong route ', (done) => {
    chai.request(server)
      .put('/api/users/1/books')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        console.log(res.text);
        done();
      });
  });
  it('should not allow user to return borrowed book if bookId is not specified', (done) => {
    chai.request(server)
      .put('/api/users/26/books')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        console.log(res.text);
        done();
      });
  });

  it('should not return borrowed book if bookId is specified but user is invalid', (done) => {
    const bookId = '7';
    chai.request(server)
      .put('/api/users/1/books')
      .set('token', token)
      .send({ bookId })
      .end((err, res) => {
        res.should.have.status(404);
        console.log(res.text);
        done();
      });
  });
  it('should return borrowed book if the book has not been returned before or vice versa', (done) => {
    const bookId = '7';
    const Id = 26;
    chai.request(server)
      .put('/api/users/26/books')
      .set('token', token)
      .send({ bookId, Id })
      .end((err, res) => {
        if (!err) {
          res.should.have.status(200);
          console.log(res.text);
        } else {
          res.should.have.status(404);
          console.log(res.text);
        }

        done();
      });
  });

  it('should return record not found if the book was not borrowed', (done) => {
    const bookId = '7';
    const Id = 100;
    chai.request(server)
      .put('/api/users/26/books')
      .set('token', token)
      .send({ bookId, Id })
      .end((err, res) => {
        res.should.have.status(404);
        console.log(res.text);

        done();
      });
  });
});

// Test for unreturned books

describe('Check for unreturned books API route', () => {
  it('should return 404 invalid Identity', (done) => {
    chai.request(server)
      .get('/api/users/1/books')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        console.log(res.text);
        done();
      });
  });
  it('should return Jwt Authentication error (Invalid signature)', (done) => {
    chai.request(server)
      .get('/api/users/1/books')
      .set('token', `${token}1`)
      .end((err, res) => {
        res.should.have.status(403);
        console.log(res.text);
        done();
      });
  });
  it('should return all books that are yet to be returned', (done) => {
    const returned = false;
    chai.request(server)
      .get('/api/users/26/books?returned=false')
      .set('token', token)
      .end((err, res) => {
        if (!err) {
          res.should.have.status(200);
          console.log(res.body);
        } else {
          res.should.have.status(404);
          console.log(res.text);
        }
        done();
      });
  });
});

// To test for delete book API route
describe('Check for Delete books API route', () => {
  it('should return 404 invalid Identity', (done) => {
    chai.request(server)
      .delete('/api/users/1/books')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        console.log(res.text);
        done();
      });
  });
  it('should return 403 Access denied if the user is not an admin and vice versa', (done) => {
    const bookId = '5';
    chai.request(server)
      .delete('/api/users/26/books')
      .set('token', token)
      .send({ bookId })
      .end((err, res) => {
        if (err) {
          res.should.have.status(403);
          console.log(res.body.message);
        } else {
          res.should.have.status(204);
          console.log(res.text);
        }
        done();
      });
  });
});

// Test for add books API route
describe('Check for Add books API route', () => {
  it('should return 403 Acceess denied if the user is not an admin', (done) => {
    chai.request(server)
      .post('/api/books')
      .set('token', token)
      .end((err, res) => {
        if (err) {
          res.should.have.status(403) || res.should.have.status(400);
          console.log(res.text);
        } else {
          res.should.have.status(201);
          console.log(res.text);
        }
        done();
      });
  });
  it('should return 400 bad request if the user is an admin but the required book information are not inputed', (done) => {
    chai.request(server)
      .post('/api/books')
      .set('token', adminToken)
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          console.log(res.text);
        } else {
          res.should.have.status(201);
          console.log(res.text);
        }
        done();
      });
  });

  it('should return add new books if the user is an admin and the required book information are inputed', (done) => {
    const books = {
      bookTitle: 'Borrowing brilliance',
      author: 'David kord Murray',
      category: 'Educational',
      isbn: 'fjhbkjjkjbj',
      stocknumber: '30',
    };
    chai.request(server)
      .post('/api/books')
      .send(books)
      .set('token', adminToken)
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          console.log(res.text);
        } else {
          res.should.have.status(201);
          console.log(res.body);
        }
        done();
      });
  });
});
// Test Edit books API route

describe('Check for Update books API route', () => {
  it('should return 403 Acceess denied if the user is not an admin', (done) => {
    chai.request(server)
      .put('/api/books/1/')
      .set('token', token)
      .end((err, res) => {
        if (err) {
          res.should.have.status(403) || res.should.have.status(400);
          console.log(res.text);
        } else {
          res.should.have.status(201);
          console.log(res.text);
        }
        done();
      });
  });
  it('should return 403 book does not exist if the user is an admin but the book has not been added', (done) => {
    chai.request(server)
      .put('/api/books/30')
      .set('token', adminToken)
      .end((err, res) => {
        if (err) {
          res.should.have.status(404);
          console.log(res.text);
        } else {
          res.should.have.status(201);
          console.log(res.text);
        }
        done();
      });
  });
  it('should return update the book if the user is an admin and the book exist', (done) => {
    const author = 'David murray';
    chai.request(server)
      .put('/api/books/5')
      .set('token', adminToken)
      .send({ author })
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          console.log(res.text);
        } else {
          res.should.have.status(200);
          console.log(res.text);
        }
        done();
      });
  });
});
