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
    app.delete('/api/users/:userId/books', usersController.deleteBooks);
    app.get('/api/users/:userId/books', usersController.getUnreturnBooks);
    app.put('/api/users/:userId/books', usersController.returnBooks);
    app.get('/api/books', booksController.getAllBooks);
    app.put('/api/books/:bookId/', booksController.updateBook);
    app.get('/api/users', usersController.list);

};