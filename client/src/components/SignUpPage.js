import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import SignUpFormC from './SignUpForm';
import Footer from './Footer';
import { userSignup } from '../actions/signupAction';


/**
 * 
 * 
 * @export
 * @class SignUpPage
 * @extends {React.Component}
 */
export class SignUpPage extends React.Component {
  /**
   * *
   * 
   * @returns 
   * @memberof SignUpPage
   */
  render() {
    const { userSignup, reg } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12 col l12 col m12">
            <div id="signup_border" className="col s12 col m6 offset-m4 col 16 offset-l4">
              <div id="signUpForm" className="row">
                <SignUpFormC userSignup={ userSignup } reg={ reg } />
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
    reg: state.reg[0]
  };
}
export default connect(mapStateToProps, { userSignup })(SignUpPage);
