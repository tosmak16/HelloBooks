import usersController, { uploadAvatar } from '../controllers/users';
import booksController, { upload } from '../controllers/books';
import authController from '../controllers/auth';


// const upload = multer();
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, './client/public/');
//   }
// });

// const upload = multer({
//   storage
// }).single('file');

export default (app) => {
  app.get('/api/v2/books', booksController.getAllBooks);

  app.post('/api/v2/users/signup', usersController.signup);
  app.post('/api/v2/users/signin', usersController.signin);
  app.post('/api/v2/books/image', upload, booksController.uploadImage);
  app.post('/api/v2/users/image', uploadAvatar, usersController.uploadImage);


  app.use('/api/v2/', authController.auth);

  app.get('/api/v2/users', usersController.list);
  app.get('/api/v2/users/:userId/books', usersController.getUnreturnedBooks);
  app.get('/api/v2/user/:userId/books', usersController.getBorrowedBooks);
  app.post('/api/v2/users/:userId/books', usersController.borrowBooks);
  app.put('/api/v2/users/:userId/books', usersController.returnBooks);
  app.put('/api/v2/users/:userId', usersController.updateUser);
  app.get('/api/v2/users/:userId', usersController.getUserDetails);
  app.put('/api/v2/users/:userId/password', usersController.changePassword);

  app.delete('/api/v2/books/:bookId', booksController.deleteBooks);
  app.post('/api/v2/books', booksController.addBook);
  app.put('/api/v2/books/:bookId', booksController.updateBook);
};
