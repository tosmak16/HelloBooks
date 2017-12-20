import { browserHistory } from 'react-router';
import $ from 'jquery';
import { setCurrentuser } from '../../actions/setCurrentuser';
/** 
 * @export
 * @returns 
 */
export const logout = () => {
  localStorage.clear()
  return (dispatch) => {
    dispatch(setCurrentuser({}));
    $.getScript('https://apis.google.com/js/platform.js')
      .done(() => {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
          return 'User signed out.';
        });
      });
  };
}
export default logout;
