import React from 'react';
import { Button, Input, Row } from 'react-materialize';


import map from 'lodash/map';
import PropTypes from 'prop-types';

const membershipType = {
  Basic: 'Basic',
  Silver: 'Silver',
  Gold: 'Gold',
  Bronze: 'Bronze',
};

/**
 * @export
 * @class SignUpForm
 * @extends {React.Component}
 */
export class SignUpForm extends React.Component {
  /**
   * *
   * @param {object} props
   * @memberof SignUpForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      membershipType: '',
      errors: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   *@function handleChange
   * @param {object} event
   * @memberof SignUpForm
   * @returns {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param {object} event
   * @memberof SignUpForm
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ errors: '' });
    this.props.userSignup(this.state);
  }
  /**
   * @function render
   * @returns {views} with input fields used for signup
   * @memberof SignUpForm
   */
  render() {
    const { error } = this.props.register;
    const options = map(membershipType, (val, key) =>
      <option key={val} value={val}>{key}</option>);
    return (
      <form onSubmit={this.handleSubmit} className="form-signin" action="/login">
        <h4 className="form-signin-heading">Create an account</h4>
        {error && <p style={{ color: 'red' }} className="help-block">*{error}*</p>}

        <Row>
          <Input
            id="firstname"
            name="firstName"
            s={12}
            label="First Name"
            value={this.state.firstName}
            onChange={this.handleChange}
            className="form-control validate"
            required
          />
        </Row>
        <Row>
          <Input
            id="lastname"
            name="lastName"
            s={12}
            label="Last Name"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange}
            className="form-control validate"
            required
          />
        </Row>

        <Row>
          <Input
            type="email"
            name="email"
            s={12}
            value={this.state.email}
            onChange={this.handleChange}
            id="inputSignUpEmail"
            className="form-control validate"
            required
            label="Email address"
          />
        </Row>

        <Row>
          <Input
            type="text"
            name="username"
            s={12}
            value={this.state.username}
            onChange={this.handleChange}
            id="inputUsername"
            className="form-control validate"
            required
            label="Username"
          />
        </Row>

        <Row>
          <Input
            type="password"
            id="inputsSignUpPassword"
            name="password"
            s={12}
            value={this.state.password}
            onChange={this.handleChange}
            className="form-control validate"
            required
            label="Password"
          />
        </Row>

        <Row>
          <Input
            name="membershipType"
            id="inputSignUpselect"
            onChange={this.handleChange}
            value={this.state.membershipType}
            required
            s={12}
            type="select"
          >
            <option defaultValue="" disabled>Membership Type</option>
            {options}
          </Input>
        </Row>

        <a href=""><Button
          waves="light"
          id="signUbtn"
          className="btn btn-lg btn-success btn-block"
          type="submit"
        >Sign up</Button></a>
      </form >
    );
  }
}

SignUpForm.propTypes = {
  register: PropTypes.objectOf(PropTypes.any).isRequired,
  userSignup: PropTypes.func.isRequired,
};

export default SignUpForm;

