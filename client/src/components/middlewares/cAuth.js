import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { popMessage } from '../../../actions/popMessages';

export default function (Comp) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.popMessage({
          type: 'error',
          text: 'you need to sign in'
        });


        browserHistory.push('/login');
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
    isAuthenticated: PropTypes.bool.isRequired,
    popMessage: PropTypes.func.isRequired,


  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth[0].isAuthenticated
    };
  }
  return connect(mapStateToProps, { popMessage })(Authenticate);
}
