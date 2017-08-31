import React from 'react';
import { connect } from 'react-redux';


import SignUpForm from './SignUpForm';
import Footer from './Footer';
import '../../public/scss/materialize.scss';
import { userSignup } from '../actions/signupAction';
import PropTypes from 'prop-types';
import reg from '../../reducers/reg';

class SignUpPage extends React.Component {
  render() {
    const { userSignup, reg } = this.props;
    return (
      <div>
        <div id="signUpForm" className="row">
          <SignUpForm userSignup={ userSignup } reg={ reg } />
        </div>
        <Footer />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  reg: PropTypes.object.isRequired,
  userSignup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    reg: state.reg
  };
}
export default connect(mapStateToProps, { userSignup })(SignUpPage);
