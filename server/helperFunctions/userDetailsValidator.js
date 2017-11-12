import lodash from 'lodash';

const validEmail = /[a-z]+@[a-z]+.[a-z]+$/;

/** *************************************** */
/* valdiates user registration parameters */
/** *************************************** */

export const userDetailsValidator = (body) => {
  const {
    password,
    username,
    email,
    firstName,
    lastName,
    membershipType
  } = body;
  if (lodash.isEmpty(firstName)) {
    return 'first name is required';
  }
  if (lodash.isEmpty(lastName)) {
    return 'last name is required';
  }
  if (firstName.length < 2) {
    return 'firstName length should be more than 2';
  }
  if (lastName.length < 2) {
    return 'lastName length should be more than 2';
  }
  if (lodash.isEmpty(password)) {
    return 'password is required';
  }
  if (password.length < 6) {
    return 'password length should be more than 5';
  }
  if (lodash.isEmpty(username)) {
    return 'username is required';
  }
  if (username.length < 3) {
    return 'username length should be more than 2';
  }
  if (lodash.isEmpty(email)) {
    return 'email is required';
  }
  if (!email.match(validEmail)) {
    return 'Field must contain a valid email address';
  }
  if (lodash.isEmpty(membershipType)) {
    return 'membership type is required';
  }
};

export default userDetailsValidator;
