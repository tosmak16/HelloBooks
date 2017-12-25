import _ from 'lodash';
import { queryUsers } from './databaseQuery';
import { handleUpdateUser } from './handleUpdateUser';

export const handleResetPassword = async (email) => {
  const validEmail = /[a-zA-Z]+[a-zA-Z0-9]*@[a-z]+.[a-z]+$/;
  if (_.isEmpty(email)) {
    return { status: 400, message: 'Email is required' };
  }
  if (!email.match(validEmail)) {
    return { status: 400, message: 'It must be a valid email address' };
  }
  const userDetails = await queryUsers({ email });
  if (_.isEmpty(userDetails)) {
    return { status: 400, message: 'Sorry email does not exist' };
  }
  const password = Math.floor(Math.random(100) * 1000000000).toString();
  const { id } = userDetails.get();
  const updateUserResponse = await handleUpdateUser({ password }, id);
  const { status, message } = updateUserResponse;
  return {
    status,
    message: status === 200 ? 'Successful! Check your email for password reset details' : message,
    password: status === 200 ? password : ''
  };
};
export default handleResetPassword;
