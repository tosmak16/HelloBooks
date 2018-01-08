import { SET_USER } from './actionTypes';
/**
 * @param {string} user 
 * 
 * @returns {object} current user state
 */
export const setCurrentUserAuth = (user) => {
  return {
    type: SET_USER,
    user
  }
}
export default setCurrentUserAuth
