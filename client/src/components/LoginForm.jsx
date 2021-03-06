import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Input, Row } from 'react-materialize';
import { ResetPasswordModal } from './modal/ResetPasswordModal';

/**
 * @export LoginForm
 * 
 * @description Login form un connected component
 * 
 * @class LoginForm
 * 
 * @extends {React.Component}
 */
export class LoginForm extends React.Component {
  /**
   * @description Creates an instance of LoginForm.
   * Login form  class method
   * 
   * @param {object} props
   * 
   * @memberof LoginForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: '',
      displayModal: false,
      userEmailText: '',
      isLoggedIn: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.handleGoogleSignin = this.handleGoogleSignin.bind(this);
    this.renderResetPasswordModal = this.renderResetPasswordModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInputEmailChange = this.handleInputEmailChange.bind(this);
    this.handleSendMail = this.handleSendMail.bind(this);
  }
  /**
   * @memberof LoginForm
   * 
   * @returns {void}
   */
  componentDidMount() {
    gapi.signin2.render('g-signin2', {
      scope: 'profile email',
      height: 40,
      width: 298,
      longtitle: false,
      onsuccess: this.onSignIn,
      onFailure: this.onSignIn
    });
  }
  /**
   * @param {object} nextProps
   * 
   * @memberof LoginForm
   * 
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const { resetPasswordStatus } = nextProps;
    if (resetPasswordStatus !== this.props.resetPasswordStatus) {
      this.setState({
        userEmailText: ''
      });
    }
  }
  /**
  * @param {object} response

  * @memberof LoginForm

  * @returns {void}
  */
  onSignIn(response) {
    if (this.state.isLoggedIn) {
      this.props.googleAuthSignIn(response);
    }
    this.state.isLoggedIn = false;
  }
  /**
   * @memberof LoginForm
   * @returns {void}
   */
  handleGoogleSignin() {
    this.setState({
      isLoggedIn: true
    });
    gapi.signin2.render('g-signin2', {
      scope: 'profile email',
      height: 40,
      width: 298,
      longtitle: false,
      onsuccess: this.onSignIn,
      onFailure: this.onSignIn
    });
  }

  /**
   * @param {event} event
   * 
   * @memberof LoginForm
   * 
   * @returns {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param {object} event
   * 
   * @memberof LoginForm
   * 
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ errors: '' });
    this.props.userSignin(this.state);
    this.props.getbooks(true);
  }
  /**
 * @param {object} event
 * 
 * @memberof LoginForm
 * 
 * @returns {void}
 */
  handleClose() {
    this.setState({
      displayModal: false
    });
  }

  /**
 * @param {object} event
 * 
 * @memberof LoginForm
 * 
 * @returns {void}
 */
  handleSendMail() {
    this.props.resetUserPassword(this.state.userEmailText);
  }

  /**
 * @param {object} event
 * 
 * @memberof LoginForm
 * 
 * @returns {void}
 */
  handleInputEmailChange(event) {
    this.setState({
      userEmailText: event.target.value
    });
  }
  /**
  * @param {object} event

  * @memberof LoginForm

  * @returns {void}
  */
  renderResetPasswordModal() {
    this.setState({
      displayModal: true
    });
  }
  /**
   * @returns {views} with input fields
   * 
   * @memberof LoginForm
   */
  render() {
    document.title = 'Login Page';
    const { error } = this.props.login;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-signin" action="books.html" >
          <h5 className="form-signin-heading text-center pull-center">Please Login In</h5>
          {error && <p style={{ color: 'red' }} className="help-block">*{error}*</p>}
          <Row>
            <Input
              s={12}
              label="Username"
              type="text"
              value={this.state.username}
              name="username"
              id="inputUsernamelog"
              className="form-control validate"
              onChange={this.handleChange}
              required
              autoFocus
            />
          </Row>

          <Row>
            <Input
              s={12}
              label="Password"
              type="password"
              id="inputPassword"
              className="form-control validate"
              placeholder="Password"
              required
              autoFocus
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Row>
          <div className="row">
            <div>
              <input
                defaultChecked="checked"
                name="group1"
                type="checkbox"
                value=""
                label="Remember me?"
                className="filled-in checkbox-orange"
                id="filled-in-box"
              />
              <label htmlFor="filled-in-box">Remember me?</label>
            </div>
          </div>
          <button
            id="loginbtn"
            className="btn btn-lg btn-primary  btn-block"
            type="submit"
          >Sign in</button>
          <div
            style={{
              marginLeft: '1px',
              marginTop: '10px',
            }}
            id="g-signin2"
            onClick={this.handleGoogleSignin}
          />
          <p>
            <label htmlFor="forgot_pass" >
              <button
                id="forgot_pass"
                type="button"
                onClick={this.renderResetPasswordModal}
              > Forgot Password ? </button>
            </label>
          </p>
          <Link to="/signup" id="createbtn" className="" > <b>Create account</b></Link>
        </form >
        {
          this.state.displayModal
          &&
          <ResetPasswordModal
            handleClose={this.handleClose}
            handleSendMail={this.handleSendMail}
            handleInputEmailChange={this.handleInputEmailChange}
            userEmailText={this.state.userEmailText}
          />
        }
      </div>

    );
  }
}
LoginForm.propTypes = {
  getbooks: PropTypes.func.isRequired,
  login: PropTypes.objectOf(PropTypes.any).isRequired,
  userSignin: PropTypes.func.isRequired,
  googleAuthSignIn: PropTypes.func.isRequired,
  resetUserPassword: PropTypes.func.isRequired,
  resetPasswordStatus: PropTypes.string.isRequired
};
export default LoginForm;
