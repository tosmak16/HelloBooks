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
        <div className="row">
          <div className="col s12 col l12 col m12">
            <div className="col s12 col l6 col m6">
              <h4 />

            </div>
            <div id="signup_border" className="col s12 col m6 col l6">
              <div id="signUpForm" className="row">
                <SignUpForm userSignup={ userSignup } reg={ reg } />
              </div>
            </div>
          </div>
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
