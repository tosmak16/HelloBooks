import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
/**
 * @description HOC which serves has registered user authentication middle ware
 * @param {class} Component
 * @returns {views} componenr
 */
export default function (Component) {
  /**
   * @class Authenticate
   * @extends {React.Component}
   */
  class Authenticate extends React.Component {
    /**
     * @memberof Authenticate
     * @returns {void}
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        browserHistory.push('/login');
        Materialize.toast('you need to sign in', 1000, 'red');
      }
    }
    /**
     * @returns {void}
     * @param {object} nextProps
     * @memberof Authenticate
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        browserHistory.push('/login');
        Materialize.toast('you need to sign in', 1000, 'red');
      }
    }
    /**
     * @returns {views} component and it's props
     * @memberof Authenticate
     */
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };
  /**
   * @param {arrayOfObject} state
   * @returns {object} of auth reducer
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth[0].isAuthenticated,
    };
  }
  return connect(mapStateToProps)(Authenticate);
}
