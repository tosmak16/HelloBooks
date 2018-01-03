import React from 'react';
import { browserHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import store from '../../../index';
import { setCurrentuser } from '../../../actions/setCurrentuser';


/**
 * @description HOC which serves has registered user authentication middle ware
 * @param {class} Component
 * @returns {views} componenr
 */
export default function (Component) {
  /**
   * @class UserAuth
   * @extends {React.Component}
   */
  class UserAuth extends React.Component {
    /**
     * @memberof UserAuth
     * @returns {void}
     */
    componentWillMount() {
      jwt.verify(localStorage.jwtToken, process.env.SECRET, (err) => {
        if (err) {
          store.dispatch(setCurrentuser({}));
          Materialize.toast('you need to sign in', 1000, 'red');
          browserHistory.push('/login');
        }
      });
    }
    /**
     * @returns {void}
     * @param {object} nextProps
     * @memberof UserAuth
     */
    componentWillUpdate() {
      jwt.verify(localStorage.jwtToken, process.env.SECRET, (err) => {
        if (err) {
          store.dispatch(setCurrentuser({}));
          Materialize.toast('you need to sign in', 1000, 'red');
          browserHistory.push('/login');
        }
      });
    }
    /**
     * @returns {views} component and it's props
     * @memberof UserAuth
     */
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  return UserAuth;
}
