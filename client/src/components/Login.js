import React from 'react';
import LoginForm from './LoginForm';
import Footer from './Footer';
// import '../../public/scss/index.scss';
import '../../public/scss/materialize.scss';

class Login extends React.Component {
  render() {
    return (
      <div>
        <div id="loginForm" className="row">
          <LoginForm />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
