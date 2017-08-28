import React from 'react';
import { connect } from 'react-redux';


import SignUpForm from './SignUpForm';
import Footer from './Footer';
import '../../public/scss/materialize.scss';
import { userSignup } from '../actions/signupAction';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../../actions/flashMessages';

class SignUpPage extends React.Component {
  render() {
    const { userSignup, addFlashMessage } = this.props;
    return (
      <div>
        <div id="signUpForm" className="row">
          <SignUpForm userSignup={ userSignup } addFlashMessage={ addFlashMessage } />
        </div>
        <Footer />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  userSignup: PropTypes.func.isRequired
};

export default connect(null, { userSignup, addFlashMessage })(SignUpPage);
