let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
const { SHA256 } = require('crypto-js');
var expect = chai.expect;
var sinon = require('sinon');
var auth = require('../server/controllers/auth.js');

const User = require('../server/models').Users;
const Book = require('../server/models').Books;
const borrowbook = require('../server/models').borrowbook;
const jwt = require('jsonwebtoken');
const sequelise = require('sequelize');
const pg = require('pg');
const pgh = require('pg-hstore');


chai.use(chaiHttp);
let token;
var next = sinon.spy();

//Registration test
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
        let user = {
            username: "y34",
            password: SHA256("hello").toString(),
            firstName: "bayren",
            lastName: "helen",
            email: "user@gmail.com",
            membershipType: "basic",
            role: "user",
        }
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

//sign in test

describe('Check for login ', () => {
    it('should not allow the user to login', (done) => {
        chai.request(server)
            .post('/api/users/signin')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('should allow the user to login', (done) => {
        let user = {
            username: "y34",
            password: SHA256("hello").toString(),
        }
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

})

//Authetication middleware
describe('Check for token for user authentication', () => {
    it('should return token not provided if no token was entered', (done) => {
        chai.request(server)
            .post('/')
            .end((err, res) => {
                console.log(res.text);
                res.should.have.status(404);
                done();
            });
    })
})

//borrow books API route Test
describe('check borrowbooks route', () => {
    it('should return 200 invalid user ', (done) => {
        chai.request(server)
            .post('/api/users/1/books')
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(404);
                console.log(res.text);
                done();
            });
    })
    it('should not borrow a book if bookId is not specified', (done) => {
        chai.request(server)
            .post('/api/users/26/books')
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(404);
                console.log(res.text);
                done();
            });
    })

    it('should not borrow a book if bookId is specified but user is invalid', (done) => {
        let bookId = '7';
        chai.request(server)
            .post('/api/users/1/books')
            .set('token', token)
            .send(bookId)
            .end((err, res) => {
                res.should.have.status(404);
                console.log(res.text);
                done();
            });
    })
    it('should not borrow a book if the number in stock is zero', (done) => {
        let bookId = '1';
        chai.request(server)
            .post('/api/users/26/books')
            .set('token', token)
            .send({ bookId: bookId })
            .end((err, res) => {
                res.should.have.status(404);
                console.log(res.text);
                done();
            });
    })
    it('should not borrow a book if number in stock is zero', (done) => {
        let bookId = '7';
        chai.request(server)
            .post('/api/users/26/books')
            .set('token', token)
            .send({ bookId: bookId })
            .end((err, res) => {
                res.should.have.status(200);
                console.log(res.text);
                done();
            });
    })

})