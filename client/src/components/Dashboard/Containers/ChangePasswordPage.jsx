import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';
import getUserdetails from '../../../actions/getUserDetails';
import DashboardSidebar from '../DashboardSidebar';
import { ChangePasswordForm } from '../ChangePasswordForm';
import updateUser from '../../../actions/updateuserDetails';
import { uploadAvatar } from '../../../actions/uploadUserAvatar';
import changePassword from '../../../actions/changePassword';
import { logout } from '../../../actions/logoutAction';

/**
 * @export
 * @class ChangePasswordPage
 * @extends {React.Component}
 */
export class ChangePasswordPage extends React.Component {
  /**
  * Creates an instance of ChangePasswordForm.
  * @param {object} props
  * @memberof ChangePasswordPage
  */
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      error: '',
      display: false,
      errors: '',
      message: '',
      displayPreloader: 'none'
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }
  /**
   * @function compenentWillReceiveProps
   * @memberof ChangePasswordPage
   * @returns {void}
   */
  componentWillMount() {
    if (isEmpty(this.props.userData)) {
      this.props.getUserdetails(localStorage.jwtToken);
    }
    $(document).ready(() => {
      $('.modal').modal();
    });
  }
  /**
  * @param {object} nextProps
  * @memberof ChangePasswordPage
  * @returns {void}
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      displayPreloader: 'none'
    });
    const sortedData = nextProps.passwordChange[0];
    if (this.state.display) {
      if (!isEmpty(sortedData.error) && this.state.display) {
        $('#modalError').modal('open');
        this.setState({
          display: false,
          errors: sortedData.error,
        });
      } else if (!isEmpty(sortedData.data) && this.state.display) {
        this.setState({
          display: false,
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          message: sortedData.data,
        });
        $('#modalSuccess').modal('open');
      }
    }
  }
  /**
   * @param {object} event
   * @memberof ChangePasswordForm
   * @returns {void}
   */
  handleClose(event) {
    event.preventDefault();
    $('#modalOpen').modal('close');
    this.setState({
      displayErrorMessage: false,
    });
  }
  /**
   *@returns {void}
   * @param {object} event
   * @memberof ChangePasswordForm
   */
  handleExit(event) {
    event.preventDefault();

    $('#modalError').modal('close');
    $('#modalSuccess').modal('close');
    this.setState({
      displayErrorMessage: false,
    });
  }
  /**
   *@returns {void}
   * @param {object} event
   * @memberof ChangePasswordForm
   */
  handleClick(event) {
    event.preventDefault();
    this.setState({
      displayPreloader: 'block',
      display: true,
    });
    $('#modalOpen').modal('close');
    this.props.changePassword(this.state, localStorage.jwtToken);
  }
  /**
   * @param {object} event
   * @memberof ChangePasswordForm
   *  @returns {void}
   */
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param {object} event
   * @memberof ChangePasswordForm
   * @returns {void}
   */
  handleSave(event) {
    event.preventDefault();
    if (!this.state.newPassword || !this.state.oldPassword || !this.state.confirmPassword) {
      this.setState({
        error: 'Please enter the required fields',
      });
    } else if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({
        error: 'new password and confirm password does not match',
      });
    } else if (this.state.newPassword.length < 6) {
      this.setState({
        error: 'password length must be more than 5',
      });
    } else {
      this.setState({
        error: '',
      });

      $('#modalOpen').modal('open');
    }
  }
  /**
   * @function render
   * @returns {void}
   * @memberof ChangePasswordPage
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
              uploadAvatar={this.props.uploadAvatar}
            />
            <ChangePasswordForm
              handleClick={this.handleClick}
              handleClose={this.handleClose}
              handleExit={this.handleExit}
              handleInputChange={this.handleInputChange}
              handleSave={this.handleSave}
              state={this.state}
            // passwordChange={this.props.passwordChange}
            // changePassword={this.props.changePassword}
            />
          </div>
        </div>
      </div>
    );
  }
}

ChangePasswordPage.propTypes = {
  changePassword: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  getUserdetails: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  passwordChange: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  userData: PropTypes.arrayOf(PropTypes.any).isRequired,

};

/**
 * @param {any} state
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    userData: state.UserDetails[0].data,
    imageUrl: state.userProfileImage[0].response,
    error: state.updateUser[0].error.toString(),
    message: state.updateUser[0].data.toString(),
    passwordChange: state.passwordChange,
  };
}

export default connect(mapStateToProps, {
  getUserdetails,
  updateUser,
  uploadAvatar,
  changePassword,
  logout
})(ChangePasswordPage);
