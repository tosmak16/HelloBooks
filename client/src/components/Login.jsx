import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LogininForm from './LoginForm';
import { Footer } from './Footer';
import userSignin from '../actions/loginAction';
import getbooks from '../actions/getBooks';
import { googleAuthSignIn } from '../actions/googleAuthSignIn';
import { resetUserPassword } from '../actions/resetUserPassword';

/**
 * @param {object} props
 * @export Login
 * @function Loginin
 * @returns {views} login form
 */
export const Login = props => (
  <div>
    <div id="logininForm" className="row">
      <LogininForm
        getbooks={props.getbooks}
        userSignin={props.userSignin}
        googleAuthSignIn={props.googleAuthSignIn}
        login={props.login}
        resetUserPassword={props.resetUserPassword}
        resetPasswordStatus={props.resetPasswordStatus}
      />
    </div>
    <Footer />
  </div>
);
Login.propTypes = {
  getbooks: PropTypes.func.isRequired,
  login: PropTypes.objectOf(PropTypes.any).isRequired,
  userSignin: PropTypes.func.isRequired,
  googleAuthSignIn: PropTypes.func.isRequired,
  resetUserPassword: PropTypes.func.isRequired,
  resetPasswordStatus: PropTypes.string.isRequired
};
/**
 *@function mapStateToProps
 * @param {object} state
 * @returns {object} login
 */
function mapStateToProps(state) {
  return {
    login: state.login[0],
    resetPasswordStatus: state.resetPassword[0].data
  };
}
export default connect((mapStateToProps),
  {
    userSignin,
    getbooks,
    googleAuthSignIn,
    resetUserPassword
  })(Login);
