import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SignUpForm } from './SignUpForm';
import { Footer } from './Footer';
import { userSignup } from '../actions/signupAction';

/**
 * @export SignUpPage
 * @function SignUpPage
 * @param {object} props
 * @returns {views} return
 */
export const SignUpPage = props => (
  <div>
    <div className="row">
      <div className="col s12 col l12 col m12">
        <div id="signup_border" className="col s12 col m6 offset-m4 col 16 offset-l4">
          <div id="signUpForm" className="row">
            <SignUpForm userSignup={props.userSignup} register={props.register} />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);
SignUpPage.propTypes = {
  register: PropTypes.objectOf(PropTypes.any).isRequired,
  userSignup: PropTypes.func.isRequired,
};
/**
 * @param {arrayOfObject} state
 * @returns {object} registe state
*/
const mapStateToProps = function mapStateToProps(state) {
  return {
    register: state.register[0],
  };
};
export default connect(mapStateToProps, { userSignup })(SignUpPage);
