import {
  addBook,
  deleteBooks,
  updateBook,
  getAllBooks,
  addCategory,
  getCategories
} from '../controllers/books';
import authController from '../middleWare/auth';
import usersController from '../controllers/users';
import userAuth from '../middleWare/userAuth';
import {
  userDetailsValidator,
  bookDetailsValidator,
} from '../middleWare/requestBodyValidator';


export default (app) => {
  /** ** this route is used to get all books in the database *** */
  /**
   * @swagger
   * definitions:
   *   User:
   *     type: object
   *     required:
   *       - username
   *       - password
   *       - email
   *       - firstName
   *       - lastName
   *       - membershipType
   *     properties:
   *       username:
   *         type: string
   *       password:
   *         type: string
   *         format: password
   *       email:
   *         type: string
   *       firstName:
   *          type: string
   *       lastName:
   *          type: string
   *       membershipType:
   *          type: string
   *          default: Basic
   *       mobileNumber:
   *          type: string
   */
  /**
   * @swagger
   * definitions:
   *   Password:
   *     type: object
   *     required:
   *       - oldPassword
   *       - newPassword
   *     properties:
   *       oldPassword:
   *         type: string
   *         format: password 
   *       newPassword:
   *         type: string
   *         format: password
   */
  /**
   * @swagger
   * definitions:
   *   Book:
   *     type: object
   *     required:
   *       - bookTitle
   *       - author
   *       - isbn
   *       - stockNumber
   *       - image
   *       - bookFileUrl
   *       - summary
   *       - category
   *     properties:
   *       bookTitle:
   *         type: string
   *       author:
   *         type: string
   *       isbn:
   *         type: string
   *       stockNumber:
   *         type: string
   *       image:
   *         type: string
   *       bookFileUrl:
   *         type: string
   *       summary:
   *         type: string
   *       category:
   *         type: string
   */
  /**
   * @swagger
   * /books:
   *   get:
   *     description: gets books
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success!
   *       400:
   *         description: Bad request error
   * 
   *       404:
   *         description: No books in store
   *       500:
   *         description: server error
   */
  app.get('/api/v2/books', getAllBooks);
  /* This is sign up route */
  /**
   * @swagger
   * /users/signup:
   *   post:
   *     description: Registers a User
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/User'
   *     responses:
   *       201:
   *         description: Account created
   *       400:
   *         description: |
   *           Username is required, password is required
   *           firstName is required, lastName is required
   *           email is required.
   *       409:
   *         description: |
   *           username already exist
   *           email already exist
   *       500:
   *         description: Server Error
   */
  app.post('/api/v2/users/signup', userDetailsValidator, usersController.signup);
  /* This is sign in route */
  /**
   * @swagger
   * /users/signin:
   *   post:
   *     description: Signs in a User
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/User'
   *     responses:
   *       200:
   *         description: You have successfully logged in
   *       400:
   *         description: please enter valid details.
   *       500:
   *         description: server error
   */
  app.post('/api/v2/users/signin', usersController.signin);
  /* google sign up route */
  app.post('/api/v2/users/googleAuth', usersController.googleSignupAuth);
  /* password reset route */
  app.put('/api/v2/users/resetPassword', usersController.resetPassword);
  /* This is authentication middleware route */
  app.use('/api/v2/', authController.auth);
  /* This route to add books */
  /**
   * @swagger
   * /books:
   *   post:
   *     description: Adds book
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: book
   *         description: Book object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Book'
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       201:
   *         description: Book has been added to store
   *       400:
   *         description: Bad request error
   *       500:
   *         description: server error
   */
  app.post('/api/v2/books', bookDetailsValidator, addBook);
  /**
   * @swagger
   * /categories:
   *   post:
   *     description: Adds categories
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: categoryName
   *         description: category object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/category'
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       201:
   *         description: Book category has been added to store
   *       400:
   *         description: Bad request error
   *       500:
   *         description: server error
   */
  app.post('/api/v2/categories', addCategory);
  /**
   * @swagger
   * /categories:
   *   get:
   *     description: Gets categories
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Book category has been fetched
   *       400:
   *         description: Bad request error
   *       500:
   *         description: server error
   */
  app.get('/api/v2/categories', getCategories);
  /* This route to delete books */
  /**
   * @swagger
   * /books/{bookId}:
   *   delete:
   *     description: deletes book
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: book
   *         description: book's id
   *         in: path
   *         required: true
   *         type: integer
   *         schema:
   *           $ref: '#/definitions/Book'
   *       - name: bookId
   *         description: book's id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       204:
   *         description: book has been deleted
   *       400:
   *         description: Bad request error
   * 
   *       404:
   *         description: Book does not exist
   *       500:
   *         description: server error
   */
  app.delete('/api/v2/books/:bookId', deleteBooks);
  /* This route to modify books details */
  /**
   * @swagger
   * /books/{bookId}:
   *   put:
   *     description: updates book
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: book
   *         description: Book object
   *         in: body
   *         schema:
   *           $ref: '#/definitions/Book'
   *       - name: bookId
   *         description: book's id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Book has been updated
   *       400:
   *         description: Bad request error
   * 
   *       404:
   *         description: Book does not exist
   *       500:
   *         description: server error
   */
  app.put('/api/v2/books/:bookId', updateBook);
  /* This route get list of all users */
  /**
   * @swagger
   * /users:
   *   get:
   *     description: get users list
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Success!
   *       400:
   *         description: Bad request error
   *       500:
   *         description: server error
   */
  app.get('/api/v2/users', usersController.getUserList);
  /* This route to get unretured books */
  /**
   * @swagger
   * /users/{userId}/books?returned=false:
   *   get:
   *     description: gets unretured books
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: userId
   *         description: user's id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Borrowed books history retrieved
   *       400:
   *         description: Bad request error
   *       500:
   *         description: server error
   */
  app.get('/api/v2/users/:userId/books', userAuth.userAuth, usersController.getUnreturnedBooks);
  /* This route to get all user's borrowed books history */
  /**
   * @swagger
   * /user/{userId}/books:
   *   get:
   *     description: get borrowed books
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: userId
   *         description: user's id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Borrowed books history retrieved
   *       400:
   *         description: Bad request error
   *       500:
   *         description: server error
   */
  app.get('/api/v2/user/:userId/books', userAuth.userAuth, usersController.getBorrowedBooks);
  /* This route to borrow books request and response  */
  /**
   * @swagger
   * /users/{userId}/books:
   *   post:
   *     description: borrows books
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: userId
   *         description: user's id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: bookId
   *         description: book id to be borrowed
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *              - bookId
   *           properties:
   *             bookId:
   *               type: integer
   *           example: {
   *             "bookId": "2"
   *           }
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Book added to personal archive. happy reading!
   *       400:
   *         description: Bad request error
   *       403:
   *         description: You have borrowed this book before
   *       500:
   *         description: server error
   */
  app.post('/api/v2/users/:userId/books', userAuth.userAuth, usersController.borrowBooks);
  /* This route to return borrowed books */
  /**
   * @swagger
   * /users/{userId}/books:
   *   put:
   *     description: return borrowed books
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: userId
   *         description: user's id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: Id
   *         description: book id to be returned
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *              - Id
   *           properties:
   *             borrowedBookId:
   *               type: integer
   *           example: {
   *             "Id": "1"
   *           }
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: success!
   *       400:
   *         description: Bad request error
   *       500:
   *         description: server error
   */
  app.put('/api/v2/users/:userId/books', userAuth.userAuth, usersController.returnBooks);
  /* This route to update user details */
  /**
   * @swagger
   * /users/{userId}:
   *   put:
   *     description: update user's details
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: userId
   *         description: user's id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: user
   *         description: User object
   *         in: body
   *         schema:
   *           $ref: '#/definitions/User'
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: success!
   *       400:
   *         description: Bad request error
   *       500:
   *         description: server error
   */
  app.put('/api/v2/users/:userId', userAuth.userAuth, usersController.updateUser);
  /* This route to get user details */
  /**
   * @swagger
   * /users/{userId}:
   *   get:
   *     description: gets user's details
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: userId
   *         description: user's id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: success!
   *       400:
   *         description: Bad request error
   *       500:
   *         description: server error
   */
  app.get('/api/v2/users/:userId', userAuth.userAuth, usersController.getUserDetails);
  /* This route to change password */
  /**
   * @swagger
   * /users/{userId}/password:
   *   put:
   *     description: update password
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: userId
   *         description: user's id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: token
   *         description: authentication token
   *         in: header
   *         required: true
   *         type: string
   *       - name: Body
   *         description: new and current password
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/Password'
   *     responses:
   *       200:
   *         description: success!
   *       400:
   *         description: Bad request error
   *       500:
   *         description: server error
   */
  app.put('/api/v2/users/:userId/password', userAuth.userAuth, usersController.changePassword);
};

