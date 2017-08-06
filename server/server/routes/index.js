const usersController = require('../controllers').users
const booksController = require('../controllers').books
const authController = require('../controllers').auth

module.exports = (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome!',
    }));

    app.post('/api/users/signup', usersController.signup);
    app.post('/api/users/signin', usersController.signin);

    app.use('*', authController.auth);


    app.post('/api/books', booksController.addBook);
    app.post('/api/users/:userId/books', usersController.borrowBooks);
    app.get('/api/users/:userId/books', usersController.getUnreturnBooks);
    app.get('/api/books', booksController.getAllBooks);
    app.put('/api/books/:bookId/', booksController.updateBook);
    app.get('/api/users', usersController.list);
};