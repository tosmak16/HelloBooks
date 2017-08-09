const usersController = require('../controllers').users
const booksController = require('../controllers').books
const authController = require('../controllers').auth


module.exports = (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome!',
    }));

    app.post('/api/users/signup', usersController.signup);
    app.post('/api/users/signin', usersController.signin);
    app.get('/api/books', booksController.getAllBooks);
    app.get('/api/users', usersController.list);

    app.use('*', authController.auth);


    app.post('/api/users/:userId/books', usersController.borrowBooks);
    app.put('/api/users/:userId/books', usersController.returnBooks);
    app.get('/api/users/:userId/books', usersController.getUnreturnedBooks);
    app.delete('/api/users/:userId/books', usersController.deleteBooks);
    app.post('/api/books', booksController.addBook);
    app.put('/api/books/:bookId/', booksController.updateBook);
    app.get('/api/books', booksController.getAllBooks);

};