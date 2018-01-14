import React from 'react';
import store from '../../../index';
import { setCurrentUserAuth } from '../../../actions/setCurrentUserAuth';

/**
 * @description HOC which serves has Index user authentication middle ware
 * 
 * @param {class} Component
 * 
 * @returns {views} componenr
 */
export default function (Component) {
  /**
   * @class IndexShield
   * 
   * @extends {React.Component}
   */
  class IndexShield extends React.Component {
    /**
     * @memberof IndexShield
     * 
     * @returns {void}
     */
    componentWillMount() {
      store.dispatch(setCurrentUserAuth({}));
      localStorage.clear();
    }
    /**
     * @returns {void}
     * 
     * @param {object} nextProps
     * 
     * @memberof IndexShield
     */
    componentWillUpdate() {
      store.dispatch(setCurrentUserAuth({}));
      localStorage.clear();
    }
    /**
     * @returns {views} component and it's props
     * 
     * @memberof IndexShield
     */
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
  return IndexShield;
}
