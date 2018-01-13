import $ from 'jquery';
import { setCurrentUserAuth } from '../../actions/setCurrentUserAuth';
/** 
 * @export logout
 * 
 * @description it dispatch actions to log out a user
 * 
 * @returns {action} dispacted actions
 */
export const logout = () => {
  localStorage.clear()
  Materialize.toast('You are signed out', 5000, 'red');
  return async (dispatch) => {
    dispatch(setCurrentUserAuth({}));
    try {
      gapi.auth2.getAuthInstance().signOut()
    } catch (error) {
      return 'User Signed Out'
    }
  };
}
export default logout;
