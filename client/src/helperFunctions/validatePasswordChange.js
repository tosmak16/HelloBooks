import _ from 'lodash';
/** *************************************** */
/* it handles change password request */
/* it's an async function which returns a promise */
/** *************************************** */
/**
 * @description it handles change password request
 * @param {object} userData 
 * @param {object} params 
 * @returns {object} response 
 */
export const validatePasswordChange = async (userData) => {
  const {
    oldPassword,
    newPassword
  } = userData;
  const response = await Promise.resolve(
    _.isEmpty(oldPassword) ?
      'current password is required'
      : _.isEmpty(newPassword) ?
        'new password is required'
        : oldPassword === newPassword ?
          'Oh! sorry you can not use the same password'
          : ''
  );
  return response;
};

export default validatePasswordChange;
