import lodash from 'lodash';
import bcrypt from 'bcrypt';
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
        id: params.userId
      },
    }).then((user) => {
      const { password } = user;
      if (lodash.isEmpty(user) || !bcrypt.compareSync(oldPassword,
        password)) {
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
          password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
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
