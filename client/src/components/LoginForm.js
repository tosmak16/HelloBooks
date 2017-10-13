import React from 'react';
import PropTypes from 'prop-types';

import { Input, Row } from 'react-materialize';

/**
 * 
 * 
 * @export
 * @class LoginForm
 * @extends {React.Component}
 */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * 
   * 
   * @param {any} e 
   * @memberof LoginForm
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * 
   * 
   * @param {any} e 
   * @memberof LoginForm
   */
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ errors: '' });
    this.props.userSignin(this.state);
    this.props.getbooks(true);
  }
  /**
   * 
   * 
   * @returns 
   * @memberof LoginForm
   */
  render() {
    const { error } = this.props.log;
    return (
      <form onSubmit={ this.handleSubmit } className="form-signin" action="books.html" >
        <h4 className="form-signin-heading">Please log in</h4>
        {error && <p style={{ color: 'red' }} className="help-block">*{error}*</p>}
        <Row>
          <Input
            s={ 12 } label="Username"
            type="text" value={ this.state.username } name="username" id="inputUsernamelog" className="form-control validate"
            placeholder="Username"
            onChange={ this.handleChange }
            required
            autoFocus
          />
        </Row>

        <Row>
          <Input
            s={ 12 } label="Password"
            type="password"
            id="inputPassword"
            className="form-control validate"
            placeholder="Password" required
            autoFocus
            name="password"
            value={ this.state.password }
            onChange={ this.handleChange }
          />
        </Row>

        <div className="row">
          <div>
            <input
              defaultChecked="checked" name="group1" type="checkbox" value="" label="Remember me?"
              className="filled-in checkbox-orange" id="filled-in-box"
            />
            <label htmlFor="filled-in-box">Remember me?</label>
          </div>
        </div>
        <button id="loginbtn" className="btn btn-lg btn-primary  btn-block" type="submit">Sign in</button>
        <p>
          <label>
            <a href=""> Forgot Password ? </a>
          </label>
        </p>

        <a href="/signup" id="createbtn" className="" > <b>Create account</b></a>

      </form >
    );
  }
}

LoginForm.propTypes = {
  getbooks: PropTypes.func.isRequired,
  log: PropTypes.object.isRequired,
  userSignin: PropTypes.func.isRequired,

};


export default LoginForm;
