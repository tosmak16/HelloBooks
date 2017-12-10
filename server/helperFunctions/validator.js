import _ from 'lodash';

const validNumber = /^[0-9]+$/;

/** *************************************** */
/* valdiates bookId in the body of a request */
/** *************************************** */

export const validateIds = async (bookId) => {
  const responseMessage = await Promise.resolve(
    _.isUndefined(bookId) ? 'sorry, bookId can not be undefined' :
      _.isEmpty(bookId) ? 'sorry, bookId can not be empty' :
        _.isArray(bookId) ? 'sorry, book identity number can not be an array' :
          _.isBoolean(bookId) ?
            'sorry, book identity number can not be a boolean' :
            !bookId.match(validNumber) ?
              'sorry, book identity must be a number' :
              ''
  );
  return responseMessage;
};

/** *************************************** */
/* valdiates user login parameters */
/** *************************************** */

export const checkUserInput = async (body) => {
  const { username, password } = body;
  const responseMessage = await Promise.resolve(
    _.isEmpty(username) ? 'username is required' :
      _.isEmpty(password) ? 'password is required' : ''
  );
  return responseMessage;
};
