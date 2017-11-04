import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

import { popMessage } from '../../../actions/popMessages';

/**
 * 
 * 
 * @export
 * @param {any} Comp 
 * @returns 
 */
export default function (Comp) {
  /**
   * 
   * 
   * @class AdminShield
   * @extends {React.Component}
   */
  class AdminShield extends React.Component {
    /**
     * 
     * 
     * @memberof AdminShield
     */
    componentWillMount() {
      if (!this.props.isAuthenticated || !(jwtDecode(localStorage.jwtToken).role === 'admin')) {
        if (localStorage.jwtToken) {
          browserHistory.push('/books');
        }
        if (!localStorage.jwtToken) {
          this.props.popMessage({
            type: 'error',
            text: 'Access denied!',
          });
          browserHistory.push('/login');
        }
      }
    }
    /**
     * 
     * 
     * @param {any} nextProps 
     * @memberof AdminShield
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated || !(jwtDecode(localStorage.jwtToken).role === 'admin')) {
        if (localStorage.jwtToken) {
          browserHistory.push('/books');
        }
        if (!localStorage.jwtToken) {
          browserHistory.push('/login');
        }
      }
    }
    /**
     * 
     * 
     * @returns 
     * @memberof AdminShield
     */
    render() {
      return (
        <Comp {...this.props} />
      );
    }
  }
  AdminShield.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    popMessage: PropTypes.func.isRequired,
  };
  /**
   * 
   * 
   * @param {any} state 
   * @returns 
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth[0].isAuthenticated,
    };
  }
  return connect(mapStateToProps, { popMessage })(AdminShield);
}
