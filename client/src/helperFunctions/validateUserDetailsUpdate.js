import _ from 'lodash';
/** *************************************** */
/* handles update userdetails */
/* it's an async function that return a promise */
/* it checks input parameter validity also */
/** *************************************** */
/**
 * @description handles update userdetails 
 * 
 * @param {object} userData 
 * 
 * @param {number} userId 
 * 
 * @returns {object} response
 */
export const validateUserDetailsUpdate = async (userData) => {
  const validNumber = /^[0-9]+$/;
  const { firstName, lastName, mobileNumber } = userData;
  const response = await Promise.resolve(
    _.isEmpty(firstName) || firstName.length < 2 ?
      'first name length should be at least than 2'
      : _.isEmpty(lastName) || lastName.length < 2 ?
        'last name length should be at least than 2'
        : _.isEmpty(mobileNumber) || !mobileNumber.match(validNumber) ?
          'mobile number should be number'
          : _.isEmpty(mobileNumber) || mobileNumber.length < 2 ?
            'mobile number length should be at least than 2'
            : ''
  );
  return response;
};
export default validateUserDetailsUpdate;
