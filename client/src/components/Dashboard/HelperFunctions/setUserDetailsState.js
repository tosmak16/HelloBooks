/**
 * @description helper function to setting userdetail's state
 * @param {object} self 
 * @returns {void}
 */
export const setUserDetailsState = (self) => {
  self.setState({
    firstName: self.props.userData[0].firstName,
    lastName: self.props.userData[0].lastName,
    email: self.props.userData[0].email,
    mobileNumber: self.props.userData[0].mobileNumber ? self.props.userData[0].mobileNumber : 0,
    membershipType: self.props.userData[0].membershipType,
    profileImage: self.props.userData[0].profileImage,
    userData: self.props.userData,
    show: false,
  });
};
export default setUserDetailsState;
