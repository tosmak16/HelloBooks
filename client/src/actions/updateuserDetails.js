import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

import { uploadImage } from './uploadImage';
import { updateuserError, updateuserRequest, updateuserResponse } from '../../actions/updateUser';



export default function updateUser(userData) {
  let decodedToken = jwtDecode(localStorage.jwtToken);
  let userId = decodedToken.id;

  return (dispatch) => {
    dispatch(updateuserRequest(userData));
    axios.put('/api/v2/users/' + userId, userData).then(
      (res) => {

        dispatch(updateuserResponse(res.data.message));
      }
    ).catch(error => {

      dispatch(updateuserError(error.response.data ? error.response.data : 'Error'));
    });
  }

}
