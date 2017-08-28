import React from 'react';
import LoginForm from './LoginForm';
import Footer from './Footer';
// import '../../public/scss/index.scss';
import '../../public/scss/materialize.scss';
import FlashMessagesList from './flash/FlashMessagesList';


class Login extends React.Component {
  render() {
    return (
      <div>
        <FlashMessagesList />
        <div id="loginForm" className="row">
          <LoginForm />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
