import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import LoginForm from './LoginForm';
import Footer from './Footer';
import userSignin from '../actions/loginAction';
import getbooks from '../actions/getBooks';

/**
 * 
 * 
 * @export
 * @class Login
 * @extends {React.Component}
 */
export class Login extends React.Component {
  /**
   * 
   * 
   * @returns 
   * @memberof Login
   */
  render() {
    return (
      <div>
        <div id="loginForm" className="row">
          <LoginForm
            getbooks={ this.props.getbooks }
            userSignin={ this.props.userSignin } log={ this.props.log }
          />
        </div>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  getbooks: PropTypes.func.isRequired,
  log: PropTypes.object.isRequired,
  userSignin: PropTypes.func.isRequired,

};

/**
 * 
 * 
 * @param {any} state 
 * @returns {object}
 */
function mapStateToProps(state) {
  return { log: state.log[0] };
}

export default connect((mapStateToProps), { userSignin, getbooks })(Login);
