import React from 'react';
import map from 'lodash/map';

const membershipType = {
  Basic: 'Basic',
  Silver: 'Silver',
  Gold: 'Gold',
  Bronze: 'Bronze'
};
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      membershipType: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    const options = map(membershipType, (val, key) =>
      <option key={ val } value={ val }>{key}</option>);
    return (
      <form onSubmit={ this.handleSubmit } className="form-signin" action="index.html">
        <h4 className="form-signin-heading">Create an account</h4>
        <div className="input-field">
          <label htmlFor="firstname" className="sr-only">First Name</label>
          <input
            type="text" id="firstname"
            name="firstName"
            value={ this.state.firstName }
            onChange={ this.handleChange }
            className="form-control validate" placeholder="First Name" required
            autoFocus
          />
        </div>
        <div className="input-field">
          <label htmlFor="lastname" className="sr-only">Last Name</label>
          <input
            type="text" id="lastname"
            name="lastName"
            value={ this.state.lastName }
            onChange={ this.handleChange }
            className="form-control validate"
            placeholder="Last Name" required
            autoFocus
          />
        </div>
        <div className="input-field">
          <label htmlFor="inputSignUpEmail" className="sr-only">Email address</label>
          <input
            type="email"
            name="email"
            value={ this.state.email }
            onChange={ this.handleChange }
            id="inputSignUpEmail"
            className="form-control validate"
            placeholder="Email address" required
            autoFocus
          />
        </div>
        <div className="input-field">
          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input
            type="text"
            name="username"
            value={ this.state.username }
            onChange={ this.handleChange }
            id="inputUsername"
            className="form-control validate"
            placeholder="Username" required
            autoFocus
          />
        </div>
        <div className="input-field">
          <label htmlFor="inputSignUpPassword" className="sr-only">Password</label>
          <input
            type="password"
            id="inputsSignUpPassword"
            name="password"
            value={ this.state.password }
            onChange={ this.handleChange }
            className="form-control validate"
            placeholder="Password" required
            autoFocus
          />
        </div>
        <label className="sr-only">Mmebership Type</label>
        <select
          name="membershipType"
          className="browser-default"
          onChange={ this.handleChange }
          value={ this.state.membershipType }

        >
          <option value="" disabled selected>Membership Type</option>
          {options}
        </select>

        <a href="/login"><button id="signUbtn" className="btn btn-lg btn-success btn-block" type="submit">Sign up</button></a>
      </form >
    );
  }
}

export default SignUpForm;
