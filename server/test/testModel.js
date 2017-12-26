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
import BorrowBook from '../models/BorrowedBook';
import db from '../models/index';
import bcrypt from 'bcrypt';
import mockedBooks from '../../client/__mock__/book';
import BorrowedBook from '../models/BorrowedBook';

const book = mockedBooks[0];


const should = chai.should();
const expect = chai.expect;


const user = {
  username: 'userg',
  password: '123456',
  firstName: 'bayren',
  lastName: 'helen',
  email: 'useragg@gmail.com',
};

const borrowbook = {
  userId: 1,
  bookId: 1,
  borrowDate: Date.now(),
  returnType: false,
}


describe('User Model Test', () => {
  it('it should create a new user if all details are correctly inputed', (done) => {
    db.Users.create(user)
      .then((userDetails) => {
        expect(userDetails.username).to.equal(user.username);
        expect(userDetails.email).to.equal(user.email);
        expect(userDetails.firstName).to.equal(user.firstName);
        expect(userDetails.lastName).to.equal(user.lastName);
        done();
      })
  })
  it('it should return error message when firstname is less than one', (done) => {
    const testMockUser = user;
    testMockUser.firstName = 'l';
    db.Users.create(testMockUser)
      .then()
      .catch((response) => {
        expect(response.errors[0].message.toString()).to.equal('Firstname should be longer than two characters');
        done();
      })
  })
  it('it should return error message when lastname is less than one', (done) => {
    const testMockUser = user;
    testMockUser.firstName = 'lll';
    testMockUser.lastName = 'l';
    db.Users.create(testMockUser)
      .then()
      .catch((response) => {
        expect(response.errors[0].message.toString()).to.equal('Lastname should be longer than two characters');
        done();
      })
  })

  it('it should return error message when email is less than two', (done) => {
    const testMockUser = user;
    testMockUser.email = 'l';
    db.Users.create(user)
      .then()
      .catch((response) => {
        expect(response.errors[0].message.toString()).to.equal('Field must contain a valid email address');
        done();
      })
  })
  it('it should return error message when password is not defined', (done) => {
    const testMockUser = user;
    testMockUser.password = '';
    db.Users.create(user)
      .then()
      .catch((response) => {
        expect(response.errors[0].message.toString()).to.equal('password cannot be empty');
        done();
      })
  })
})

describe('Book Model Test', () => {
  it('it should create a book if all details are correctly inputed', (done) => {
    book.isbn = '123456789034';
    book.id = 20;
    db.Books.create(book)
      .then((createdBookDetails) => {
        expect(createdBookDetails.bookTitle).to.equal(book.bookTitle);
        expect(createdBookDetails.author).to.equal(book.author);
        expect(createdBookDetails.category).to.equal(book.category);
        expect(createdBookDetails.image).to.equal(book.image);
        expect(createdBookDetails.summary).to.equal(book.summary);
        expect(createdBookDetails.isbn).to.equal(book.isbn);
        expect(createdBookDetails.stockNumber.toString()).to.equal(book.stockNumber);
        done();
      })
  })

  it('it should return error message when bookTitle is not inputed', (done) => {
    const testMockBook = book;
    testMockBook.bookTitle = '';
    db.Books.create(testMockBook)
      .then()
      .catch((response) => {
        expect(response.errors[0].message.toString()).to.equal('book title cannot be empty');
        done();
      })
  })
  it('it should return error message when author is not inputed', (done) => {
    const testMockBook = book;
    testMockBook.bookTitle = 'foo bar'
    testMockBook.author = '';
    db.Books.create(testMockBook)
      .then()
      .catch((response) => {
        expect(response.errors[0].message.toString()).to.equal('author cannot be empty');
        done();
      })
  })

  it('it should return error message when stockNumber is not inputed', (done) => {
    const testMockBook = book;
    testMockBook.stockNumber = ''
    testMockBook.author = 'jack ben';
    db.Books.create(testMockBook)
      .then()
      .catch((response) => {
        expect(response.errors[0].message.toString()).to.equal('number in stock cannot be empty');
        done();
      })
  })

  it('it should return error message when isbn is not inputed', (done) => {
    const testMockBook = book;
    testMockBook.stockNumber = 70
    testMockBook.isbn = '';
    db.Books.create(testMockBook)
      .then()
      .catch((response) => {
        expect(response.errors[0].message.toString()).to.equal('Isbn cannot be empty');
        done();
      })
  })
})

describe('BorrowedBook Model Test', () => {
  it('it should create a borrowed Book resource if all details are correctly inputed', (done) => {
    db.BorrowedBooks.create(borrowbook)
      .then((borrowbookDetails) => {
        expect(borrowbookDetails.get().bookId).to.equal(borrowbook.bookId);
        expect(borrowbookDetails.get().userId).to.equal(borrowbook.userId);
        done();
      })
  })
  it('should list all borrow records', (done) => {
    db.BorrowedBooks.findAll({
      where: {
        userId: 1
      },
    }).then((borrowedBookedFound) => {
      expect(borrowedBookedFound[0].dataValues.bookId).to.equal(borrowbook.bookId);
      expect(borrowedBookedFound[0].dataValues.userId).to.equal(borrowbook.userId);
      done();
    });
  });
})
