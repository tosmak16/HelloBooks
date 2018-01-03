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
   * @class LoginAuth
   * @extends {React.Component}
   */
  class LoginAuth extends React.Component {
    /**
     * @memberof LoginAuth
     * @returns {void}
     */
    componentWillMount() {
      jwt.verify(localStorage.jwtToken, process.env.SECRET, (err) => {
        if (!err) {
          browserHistory.push('/books');
          Materialize.toast('Redirected........', 1000, 'red');
        } else {
          store.dispatch(setCurrentuser({}));
        }
      });
    }
    /**
     * @returns {void}
     * @param {object} nextProps
     * @memberof LoginAuth
     */
    componentWillUpdate() {
      jwt.verify(localStorage.jwtToken, process.env.SECRET, (err) => {
        if (!err) {
          browserHistory.push('/books');
          Materialize.toast('Redirected........', 1000, 'red');
        } else {
          store.dispatch(setCurrentuser({}));
        }
      });
    }
    /**
     * @returns {views} component and it's props
     * @memberof LoginAuth
     */
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  return LoginAuth;
}
