import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import $ from 'jquery';

import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import ActivityLoader from '../preloader/ActivityLoader';


let sortedData = '';
let passwordChanged = false;
let displayPreloader = 'none';
/**
 * @class UserProfileForm
 * @extends {React.Component}
 */
export class UserProfileForm extends React.Component {
  /**
   * Creates an instance of UserProfileForm.
   * @param {object} props
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
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }


  /**
   * @function componentWillReceiveProps
   * @param {object} nextProps
   * @memberof UserProfileForm
   * @returns {void}
   */
  componentWillMount() {
    if (!isEmpty(this.props.userData)) {
      this.setState({
        firstName: this.props.userData[0].firstName,
        lastName: this.props.userData[0].lastName,
        email: this.props.userData[0].email,
        mobileNumber: this.props.userData[0].mobileNumber ? this.props.userData[0].mobileNumber : 0,
        membershipType: this.props.userData[0].membershipType,
        profileImage: this.props.userData[0].profileImage,
        show: false,

      });
    }

    $(document).ready(() => {
      $('.modal').modal();
    });
  }

  /**
   * @param {object} nextProps
   * @memberof UserProfileForm
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    displayPreloader = 'none';
    if (!isEmpty(nextProps.userData) && this.state.userDataLoaded) {
      this.setState({
        firstName: nextProps.userData[0].firstName,
        lastName: nextProps.userData[0].lastName,
        email: nextProps.userData[0].email,
        mobileNumber: nextProps.userData[0].mobileNumber ? nextProps.userData[0].mobileNumber : 0,
        membershipType: nextProps.userData[0].membershipType,
        profileImage: nextProps.userData[0].profileImage,
        show: false,

      });
    }
    sortedData = nextProps.userItem[0];
    if (!isEmpty(sortedData.error) && this.state.contentShow) {
      $('#modalE').modal('open');
      this.setState({
        display: false,
        error: sortedData.error,
      });
    } else if (!isEmpty(sortedData.data) && this.state.contentShow) {
      this.setState({
        display: false,
        message: sortedData.data,
        imageloaded: true
      });
      $('#modalS').modal('open');
    }
  }

  /**
   * @param {object} event
   * @memberof UserProfileForm
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
   * @memberof UserProfileForm
   * @returns {void}
   */
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @function handleClose
   * @param {object} event
   * @memberof UserProfileForm
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
   * @param {object} event
   * @memberof UserProfileForm
   * @returns {void}
   */
  handleEdit(event) {
    passwordChanged = true;
    event.preventDefault();
    if (this.state.disabled) {
      this.setState({
        disabled: false,
        buttonText: 'Save',

      });
    }

    if (!this.state.disabled) {
      if (this.state.firstName && this.state.lastName &&
        this.state.email && this.state.membershipType && passwordChanged) {
        this.setState({
          modalErrorMessage: '',
          disabled: true,
          buttonText: 'Edit',
        });
        $('#modalO').modal('open');
        passwordChanged = false;
      }
    }
  }

  /**
   * @function handleClick
   * @param {oject} event
   * @memberof UserProfileForm
   * @returns {void}
   */
  handleClick(event) {
    event.preventDefault();
    this.setState({
      display: true,
    });
    displayPreloader = 'block';
    this.props.updateUser(this.state, localStorage.jwtToken);
    $('#modalO').modal('close');
  }

  /**
   * @memberof UserProfileForm
   * @returns {views} containing form input fields
   */
  render() {
    return (
      <div id="b_page" className="row">
        <form className="form-signin col col l10 offset-l1 col m11 offset-m2 col s12" action="">
          <h4 className="sub-header form-signin-heading"> Personal Info</h4>
          <div className="input-field">
            <label htmlFor="firstname" className="sr-only">First Name</label>
            <input
              type="text"
              id="firstname"
              className="form-control validate"
              placeholder="First Name"
              required

              value={this.state.firstName}
              name="firstName"
              onChange={this.handleInputChange}
              disabled={this.state.disabled}
            />
          </div>
          <div className="input-field">
            <label htmlFor="lastname" className="sr-only">Last Name</label>
            <input
              type="text"
              id="lastname"
              className="form-control validate"
              placeholder="Last Name"
              required

              value={this.state.lastName}
              name="lastName"
              onChange={this.handleInputChange}
              disabled={this.state.disabled}
            />
          </div>
          <div className="input-field">
            <label htmlFor="inputSignUpEmail" className="sr-only">Email address</label>
            <input
              type="email"
              id="inputSignUpEmail"
              className="form-control validate"
              placeholder="Email address"
              required

              value={this.state.email}
              name="email"
              onChange={this.handleInputChange}
              disabled={this.state.disabled}
            />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="inputPhoneNumber">Phone number</label>
            <input
              type="number"
              id="inputPhoneNumber"
              className="form-control validate"
              placeholder="phone number"
              required

              value={this.state.mobileNumber}
              name="mobileNumber"
              onChange={this.handleInputChange}
              disabled={this.state.disabled}
            />
          </div>

          <select
            name="membershipType"
            className="browser-default"
            onChange={this.handleInputChange}
            disabled={this.state.disabled}
          >
            <option defaultValue={this.state.membershipType} >{this.state.membershipType}</option>
            <option value="Basic">Basic</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
          </select>

          <SingleActionModal
            id={'modalE'}
            heading={'Oh!'}
            message={this.state.error ? this.state.error : this.state.modalErrorMessage}
            onHandleExit={this.handleExit}
          />
          <SingleActionModal
            id={'modalS'}
            heading={'Done!'}
            message={this.state.message ? this.state.message : ''}
            onHandleExit={this.handleExit}
          />
          <DoubleActionModal
            id={'modalO'}
            onHandleClick={this.handleClick}
            onHandleClose={this.handleClose}
            bookTitle={''}
            heading={'Do you want to update your details?'}
          />

          <div className="input-field inline">
            <button
              id="editbtn"
              type="button"
              onClick={this.handleEdit}
              className="btn btn-primary pbtn"
            >{this.state.buttonText}</button>
          </div>

          <div
            style={{ display: displayPreloader.toString() }}
            id="activity-loader-id"
            className="activity"
          >
            <ActivityLoader />
          </div>

        </form>
      </div>
    );
  }
}

UserProfileForm.propTypes = {
  userData: PropTypes.arrayOf(PropTypes.any).isRequired,
  userItem: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateUser: PropTypes.func.isRequired,

};


export default UserProfileForm;
