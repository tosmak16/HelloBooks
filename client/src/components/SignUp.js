import React from 'react';
import SignUpForm from './SignUpForm';
import '../../public/css/index.scss';
import '../../public/scss/materialize.scss';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="signUpForm" className="row">
        <SignUpForm />
      </div>
    );
  }
}

export default SignUp;
