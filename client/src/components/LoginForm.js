import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Button, Icon, Input, Row } from 'react-materialize';

import userSignin from '../actions/loginAction';

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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.userSignin(this.state).then(
      () => {
        //  browserHistory.push('/books');
      },
      (data) => {
        this.setState({ errors: data.response.data });
      }
    );
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit } className="form-signin" action="books.html" >
        <h4 className="form-signin-heading">Please log in</h4>
        {this.state.errors && <p style={{ color: 'red' }} className="help-block">*{this.state.errors}*</p>}
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
        <Row>
          <Input
            name="group1" type="checkbox" value="" label="Remember me?" className="filled-in"
            defaultChecked="checked"
          />
        </Row>
        <button id="loginbtn" className="btn btn-lg btn-primary  btn-block" type="submit">Sign in</button>
        <p>
          <label>
            <a href=""> Forgot Password ? </a>
          </label>
        </p>

        <a href="/signup" id="createbtn" className="btn btn-lg btn-success btn-block" >Create an account</a>

      </form >
    );
  }
}

LoginForm.propTypes = {
  userSignin: PropTypes.func.isRequired
};

export default connect(null, { userSignin })(LoginForm);
