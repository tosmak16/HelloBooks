import { SET_USER } from './actionTypes';
/**
 * 
 * 
 * @export
 * @param {any} user 
 * @returns 
 */
export function setCurrentuser(user) {
  return {
    type: SET_USER,
    user
  }
}
