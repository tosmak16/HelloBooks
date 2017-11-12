import booksController from '../controllers/books';
import authController from '../middleWare/auth';
import usersController from '../controllers/users';
import userAuth from '../middleWare/userAuth';


export default (app) => {
  /** ** this route is used to get all books in the database *** */
  app.get('/api/v2/books', booksController.getAllBooks);

  /* This is sign up route */
  app.post('/api/v2/users/signup', usersController.signup);

  /* This is sign in route */
  app.post('/api/v2/users/signin', usersController.signin);

  /* This is authentication middleware route */
  app.use('/api/v2/', authController.auth);

  /* This route to delete books */
  app.delete('/api/v2/books/:bookId', booksController.deleteBooks);

  /* This route to add books */
  app.post('/api/v2/books', booksController.addBook);

  /* This route to modify books details */
  app.put('/api/v2/books/:bookId', booksController.updateBook);
  /* This route get list of all users */
  app.get('/api/v2/users', usersController.getUserList);


  /* This route to get unretured books */
  app.get('/api/v2/users/:userId/books', userAuth.userAuth, usersController.getUnreturnedBooks);

  /* This route to get all user's borrowed books history */
  app.get('/api/v2/user/:userId/books', userAuth.userAuth, usersController.getBorrowedBooks);

  /* This route to borrow books request and response  */
  app.post('/api/v2/users/:userId/books', userAuth.userAuth, usersController.borrowBooks);

  /* This route to return borrowed books */
  app.put('/api/v2/users/:userId/books', userAuth.userAuth, usersController.returnBooks);

  /* This route to update user details */
  app.put('/api/v2/users/:userId', userAuth.userAuth, usersController.updateUser);

  /* This route to get user details */
  app.get('/api/v2/users/:userId', userAuth.userAuth, usersController.getUserDetails);

  /* This route to change password */
  app.put('/api/v2/users/:userId/password', userAuth.userAuth, usersController.changePassword);
};
