import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import LogininForm from './LoginForm';
import Footer from './Footer';
import userSignin from '../actions/loginAction';
import getbooks from '../actions/getBooks';
/**
 * @export
 * @class Loginin
 * @extends {React.PureComponent}
 */
export class Loginin extends React.PureComponent {
  /**
   * @method render
   * @returns {views} with logininform and footer
   * @memberof Loginin
   */
  render() {
    return (
      <div>
        <div id="logininForm" className="row">
          <LogininForm
            getbooks={this.props.getbooks}
            userSignin={this.props.userSignin}
            login={this.props.login}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

Loginin.propTypes = {
  getbooks: PropTypes.func.isRequired,
  login: PropTypes.objectOf(PropTypes.any).isRequired,
  userSignin: PropTypes.func.isRequired,

};

/**
 *@function mapStateToProps
 * @param {object} state
 * @returns {object} login
 */
function mapStateToProps(state) {
  return { login: state.login[0] };
}

export default connect((mapStateToProps), { userSignin, getbooks })(Loginin);
