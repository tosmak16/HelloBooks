import React from 'react';
import { browserHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import store from '../../../index';
import { setCurrentUserAuth } from '../../../actions/setCurrentUserAuth';


/**
 * @description HOC which serves has registered user authentication middle ware
 * 
 * @param {class} Component
 * 
 * @returns {views} componenr
 */
export default function (Component) {
  /**
   * @class UserAuth
   * 
   * @extends {React.Component}
   */
  class UserAuth extends React.Component {
    /**
     * @memberof UserAuth
     * 
     * @returns {void}
     */
    componentWillMount() {
      jwt.verify(localStorage.jwtToken, process.env.SECRET, (err) => {
        if (err) {
          store.dispatch(setCurrentUserAuth({}));
          Materialize.toast('you need to sign in', 1000, 'red');
          browserHistory.push('/login');
        }
      });
    }
    /**
     * @param {object} nextProps
     * 
     * @memberof UserAuth
     * 
     * @returns {void}
     */
    componentWillUpdate() {
      jwt.verify(localStorage.jwtToken, process.env.SECRET, (err) => {
        if (err) {
          store.dispatch(setCurrentUserAuth({}));
          Materialize.toast('you need to sign in', 1000, 'red');
          browserHistory.push('/login');
        }
      });
    }
    /**
     * @returns {views} component and it's props
     * 
     * @memberof UserAuth
     */
    render() {
      window.onbeforeunload = () => {
        store.dispatch(setCurrentUserAuth({}));
        localStorage.clear();
        return '';
      };
      return (
        <Component {...this.props} />
      );
    }
  }
  return UserAuth;
}
