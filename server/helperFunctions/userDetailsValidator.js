import _ from 'lodash';

const validEmail = /[a-zA-Z]+[a-zA-Z0-9]*@[a-z]+.[a-z]+$/;
/** *************************************** */
/* valdiates user registration parameters */
/** *************************************** */

export const userDetailsValidator = async (body) => {
  const { password, username, email, firstName, lastName, membershipType } = body;
  const responseMessage = await Promise
    .resolve(
      _.isEmpty(firstName) ? 'first name is required' :
        _.isEmpty(lastName) ? 'last name is required' :
          firstName.length < 2 ? 'firstName length should be more than 2' :
            lastName.length < 2 ? 'lastName length should be more than 2' :
              _.isEmpty(password) ? 'password is required' :
                password.length < 6 ? 'password length should be more than 5' :
                  _.isEmpty(username) ? 'username is required' :
                    username.length < 3 ?
                      'username length should be more than 2' :
                      _.isEmpty(email) ? 'email is required' :
                        !email.match(validEmail) ?
                          'Field must contain a valid email address' :
                          _.isEmpty(membershipType) ?
                            'membership type is required' :
                            '');
  return responseMessage;
};
export default userDetailsValidator;
