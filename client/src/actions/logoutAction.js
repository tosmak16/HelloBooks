import $ from 'jquery';
import { setCurrentuser } from '../../actions/setCurrentuser';
/** 
 * @export logout
 * @description it dispatch actions to log out a user
 * @returns {action} dispacted actions
 */
export const logout = () => {
  localStorage.clear()
  process.env.NODE_ENV === 'test' || Materialize.toast('You are signed out', 5000, 'red');
  return (dispatch) => {
    dispatch(setCurrentuser({}));
    try {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() =>
        'User signed out.'
      );
    } catch (error) {
      return 'User Signed Out'
    }
  };
}
export default logout;
