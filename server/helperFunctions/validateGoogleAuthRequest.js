import _ from 'lodash';
/** *************************************** */
/* valdiates user google sign up and login parameters */
/** *************************************** */
/**
 * @description this method valdiates user registration parameters
 * 
 * @param {object} requestBody 
 * 
 * @returns {object} response Message
 */
export const validateGoogleAuthRequest = (requestBody) => {
  const { password, username, email, firstName, lastName } = requestBody;
  if (_.isEmpty(password) || _.isEmpty(username) || _.isEmpty(email)
    || _.isEmpty(firstName) || _.isEmpty(lastName)) {
    return { status: 400, message: 'invalid account details' };
  }
  return '';
};
export default validateGoogleAuthRequest;
