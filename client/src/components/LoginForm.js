import React from 'react';
import { Button, Icon, Input } from 'react-materialize'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
    return (
      <form onSubmit={this.handleSubmit} className="form-signin" action="books.html" >
        <h4 className="form-signin-heading">Please log in</h4>
        <div className="input-field">
          <label htmlFor="inputUsernamelog" className="sr-only">Username</label>
          <input
            type="text" value={this.state.username} name="username" id="inputUsernamelog" className="form-control validate"
            placeholder="Username"
            onChange={this.handleChange}
            required
            autoFocus
          />
        </div>
        <div className="input-field">
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input
            type="password" id="inputPassword" className="form-control validate" placeholder="Password" required
            autoFocus
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>

        <p>
          <Input name='group1' type='checkbox' value='' label='Remember me?' className='filled-in' defaultChecked='checked' />
        </p>
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

export default LoginForm;
