import _ from 'lodash';
/** *************************************** */
/* it handles change password request */
/* it's an async function which returns a promise */
/** *************************************** */
/**
 * @description it handles change password request
 * 
 * @param {object} userData 
 * 
 * @param {object} params 
 * 
 * @returns {object} response 
 */
export const validatePasswordChange = async (userData) => {
  const {
    oldPassword,
    newPassword,
    confirmPassword,
  } = userData;
  const response = await Promise.resolve(
    _.isEmpty(oldPassword) ?
      'current password is required'
      : _.isEmpty(newPassword) ?
        'new password is required'
        : _.isEmpty(confirmPassword) ?
          'Comfirm Password the required fields'
          : oldPassword === newPassword ?
            'Oh! sorry you can not use the same password'
            : newPassword !== confirmPassword ?
              'new password and confirm password does not match'
              : newPassword.length < 6 ?
                'password length must be more than 5'
                : ''
  );
  return response;
};

export default validatePasswordChange;
