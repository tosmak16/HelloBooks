import lodash from 'lodash';
import {
  SHA256
} from 'crypto-js';
import db from '../models/index';

/** *************************************** */
/* it handles change password request */
/* it's an async function which returns a promise */
/** *************************************** */

export const handlePasswordChange = async (body, params) => {
  let responseMessage = '';
  let responseType = '';
  let response = {
    responseMessage,
    responseType
  };
  const {
    oldPassword,
    newPassword
  } = body;
  if (lodash.isEmpty(oldPassword)) {
    responseMessage = 'current password is required';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  if (lodash.isEmpty(newPassword)) {
    responseMessage = 'new password is required';
    responseType = 400;
    response = {
      responseMessage,
      responseType
    };
    return response;
  }
  await db.Users
    .findOne({
      where: {
        id: params.userId,
        password: SHA256(oldPassword).toString(),
      },
    }).then((user) => {
      if (lodash.isEmpty(user)) {
        responseMessage = 'Current password is wrong';
        responseType = 406;
        response = {
          responseMessage,
          responseType
        };
        return response;
      }
      return user
        .update({
          password: SHA256(newPassword).toString()
        })
        .then(() => {
          responseMessage = 'Password has been changed';
          responseType = 200;
          response = {
            responseMessage,
            responseType
          };
          return response;
        }).catch((error) => {
          responseMessage = error;
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


export default handlePasswordChange;
