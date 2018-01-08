import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';

import getUserdetails from '../../../actions/getUser';
import DashboardSidebar from '../DashboardSidebar';
import { UserProfileForm } from '../UserProfileForm';
import updateUser from '../../../actions/updateUser';
import { uploadUserAvatar } from '../../../actions/uploadUserAvatar';
import { logout } from '../../../actions/logout';
import { updateUserDetailsTemp } from '../HelperFunctions/updateUserDetailsTemp';
import { setUserDetailsState } from '../HelperFunctions/setUserDetailsState';
import { validateUserDetailsUpdate } from '../../../helperFunctions/validateUserDetailsUpdate';

/**
 * @export UserProfile
 * 
 * @class UserProfile
 * 
 * @extends {React.Component}
 */
export class UserProfile extends React.Component {
  /**
 * Creates an instance of UserProfileForm.
 * 
 * @param {object} props
 * 
 * @memberof UserProfileForm
 */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      profileImage: '',
      membershipType: 'Basic',
      userDataLoaded: true,
      disabled: true,
      buttonText: 'Edit',
      contentShow: false,
      error: '',
      message: '',
      image: '',
      summary: '',
      imageHeight: 0,
      imageWidth: 0,
      imageSize: 0,
      file: '',
      imagePreviewUrl: '',
      modalErrorMessage: '',
      imageloaded: false,
      displayPreloader: 'none',
      userDetailChecked: true,
      userData: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }
  /**
    * @function componentDidMount
    *
    * @memberof UserProfile
    *
    * @returns {void}
    */
  componentWillMount() {
    $(document).ready(() => {
      $('.modal').modal();
    });
    if (isEmpty(this.props.userData)) {
      this.props.getUserdetails(localStorage.jwtToken);
    }
    if (!isEmpty(this.props.userData) && this.state.userDetailChecked) {
      setUserDetailsState(self = this);
    }
  }
  /**
  * @param {object} nextProps
  *
  * @memberof UserProfileForm
  *
  * @returns {void}
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      displayPreloader: 'none'
    });
    if (!isEmpty(nextProps.userData) && this.state.userDetailChecked) {
      this.setState({
        firstName: nextProps.userData[0].firstName,
        lastName: nextProps.userData[0].lastName,
        email: nextProps.userData[0].email,
        mobileNumber: nextProps.userData[0].mobileNumber ? nextProps.userData[0].mobileNumber : 0,
        membershipType: nextProps.userData[0].membershipType,
        profileImage: nextProps.userData[0].profileImage,
        userData: nextProps.userData,
        show: false,
      });
    }
    const sortedData = nextProps.userItem[0];
    if (!isEmpty(sortedData.error) && this.state.contentShow) {
      $('#modalE').modal('open');
      this.setState({
        display: false,
        error: sortedData.error,
        contentShow: false
      });
    } else if (!isEmpty(sortedData.data) && this.state.contentShow) {
      updateUserDetailsTemp(this.state);
      this.setState({
        display: false,
        message: sortedData.data,
        imageloaded: true,
        contentShow: false
      });
      $('#modalS').modal('open');
    }
  }
  /**
  * @param {object} event
  *
  * @memberof UserProfileForm
  *
  * @returns {void}
  */
  handleExit(event) {
    event.preventDefault();

    $('#modalE').modal('close');
    $('#modalS').modal('close');

    this.setState({
      error: '',
      message: '',
      file: '',
    });
  }
  /**
   * @param {object} event
   * 
   * @memberof UserProfileForm
   * 
   * @returns {void}
   */
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @function handleClose
   * 
   * @param {object} event
   * 
   * @memberof UserProfileForm
   * 
   * @returns {void}
   */
  handleClose(event) {
    event.preventDefault();
    this.setState({
      displayErrorMessage: false,
    });
    $('#modalO').modal('close');
  }

  /**
   * @function handleEdit
   * 
   * @param {object} event
   * 
   * @memberof UserProfileForm
   * 
   * @returns {void}
   */
  handleEdit(event) {
    event.preventDefault();
    if (this.state.disabled) {
      this.setState({
        disabled: false,
        userDetailChecked: false,
        buttonText: 'Save',
      });
    }
    if (!this.state.disabled) {
      validateUserDetailsUpdate(this.state)
        .then((responseMessage) => {
          if (responseMessage !== '') {
            this.setState({
              modalErrorMessage: responseMessage,
              disabled: false,
            });
            $('#modalE').modal('open');
          } else if (this.state.firstName && this.state.lastName &&
            this.state.email && this.state.membershipType) {
            this.setState({
              modalErrorMessage: '',
              disabled: true,
              buttonText: 'Edit',
            });
            $('#modalO').modal('open');
          }
        });
    }
  }
  /**
   * @function handleClick
   * 
   * @param {oject} event
   * 
   * @memberof UserProfileForm
   * 
   * @returns {void}
   */
  handleClick(event) {
    event.preventDefault();
    this.setState({
      displayPreloader: 'block',
      display: true,
      contentShow: true
    });
    this.props.updateUser(this.state, localStorage.jwtToken);
    $('#modalO').modal('close');
  }
  /**
   * @function render
   * 
   *  @returns {void}
   * 
   * @memberof UserProfile
   */
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <DashboardSidebar
              logout={this.props.logout}
              error={this.props.error}
              imageUrl={this.props.imageUrl}
              userData={this.props.userData}
              message={this.props.message}
              updateUser={this.props.updateUser}
              uploadAvatar={this.props.uploadUserAvatar}
            />
            <UserProfileForm
              handleClick={this.handleClick}
              handleClose={this.handleClose}
              handleEdit={this.handleEdit}
              handleExit={this.handleExit}
              handleInputChange={this.handleInputChange}
              state={this.state}
            />
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  error: PropTypes.string.isRequired,
  getUserdetails: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadUserAvatar: PropTypes.func.isRequired,
  userData: PropTypes.arrayOf(PropTypes.any).isRequired,
  userItem: PropTypes.arrayOf(PropTypes.any).isRequired,
};

/**
 * @param {arrayOfObject} state
 * 
 *  @returns {object} of some reducer state
 */
function mapStateToProps(state) {
  return {
    userData: state.userDetail[0].data,
    userDataError: state.userDetail[0].error,
    userItem: state.updateUser,
    imageUrl: state.userProfileImage[0].response,
    error: state.updateUser[0].error.toString(),
    message: state.updateUser[0].data.toString(),
  };
}

export default connect(mapStateToProps, {
  getUserdetails,
  updateUser,
  uploadUserAvatar,
  logout
})(UserProfile);
