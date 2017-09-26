import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

import { popMessage } from '../../../actions/popMessages';

export default function (Comp) {
  class AdminShield extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated || !(jwtDecode(localStorage.jwtToken).role === 'admin')) {
        if (localStorage.jwtToken) {
          browserHistory.push('/books');
        }
        if (!localStorage.jwtToken) {
          this.props.popMessage({
            type: 'error',
            text: 'Access denied!'
          });
          browserHistory.push('/login');
        }
      }
    }

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
    render() {
      return (
        <Comp { ...this.props } />
      );
    }
  }
  AdminShield.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    popMessage: PropTypes.func.isRequired,


  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth[0].isAuthenticated
    };
  }
  return connect(mapStateToProps, { popMessage })(AdminShield);
}
