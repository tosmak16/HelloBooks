import lodash from 'lodash';

const validNumber = /^[0-9]+$/;

/** *************************************** */
/* valdiates bookId in the body of a request */
/** *************************************** */

export const validateIds = (bookId) => {
  if (lodash.isUndefined(bookId)) {
    return 'sorry, bookId can not be undefined';
  }
  if (lodash.isEmpty(bookId)) {
    return 'sorry, bookId can not be empty';
  }
  if (lodash.isArray(bookId)) {
    return 'sorry, book identity number can not be an array';
  }
  if (lodash.isBoolean(bookId)) {
    return 'sorry, book identity number can not be a boolean';
  }
  if (!bookId.match(validNumber)) {
    return 'sorry, book identity must be a number';
  }
};

/** *************************************** */
/* valdiates user login parameters */
/** *************************************** */

export const checkUserInput = (body) => {
  const {
    username,
    password
  } = body;
  if (lodash.isEmpty(username)) {
    return 'username is required';
  }
  if (lodash.isEmpty(password)) {
    return 'password is required';
  }
};
