import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

/**
 * @export
 * @param {class} Component
 * @returns {views} component
 */
export default function (Component) {
  /**
   * @class AdminShield
   * @extends {React.Component}
   */
  class AdminShield extends React.Component {
    /**
     * @memberof AdminShield
     * @returns {void}
     */
    componentWillMount() {
      if (!this.props.isAuthenticated || !(jwtDecode(localStorage.jwtToken).role === 'admin')) {
        if (localStorage.jwtToken) {
          browserHistory.push('/books');
        }
        if (!localStorage.jwtToken) {
          browserHistory.push('/login');
          Materialize.toast('Access denied!', 1000, 'red');
        }
      }
    }
    /**
     * @param {object} nextProps
     * @memberof AdminShield
     * @returns {void}
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated || !(jwtDecode(localStorage.jwtToken).role === 'admin')) {
        if (localStorage.jwtToken) {
          browserHistory.push('/books');
        }
        if (!localStorage.jwtToken) {
          browserHistory.push('/login');
          Materialize.toast('Access denied!', 1000, 'red');
        }
      }
    }
    /**
     * @returns {views} component and it's props
     * @memberof AdminShield
     */
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
  AdminShield.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };
  /**
   * @param {arrayOfObject} state
   * @returns {objedct} of auth reducer
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth[0].isAuthenticated,
    };
  }
  return connect(mapStateToProps)(AdminShield);
}
