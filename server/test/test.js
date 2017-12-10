process.env.NODE_ENV = 'test';
import jwt from 'jsonwebtoken';
import sequelise from 'sequelize';
import pg from 'pg';
import pgh from 'pg-hstore';
import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';



import server from '../../app';
import auth from '../middleWare/auth';
import User from '../models/User';
import Book from '../models/Book';
import borrowbook from '../models/BorrowedBook';


const should = chai.should();
const expect = chai.expect;


chai.use(chaiHttp);
let userToken;
let adminToken;
let fakeUserToken;
const next = sinon.spy();

fakeUserToken = jwt.sign({
  id: 13,
  user: 'Tosmak',
  role: 'user'
}, 'encoded');




// Registration test
describe('Check for user registration', () => {
  it('should register user if username does not exist and if all required parameters are inputed', (done) => {
    const user = {
      username: 'user',
      password: '123456',
      firstName: 'bayren',
      lastName: 'helen',
      email: 'usera1@gmail.com',
      membershipType: 'Basic',
    };
    chai.request(server)
      .post('/api/v2/users/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('Account created')
        done();
      });
  });


  it('should register admin if username does not exist and if all required parameters are inputed', (done) => {
    const user = {
      username: 'admin',
      password: '123456',
      firstName: 'bayren',
      lastName: 'helen',
      email: 'user@gmail.com',
      membershipType: 'Basic',
      role: 'admin',
    };
    chai.request(server)
      .post('/api/v2/users/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('Account created')
        done();
      });
  });

  it('it should not register the user because first name parameter was not inputed', (done) => {
    chai.request(server)
      .post('/api/v2/users/signup')
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('first name is required')
        done();
      });
  });
  it('it should not register the user because last name parameter was not inputed', (done) => {
    const user = {
      username: 'admin',
      password: '123456',
      firstName: 'ba',
      email: 'user@gmail.com',
      membershipType: 'Basic',
      role: 'admin',
    };
    chai.request(server)
      .post('/api/v2/users/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('last name is required')
        done();
      });
  });

  it('it should not register the user because first name parameter length is less than two', (done) => {
    const user = {
      username: 'admin',
      password: '123456',
      firstName: 'b',
      lastName: 'helen',
      email: 'user@gmail.com',
      membershipType: 'Basic',
      role: 'admin',
    };
    chai.request(server)
      .post('/api/v2/users/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('firstName length should be more than 2')
        done();
      });
  });

  it('it should not register the user because last name parameter length is less than two', (done) => {
    const user = {
      username: 'admin',
      password: '123456',
      firstName: 'bb',
      lastName: 'h',
      email: 'user@gmail.com',
      membershipType: 'Basic',
      role: 'admin',
    };
    chai.request(server)
      .post('/api/v2/users/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('lastName length should be more than 2')
        done();
      });
  });


  it('should not register user if username does exist and if all required parameters are inputed', (done) => {
    const user = {
      username: 'admin',
      password: '123456',
      firstName: 'bayren',
      lastName: 'helen',
      email: 'user@gmail.com',
      membershipType: 'basic',
      role: 'admin',
    };
    chai.request(server)
      .post('/api/v2/users/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body.message).to.equal('username already exist')
        done();
      });
  });

  it('should not register user if the length of firstname is less than 3 and if all required parameters are inputed', (done) => {
    const user = {
      username: 'admins',
      password: '123456',
      firstName: 'bb',
      lastName: 'helen',
      email: 'user@gmail.com',
      membershipType: 'basic',
      role: 'admin',
    };
    chai.request(server)
      .post('/api/v2/users/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body.message).to.equal('email already exist')
        done();
      });
  });
});

// sign in test
describe('Check for login ', () => {
  it('should not allow the user to login if username not defined', (done) => {
    chai.request(server)
      .post('/api/v2/users/signin')
      .end((err, res) => {
        expect(res.body.message).to.equal('username is required')
        res.should.have.status(400);
        done();
      });
  });
  it('should not allow the user to login if password not defined', (done) => {
    const user = {
      username: 'user',
    };
    chai.request(server)
      .post('/api/v2/users/signin')
      .send(user)
      .end((err, res) => {
        expect(res.body.message).to.equal('password is required')
        res.should.have.status(400);
        done();
      });
  });
  it('should generate token and allow the user to login', (done) => {
    const user = {
      username: 'user',
      password: '123456',
    };
    chai.request(server)
      .post('/api/v2/users/signin')
      .send(user)
      .end((err, res) => {
        userToken = res.body.token
        res.should.have.status(200)
        expect(res.body.message).to.equal('You have successfully logged in')
        done();
      });
  });


  it('should not allow the user to login if username and password are incorrct', (done) => {
    const user = {
      username: 'user',
      password: 'user22',
    };
    chai.request(server)
      .post('/api/v2/users/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        expect(res.body.message).to.equal('please enter valid details')
        done();
      });
  });

  it('should generate token for admin to login', (done) => {
    const user = {
      username: 'admin',
      password: '123456',
    };
    chai.request(server)
      .post('/api/v2/users/signin')
      .send(user)
      .end((err, res) => {
        adminToken = res.body.token;
        expect(res.body.message).to.equal('You have successfully logged in')
        res.should.have.status(200);
        done();
      });
  });

});
// //Authetication middleware
describe('Check for token for user authentication', () => {
  it('should return token not provided if no token in the request', (done) => {
    chai.request(server)
      .post('/api/v2/users/1/books')
      .end((err, res) => {
        expect(res.body.message).to.equal('Token not provided')
        res.should.have.status(404);
        done();
      });
  });

  it('should return Invalid user if wrong token  is provided in the request', (done) => {
    chai.request(server)
      .post('/api/v2/users/1/books')
      .set('token', userToken + '1')
      .end((err, res) => {
        expect(res.body.message).to.equal('Invalid user')
        res.should.have.status(401);
        done();
      });
  });
});

// // Test for add books API route
describe('Check for Add books API route', () => {
  it('should add new books if the user is an admin and the required book information are inputed', (done) => {
    const books = {
      bookTitle: 'Borrowing brilliance',
      author: 'David kord Murray',
      category: 'Educational',
      isbn: '1225467890876567',
      stockNumber: '2',
      image: 'l8.jpg',
      bookFileUrl: 'l8.pdf',
      summary: 'hfhgvhgnvhgvhvhvhgvh',
    };
    chai.request(server)
      .post('/api/v2/books')
      .send(books)
      .set('token', adminToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Book has been added to store')
        res.should.have.status(201);
        done();
      });
  });

  it('should return add new books if the user is an admin and the required book information are inputed', (done) => {
    const books = {
      bookTitle: 'Borrowing brilliance',
      author: 'David kord Murray',
      category: 'Educational',
      isbn: '1225467890976567',
      stockNumber: '0',
      image: 'l9.jpg',
      summary: 'hfhgvhgnvhgvhvhvhgvh',
      bookFileUrl: 'l9.pdf'
    };
    chai.request(server)
      .post('/api/v2/books')
      .send(books)
      .set('token', adminToken)
      .end((err, res) => {
        expect(res.body.message).to.equal('Book has been added to store')
        res.should.have.status(201);
        done();
      });
  });

  it('should return 403 Acceess denied if the user is not an admin', (done) => {
    chai.request(server)
      .post('/api/v2/books')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(403)
        expect(res.body.message).to.equal('Access Denied!')
        done();
      });
  });

  it('should return 400 bad request if the user is an admin but book title is not defined', (done) => {
    const books = {
      author: 'David kord Murray',
      category: 'Educational',
      isbn: '1225467890976567',
      stockNumber: '0',
      image: 'l9.jpg',
      summary: 'hfhgvhgnvhgvhvhvhgvh',
      bookFileUrl: 'l9.pdf'
    };
    chai.request(server)
      .post('/api/v2/books')
      .send(books)
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('bookTitle is required')
        done();
      });
  });
  it('should return 400 bad request if the user is an admin but author is not defined', (done) => {
    const books = {
      bookTitle: 'Borrowing brilliance',
      category: 'Educational',
      isbn: '1225467890976567',
      stockNumber: '0',
      image: 'l9.jpg',
      summary: 'hfhgvhgnvhgvhvhvhgvh',
      bookFileUrl: 'l9.pdf'
    };
    chai.request(server)
      .post('/api/v2/books')
      .send(books)
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('author is required')
        done();
      });
  });

  it('should return 400 bad request if the user is an admin but category is not defined', (done) => {
    const books = {
      bookTitle: 'Borrowing brilliance',
      author: 'David kord Murray',
      isbn: '1225467890976567',
      stockNumber: '0',
      image: 'l9.jpg',
      summary: 'hfhgvhgnvhgvhvhvhgvh',
      bookFileUrl: 'l9.pdf'
    };
    chai.request(server)
      .post('/api/v2/books')
      .send(books)
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('book category is required')
        done();
      });
  });


  it('should return error if the same isbn number is used for another book', (done) => {
    const books = {
      bookTitle: 'Time Mchine',
      author: 'David lome',
      category: 'Educational',
      isbn: '1225467890876567',
      stockNumber: '2',
      image: 'l9.jpg',
      bookFileUrl: 'l9.pdf',
      summary: 'hgdfgfgfggfvhb'
    };
    chai.request(server)
      .post('/api/v2/books')
      .send(books)
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('isbn must be unique')
        done();
      });
  });
});
// borrow books API route Test
describe('check borrowbooks route', () => {
  it('should return 401 if user is invalid ', (done) => {
    chai.request(server)
      .post('/api/v2/users/2/books')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal('Invalid Identity')
        done();
      });
  });

  it('should not borrow a book if bookId and userId is not specified', (done) => {
    chai.request(server)
      .post('/api/v2/users/1/books')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('sorry, bookId can not be undefined')
        done();
      });
  });

  it('should not borrow a book if bookId specified does not exist', (done) => {
    const bookId = '7';
    chai.request(server)
      .post('/api/v2/users/1/books')
      .set('token', userToken)
      .send({
        bookId
      })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message).to.equal('Book Not Found')
        done();
      });
  });

  it('should not borrow a book if the number in stock is zero', (done) => {
    const bookId = '2';
    chai.request(server)
      .post('/api/v2/users/1/books')
      .set('token', userToken)
      .send({
        bookId
      })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message).to.equal('Book Not available in stock')
        done();
      });
  });

  it('should allow user to borrow a book if number in stock is not zero', (done) => {
    const bookId = '1';
    chai.request(server)
      .post('/api/v2/users/1/books')
      .set('token', userToken)
      .send({
        bookId
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Book added to personal archive. happy reading!')
        done();
      });
  });
  it('should not allow user to borrow a book more than once if not returned', (done) => {
    const bookId = '1';
    chai.request(server)
      .post('/api/v2/users/1/books')
      .set('token', userToken)
      .send({
        bookId
      })
      .end((err, res) => {
        res.should.have.status(403);
        expect(res.body.message).to.equal('You have borrowed this book before !')
        done();
      });
  });
  it('should not borrow a book if user has exceeded borrowing limit', (done) => {
    const bookId = '2';
    chai.request(server)
      .post('/api/v2/users/1/books')
      .set('token', userToken)
      .send({
        bookId
      })
      .end((err, res) => {
        res.should.have.status(403);
        expect(res.body.message).to.equal('Sorry you can not borrow more than 1 books')
        done();
      });
  });
});

// Test for return borrowed books
describe('Check for return borrowed books API route', () => {
  it('should return 403 invalid user if user used the wrong id ', (done) => {
    chai.request(server)
      .put('/api/v2/users/2/books')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal('Invalid Identity');
        done();
      });
  });

  it('should not allow user to return borrowed book if bookId is not specified', (done) => {
    chai.request(server)
      .put('/api/v2/users/1/books')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('borrowedBook Id is required')
        done();
      });
  });
  it('should not return borrowed book if bookId is specified but user is invalid', (done) => {
    const bookId = '7';
    chai.request(server)
      .put('/api/v2/users/2/books')
      .set('token', userToken)
      .send({
        bookId
      })
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal('Invalid Identity');
        done();
      });
  });

  it('should return borrowed book if the book has not been returned before', (done) => {
    const Id = '1';
    chai.request(server)
      .put('/api/v2/users/1/books')
      .set('token', userToken)
      .send({
        Id
      })
      .end((err, res) => {
        //res.should.have.status(200);
        expect(res.body.message).to.equal('book has been returned successfully');
        done();
      });
  });


  it('should return record not found if the book was not borrowed', (done) => {
    const bookId = '1';
    const Id = '100';
    chai.request(server)
      .put('/api/v2/users/1/books')
      .set('token', userToken)
      .send({
        bookId,
        Id
      })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message).to.equal('Record not found');
        done();
      });
  });

  it('should not return book that has been returned', (done) => {
    const Id = '1';
    chai.request(server)
      .put('/api/v2/users/1/books')
      .set('token', userToken)
      .send({
        Id
      })
      .end((err, res) => {
        res.should.have.status(403);
        expect(res.body.message).to.equal('This book has been returned before');
        done();
      });
  });
});

// Test for unreturned books

describe('Check for unreturned books API route', () => {
  it('should return 403 invalid Identity', (done) => {
    chai.request(server)
      .get('/api/v2/users/2/books')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal('Invalid Identity');
        done();
      });
  });
  it('should not get unreturn borrowed book if user id is invalid', (done) => {
    chai.request(server)
      .get('/api/v2/users/a/books?returned=false')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal('Invalid Identity')
        done();
      });
  });
  it('should return Jwt Authentication error (Invalid user)', (done) => {
    chai.request(server)
      .get('/api/v2/users/1/books')
      .set('token', `${userToken}1`)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal('Invalid user')
        done();
      });
  });
  it('should return all books that are yet to be returned', (done) => {
    const returned = false;
    chai.request(server)
      .get('/api/v2/users/1/books?returned=false')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Borrowed books history retrieved')
        done();
      });
  });
});

// To test for delete book API route
describe('Check for Delete books API route', () => {
  it('should return 403 Access denied if the user is not an admin', (done) => {
    chai.request(server)
      .delete('/api/v2/books/2')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(403);
        expect(res.body.message).to.equal('Access Denied!')
        done();
      });
  });

  it('should not allow an admin to delete a book if book specified does not exist', (done) => {
    chai.request(server)
      .delete('/api/v2/books/5')
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message).to.equal('Book does not exist')
        done();
      });
  });

  it('should allow an admin to delete a book if book specified does exist', (done) => {
    chai.request(server)
      .delete('/api/v2/books/2')
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});

// // Test Edit books API route

describe('Check for Update books API route', () => {
  it('should return 403 Acceess denied if the user is not an admin', (done) => {
    chai.request(server)
      .put('/api/v2/books/1')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(403);
        expect(res.body.message).to.equal('Access Denied!');
        done();
      });
  });
  it('should return 404 book does not exist if the user is an admin but the book Id is not a number', (done) => {
    chai.request(server)
      .put('/api/v2/books/a')
      .set('token', adminToken)

      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('sorry, book identity must be a number');
        done();
      });
  });
  it('should return 404 book does not exist if the user is an admin but the book has not been added', (done) => {
    chai.request(server)
      .put('/api/v2/books/30')
      .set('token', adminToken)

      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message).to.equal('Book does not exist');
        done();
      });
  });
  it('should return update the book if the user is an admin and the book exist', (done) => {
    const author = 'David murray';
    chai.request(server)
      .put('/api/v2/books/1')
      .set('token', adminToken)
      .send({
        author
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Book has been updated');
        done();
      });
  });
});

//Test for get all books
describe('Check for get all books api', () => {
  it('should return status 200 for getting all books', (done) => {
    chai.request(server)
      .get('/api/v2/books')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Success!');
        done();
      });
  });
});

//Test for get all user
describe('Check for get all users api', () => {
  it('should return status 200 for getting all users', (done) => {
    chai.request(server)
      .get('/api/v2/users')
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Success!');
        done();
      });
  });

  it('should return 403 Access denied if the user is not an admin', (done) => {
    chai.request(server)
      .get('/api/v2/users')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(403);
        expect(res.body.message).to.equal('Access Denied!')
        done();
      });
  });
});

//Test getBorrowedBooks controller

describe('Check for getBorrowedBooks api route', () => {
  it('should return 403 invalid Identity', (done) => {
    chai.request(server)
      .get('/api/v2/user/2/books')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal('Invalid Identity');
        done();
      });
  });
  it('should get borrowed books if userId is valid', (done) => {
    chai.request(server)
      .get('/api/v2/user/1/books')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Borrowed books history retrieved')
        done();
      });
  });
});

//Test getUserDetails

describe('Check for getUserDetails api route', () => {
  it('should return 403 invalid Identity', (done) => {
    chai.request(server)
      .get('/api/v2/users/2')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal('Invalid Identity');
        done();
      });
  });
  it('should get userDetails if userId is valid', (done) => {
    chai.request(server)
      .get('/api/v2/users/1')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Success!')
        done();
      });
  });
});

//Test Update user

describe('Check for updateuser details api route', () => {
  it('should return 403 invalid Identity', (done) => {
    chai.request(server)
      .put('/api/v2/users/2')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal('Invalid Identity');
        done();
      });
  });
  it('should not update userDetails if userId is invalid', (done) => {
    chai.request(server)
      .put('/api/v2/users/13')
      .set('token', fakeUserToken)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal('User does not exist')
        done();
      });
  });
  it('should update userDetails if userId is valid', (done) => {
    chai.request(server)
      .put('/api/v2/users/1')
      .set('token', userToken)
      .send({
        firstName: 'jeremy'
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Details has been updated')
        done();
      });
  });
});

//TEST FOR CHANGE PASSWORD
describe('Check for change password api route', () => {
  it('should return 403 invalid Identity', (done) => {
    chai.request(server)
      .put('/api/v2/users/2/password')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal('Invalid Identity');
        done();
      });
  });
  it('should not change password if new password is not defined', (done) => {
    chai.request(server)
      .put('/api/v2/users/1/password')
      .set('token', userToken)
      .send({
        oldPassword: 'user1'
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('new password is required')
        done();
      });
  });
  it('should not change password if current password is wrong', (done) => {
    chai.request(server)
      .put('/api/v2/users/1/password')
      .set('token', userToken)
      .send({
        oldPassword: 'user1',
        newPassword: '123456'
      })
      .end((err, res) => {
        res.should.have.status(406);
        expect(res.body.message).to.equal('Current password is wrong')
        done();
      });
  });
  it('should change password if old password is valid', (done) => {
    chai.request(server)
      .put('/api/v2/users/1/password')
      .set('token', userToken)
      .send({
        oldPassword: '123456',
        newPassword: '123456a'

      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Password has been changed')
        done();
      });
  });
});
