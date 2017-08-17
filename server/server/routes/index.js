import usersController from '../controllers/users';
import booksController from '../controllers/books';
import authController from '../controllers/auth';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome!',
  }));

  app.post('/api/v2/users/signup', usersController.signup);
  app.post('/api/v2/users/signin', usersController.signin);
  app.get('/api/v2/books', booksController.getAllBooks);
  app.get('/api/v2/users', usersController.list);

  app.use('*', authController.auth);


  app.post('/api/v2/users/:userId/books', usersController.borrowBooks);
  app.put('/api/v2/users/:userId/books', usersController.returnBooks);
  app.get('/api/v2/users/:userId/books', usersController.getUnreturnedBooks);
  app.delete('/api/v2/books/:bookId/', booksController.deleteBooks);
  app.post('/api/v2/books', booksController.addBook);
  app.put('/api/v2/books/:bookId/', booksController.updateBook);
  app.get('/api/v2/books', booksController.getAllBooks);
};
