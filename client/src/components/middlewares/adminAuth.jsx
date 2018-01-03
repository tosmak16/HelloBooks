import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

/**
 * @description HOC which serves has admim authentication middle ware
 * @param {class} Component
 * @returns {views} component
 */
export default function (Component) {
  /**
   * @class AdminAuth
   * @extends {React.Component}
   */
  class AdminAuth extends React.Component {
    /**
     * @memberof AdminAuth
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
     * @memberof AdminAuth
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
     * @memberof AdminAuth
     */
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
  AdminAuth.propTypes = {
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
  return connect(mapStateToProps)(AdminAuth);
}
