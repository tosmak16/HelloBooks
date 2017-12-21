import React from 'react';
import PropTypes from 'prop-types';
import { Input, Row } from 'react-materialize';
import $ from 'jquery';

/**
 * @export
 * @class LoginForm
 * @extends {React.Component}
 */
export class LoginForm extends React.Component {
  /**
   * @description Creates an instance of LoginForm.
   * Login form  class method
   * @param {object} props
   * @memberof LoginForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.handleGoogleSignin = this.handleGoogleSignin.bind(this);
  }
  /**
   * @memberof LoginForm
   * @returns {void}
   */
  componentDidMount() {
    $.getScript('https://apis.google.com/js/platform.js')
      .done(() => {
        // execute any gapi calls here...
        gapi.signin2.render('g-signin2', {
          scope: 'profile email',
          height: 40,
          width: 298,
          longtitle: false,
        });
      });
  }
  /**
  * @param {object} response
  * @memberof LoginForm
  * @returns {void}
  */
  onSignIn(response) {
    this.props.googleAuthSignIn(response);
  }
  /**
   * @memberof LoginForm
   * @returns {void}
   */
  handleGoogleSignin() {
    $.getScript('https://apis.google.com/js/platform.js')
      .done(() => {
        // execute any gapi calls here...
        gapi.signin2.render('g-signin2', {
          scope: 'profile email',
          height: 40,
          width: 298,
          longtitle: false,
          onsuccess: this.onSignIn
        });
      });
  }

  /**
   * @param {event} event
   * @memberof LoginForm
   * @returns {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param {object} event
   * @memberof LoginForm
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ errors: '' });
    this.props.userSignin(this.state);
    this.props.getbooks(true);
  }
  /**
   * @returns {views} with input fields
   * @memberof LoginForm
   */
  render() {
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
            data-onsuccess={this.onSignIn}
          />
          <p>
            <label htmlFor="forgot_pass" >
              <a id="forgot_pass" href=""> Forgot Password ? </a>
            </label>
          </p>

          <a href="/signup" id="createbtn" className="" > <b>Create account</b></a>

        </form >

      </div>
    );
  }
}

LoginForm.propTypes = {
  getbooks: PropTypes.func.isRequired,
  login: PropTypes.objectOf(PropTypes.any).isRequired,
  userSignin: PropTypes.func.isRequired,
  googleAuthSignIn: PropTypes.func.isRequired
};


export default LoginForm;
