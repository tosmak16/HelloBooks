import _ from 'lodash';

export const validateGoogleAuthRequest = (requestBody) => {
  console.log(requestBody);
  const { password, username, email, firstName, lastName } = requestBody;
  if (_.isEmpty(password) || _.isEmpty(username) || _.isEmpty(email)
    || _.isEmpty(firstName) || _.isEmpty(lastName)) {
    return { status: 400, message: 'invalid account details' };
  }
  return '';
};
export default validateGoogleAuthRequest;
