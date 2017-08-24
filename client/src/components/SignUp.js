import React from 'react';
import SignUpForm from './SignUpForm';
import Footer from './Footer';
// import '../../public/scss/index.scss';
import '../../public/scss/materialize.scss';

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <div id="signUpForm" className="row">
          <SignUpForm />
        </div>
        <Footer />
      </div>
    );
  }
}

export default SignUp;
