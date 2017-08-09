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
let adminToken;
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
    it('should generate token and allow the user to login', (done) => {
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

    it('should generate token for admin to login', (done) => {
        let user = {
            username: "admin",
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
                    adminToken = res.body.token;
                    res.should.have.status(201);
                    console.log(adminToken);
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
    it('should return 404 invalid user ', (done) => {
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
            .send({ bookId: bookId })
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

//Test for return borrowed books

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
    })
    it('should not allow user to return borrowed book if bookId is not specified', (done) => {
        chai.request(server)
            .put('/api/users/26/books')
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(404);
                console.log(res.text);
                done();
            });
    })

    it('should not return borrowed book if bookId is specified but user is invalid', (done) => {
        let bookId = '7';
        chai.request(server)
            .put('/api/users/1/books')
            .set('token', token)
            .send({ bookId: bookId })
            .end((err, res) => {
                res.should.have.status(404);
                console.log(res.text);
                done();
            });
    })
    it('should return borrowed book if the book has not been returned before or vice versa', (done) => {
        let bookId = '7';
        let Id = 26;
        chai.request(server)
            .put('/api/users/26/books')
            .set('token', token)
            .send({ bookId: bookId, Id: Id })
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
    })

    it('should return record not found if the book was not borrowed', (done) => {
        let bookId = '7';
        let Id = 100;
        chai.request(server)
            .put('/api/users/26/books')
            .set('token', token)
            .send({ bookId: bookId, Id: Id })
            .end((err, res) => {

                res.should.have.status(404);
                console.log(res.text);

                done();
            });
    })
})

//Test for unreturned books

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
    })
    it('should return Jwt Authentication error (Invalid signature)', (done) => {
        chai.request(server)
            .get('/api/users/1/books')
            .set('token', token + "1")
            .end((err, res) => {
                res.should.have.status(403);
                console.log(res.text);
                done();
            });
    })
    it('should return all books that are yet to be returned', (done) => {
        let returned = false;
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
    })

})

//To test for delete book API route
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
    })
    it('should return 403 Access denied if the user is not an admin and vice versa', (done) => {
        let bookId = '5';
        chai.request(server)
            .delete('/api/users/26/books')
            .set('token', token)
            .send({ bookId: bookId })
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
    })
})

//Test for add books API route
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

        })
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

        })

        it('should return add new books if the user is an admin and the required book information are inputed', (done) => {
            let books = {
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

        })
    })
    //Test Edit books API route

describe('Check for Add books API route', () => {
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

    })
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

    })
    it('should return update the book if the user is an admin and the book exist', (done) => {
        let author = 'David murray';
        chai.request(server)
            .put('/api/books/38')
            .set('token', adminToken)
            .send({ author: author })
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

    })


})