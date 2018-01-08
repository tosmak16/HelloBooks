/**
 * @description helper function for updating user details temporarily
 * 
 * @param {object} userDetailsState 
 * 
 * @returns {void}
 */
export const updateUserDetailsTemp = (userDetailsState) => {
  const {
    userData,
    firstName,
    lastName,
    mobileNumber,
    email,
    membershipType,
    profileImage
  } = userDetailsState;
  userData[0] = {
    firstName,
    lastName,
    mobileNumber,
    membershipType,
    email,
    profileImage
  };
};
export default updateUserDetailsTemp;
