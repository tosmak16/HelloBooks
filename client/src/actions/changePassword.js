import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

import { changepasswordError, changepasswordRequest, changepasswordResponse } from '../../actions/changePassword';



export default function changePassword(userData) {
  let decodedToken = jwtDecode(localStorage.jwtToken);
  let userId = decodedToken.id;
  return (dispatch) => {
    dispatch(changepasswordRequest(userData));
    axios.put('/api/v2/users/' + userId + '/password', userData).then(
      (res) => {

        dispatch(changepasswordResponse(res.data.message));
      }
    ).catch(error => {
      dispatch(changepasswordError(error.response.data));
    });
  }

}
