import _ from 'lodash';
import bcrypt from 'bcrypt';
import db from '../models/index';

/** *************************************** */
/* it handles change password request */
/* it's an async function which returns a promise */
/** *************************************** */
/**
 * @description it handles change password request
 * 
 * @param {object} body 
 * 
 * @param {object} params 
 * 
 * @returns {object} response message
 */
export const handlePasswordChange = async (body, params) => {
  let response = { status: 200, message: 'okay' };
  const { oldPassword, newPassword } = body;
  response = await Promise.resolve(
    _.isEmpty(oldPassword) ? { status: 400, message: 'current password is required' }
      : _.isEmpty(newPassword) ? { status: 400, message: 'new password is required' }
        : await db.Users
          .findOne({
            where: {
              id: params.userId
            },
          }).then((user) => {
            const { password } = user;
            if (_.isEmpty(user) || !bcrypt.compareSync(oldPassword,
              password)) {
              return {
                status: 406,
                message: 'Current password is wrong'
              };
            }
            return user
              .update({
                password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
              })
              .then(() => ({
                status: 200,
                message: 'Password has been changed'
              })).catch(error => ({
                status: 500,
                message: error
              }));
          }));
  return response;
};
export default handlePasswordChange;
