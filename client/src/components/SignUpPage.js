import React from 'react';
import { connect } from 'react-redux';


import SignUpForm from './SignUpForm';
import Footer from './Footer';
import '../../public/scss/materialize.scss';
import { userSignup } from '../actions/signupAction';
import PropTypes from 'prop-types';

class SignUpPage extends React.Component {
  render() {
    const { userSignup } = this.props;
    console.log(userSignup);
    return (
      <div>
        <div id="signUpForm" className="row">
          <SignUpForm userSignup={ userSignup } />
        </div>
        <Footer />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  userSignup: PropTypes.func.isRequired
};

export default connect(null, { userSignup })(SignUpPage);
