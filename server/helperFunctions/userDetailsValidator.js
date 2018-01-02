import _ from 'lodash';

const validEmail = /[a-zA-Z]+[a-zA-Z0-9]*@[a-z]+.[a-z]+$/;
/** *************************************** */
/* valdiates user registration parameters */
/** *************************************** */
/**
 * @description this method valdiates user registration parameters
 * @param {object} requestBody 
 * @returns {object} responseMessage
 */
export const userDetailsValidator = async (requestBody) => {
  const { password, username, email, firstName, lastName } = requestBody;
  const responseMessage = await Promise
    .resolve(
    // Checks if first name is empty
      _.isEmpty(firstName) ? 'first name is required' :
      // Checks if last name is empty  
        _.isEmpty(lastName) ? 'last name is required' :
        // Checks if first name value length is less than two 
          firstName.length < 2 ? 'firstName length should be more than 2' :
          // Checks if last name value length is less than two 
            lastName.length < 2 ? 'lastName length should be more than 2' :
            // Checks if password is inputed
              _.isEmpty(password) ? 'password is required' :
              // Checks if password length is valid
                password.length < 6 ? 'password length should be more than 5' :
                // Checks if username is empty
                  _.isEmpty(username) ? 'username is required' :
                  // Checks if username length is valid
                    username.length < 3 ?
                      'username length should be more than 2' :
                      // Checks if email is empty 
                      _.isEmpty(email) ? 'email is required' :
                      // Checks if email matches valid email 
                        !email.match(validEmail) ?
                          'Field must contain a valid email address' :
                          '');
  return responseMessage;
};
export default userDetailsValidator;
