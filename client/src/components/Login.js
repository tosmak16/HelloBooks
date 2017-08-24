import React from 'react';
import LoginForm from './LoginForm';
import '../../public/css/index.scss';
import '../../public/scss/materialize.scss';

class Login extends React.Component {
  render() {
    return (
      <div id="loginForm" className="row">
        <LoginForm />
      </div>
    );
  }
}

export default Login;
