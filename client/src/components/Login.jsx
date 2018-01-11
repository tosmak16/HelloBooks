import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LogininForm from './LoginForm';
import { Footer } from './Footer';
import userSignin from '../actions/login';
import { getBooks } from '../actions/getBooks';
import { googleAuthSignIn } from '../actions/googleAuthSignIn';
import { resetUserPassword } from '../actions/resetUserPassword';

/**
 * @description connnected login page
 * 
 * @param {object} props
 * 
 * @export Login
 * 
 * @function Login
 * 
 * @returns {views} login form
 */
export const Login = (props) => {
  const renderHorizontalBoxBooks = () => (
    <td className="vertical shelf horizontal" >

      <hr className="hr-common white-hr" />
      <hr className="hr-common black-hr" />
      <hr className="hr-common white-hr" />
      <hr className="hr-common brown-hr" />
      <hr className="hr-common white-hr" />
      <hr className="hr-common black-hr" />
      <hr className="hr-common white-hr" />
      <hr className="hr-common brown-hr" />

    </td >
  );

  const renderVerticalBoxBooks = () =>
    (
      <td className="vertical shelf horizontal">
        <hr className="hr-common brown-hr" />
        <hr className="hr-common white-hr" />
        <hr className="hr-common black-hr" />
        <hr className="hr-common white-hr" />
        <hr className="hr-common brown-hr" />
        <hr className="hr-common white-hr" />
        <hr className="hr-common black-hr" />
        <hr className="hr-common white-hr" />
      </td>
    );

  return (

    <div>
      <div className="container">
        <div className="row">
          <div className=" table-cover col s5 hide-on-small-only">
            <table>
              <tbody>
                <tr>
                  {renderVerticalBoxBooks()}
                  {renderHorizontalBoxBooks()}
                  {renderVerticalBoxBooks()}
                </tr>
                <tr>
                  {renderHorizontalBoxBooks()}
                  {renderVerticalBoxBooks()}
                  {renderVerticalBoxBooks()}
                </tr>
                <tr>
                  {renderVerticalBoxBooks()}
                  {renderVerticalBoxBooks()}
                  {renderHorizontalBoxBooks()}
                </tr>
                <tr>
                  <td className="vertical shelf horizontal down-shelf">
                    <hr className="hr-common brown-hr" />
                  </td>
                  <td className="vertical shelf horizontal down-shelf">
                    <hr className="hr-common brown-hr" />
                  </td>
                  <td className="vertical shelf horizontal down-shelf">
                    <hr className="hr-common brown-hr" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="logininForm" className="col s5 offset-m2">
            <LogininForm
              getbooks={props.getBooks}
              userSignin={props.userSignin}
              googleAuthSignIn={props.googleAuthSignIn}
              login={props.login}
              resetUserPassword={props.resetUserPassword}
              resetPasswordStatus={props.resetPasswordStatus}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
Login.propTypes = {
  getBooks: PropTypes.func.isRequired,
  login: PropTypes.objectOf(PropTypes.any).isRequired,
  userSignin: PropTypes.func.isRequired,
  googleAuthSignIn: PropTypes.func.isRequired,
  resetUserPassword: PropTypes.func.isRequired,
  resetPasswordStatus: PropTypes.string.isRequired
};
/**
 *@function mapStateToProps

 * @param {object} state
 * 
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
    getBooks,
    googleAuthSignIn,
    resetUserPassword
  })(Login);
