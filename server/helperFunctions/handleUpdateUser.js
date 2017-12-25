import _ from 'lodash';
import db from '../models/index';
import bcrypt from 'bcrypt';

const validNumber = /^[0-9]+$/;

/** *************************************** */
/* handles update userdetails */
/* it's an async function that return a promise */
/* it checks input parameter validity also */
/** *************************************** */
/**
 * @param {object} body 
 * @param {number} userId 
 * @returns {object} response
 */
export const handleUpdateUser = async (body, userId) => {
  let response = {
    status: 200,
    message: 'okay'
  };
  const {
    firstName,
    lastName,
    mobileNumber,
    membershipType,
    profileImage,
    password,
  } = body;
  response = await Promise.resolve(
    !_.isEmpty(firstName) && firstName.length < 2 ?
      {
        status: 400,
        message: 'firstName length should be more than 2'
      } : !_.isEmpty(lastName) && lastName.length < 2 ?
        {
          status: 400,
          message: 'lastName length should be more than 2'
        } : !_.isEmpty(mobileNumber) && !mobileNumber.match(validNumber) ?
          {
            status: 400,
            message: 'mobile number should be number'
          } : !_.isEmpty(mobileNumber) && mobileNumber.length < 2 ?
            {
              status: 400,
              message: 'mobile number length should be more than 2'
            } : !_.isEmpty(password) && password.length < 6 ?
              { status: 400, message: 'password length should be more than 5' } :
              await db.Users
                .findById(userId)
                .then((user) => {
                  if (_.isEmpty(user)) {
                    return {
                      status: 401,
                      message: 'User does not exist'
                    };
                  }
                  return user
                    .update({
                      firstName: firstName || user.firstName,
                      lastName: lastName || user.lastName,
                      mobileNumber: mobileNumber || user.mobileNumber,
                      membershipType: membershipType || user.membershipType,
                      profileImage: profileImage || user.profileImage,
                      password: password ? bcrypt.hashSync(password, bcrypt.genSaltSync(10)) : user.password
                    })
                    .then(() => ({
                      status: 200,
                      message: 'Details has been updated',
                      user
                    }))
                    .catch(errorMessage => ({
                      status: 500,
                      message: errorMessage
                    }));
                })
  );
  return response;
};

export default handleUpdateUser;
