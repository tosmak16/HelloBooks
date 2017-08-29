import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { addFlashMessage } from '../../../actions/flashMessages';

export default function (Comp) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        });

        browserHistory.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        browserHistory.push('/login');
      }
    }
    render() {
      return (
        <Comp { ...this.props } />
      );
    }
  }
  Authenticate.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired

  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }
  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
