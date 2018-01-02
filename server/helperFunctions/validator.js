import _ from 'lodash';

const validNumber = /^[0-9]+$/;
/** *************************************** */
/* valdiates bookId in the body of a request */
/** *************************************** */
/**
 * @description valdiates bookId in the body of a request
 * @param {string} bookId 
 * @returns {object} responseMesaage
 */
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
/**
 * @description valdiates user login parameters 
 * @param {object} requestBody 
 * @returns {object} responseMessage in json 
 */
export const checkUserInput = async (requestBody) => {
  const { username, password } = requestBody;
  const responseMessage = await Promise.resolve(
    _.isEmpty(username) ? 'username is required' :
      _.isEmpty(password) ? 'password is required' : ''
  );
  return responseMessage;
};
