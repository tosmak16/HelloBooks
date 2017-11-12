import lodash from 'lodash';
import db from '../models/index';

const validNumber = /^[0-9]+$/;
/** *************************************** */
/* handles update userndetails */
/* it's an async function that return a promise */
/* it checks input parameter validity also */
/** *************************************** */

export const handleUpdateUser = async (body, userId) => {
  let responseMessage = '';
  let responseType = '';
  let response = {
    responseMessage,
    responseType
  };
  const {
    firstName,
    lastName,
    mobileNumber,
    membershipType,
    profileImage
  } = body;
  if (lodash.isEmpty(firstName)) {
    responseMessage = 'first name is required';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  if (lodash.isEmpty(lastName)) {
    responseMessage = 'last name is required';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  if (firstName.length < 2) {
    responseMessage = 'firstName length should be more than 2';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  if (lastName.length < 2) {
    responseMessage = 'lastName length should be more than 2';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  if (lodash.isEmpty(membershipType)) {
    responseMessage = 'memebership type is required';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  if (lodash.isEmpty(mobileNumber)) {
    responseMessage = 'mobile number is required';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  if (!mobileNumber.match(validNumber)) {
    responseMessage = 'mobile number should be number';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  if (mobileNumber.length < 2) {
    responseMessage = 'mobile number length should be more than 2';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  if (lodash.isEmpty(profileImage)) {
    responseMessage = 'profile image is required';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  await db.Users
    .findById(userId)
    .then((user) => {
      if (lodash.isEmpty(user)) {
        responseMessage = 'User does not exist';
        responseType = 401;
        response = {
          responseMessage,
          responseType
        };
        return response;
      }
      return user
        .update({
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
          mobileNumber: mobileNumber || user.mobileNumber,
          membershipType: membershipType || user.membershipType,
          profileImage: profileImage || user.profileImage,
        })
        .then(() => {
          responseMessage = 'Details has been updated';
          responseType = 200;
          response = {
            responseMessage,
            responseType,
            user
          };
          return response;
        })
        .catch((errorMessage) => {
          responseMessage = errorMessage;
          responseType = 500;
          response = {
            responseMessage,
            responseType
          };
          return response;
        });
    });
  return response;
};

export default handleUpdateUser;
