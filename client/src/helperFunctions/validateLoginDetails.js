/** *************************************** */
/* valdiates user login parameters */
/** *************************************** */
/**
 * @param {object} userData 
 * @returns {object} responseMessage in json 
 */
export const validateLoginDetails = async (userData) => {
  const { username, password } = userData;
  const responseMessage = await Promise.resolve(
    _.isEmpty(username) ? 'username is required' :
      _.isEmpty(password) ? 'password is required' : ''
  );
  return responseMessage;
};

export default validateLoginDetails;
