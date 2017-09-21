import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

import { uploadImage } from './uploadImage';
import { updateuserError, updateuserRequest, updateuserResponse } from '../../actions/updateUser';



export default function updateUser(userData) {
  let decodedToken = jwtDecode(localStorage.jwtToken);
  let userId = decodedToken.id;
  console.log(userData);
  return (dispatch) => {
    dispatch(updateuserRequest(userData));
    axios.put('/api/v2/users/' + userId, userData).then(
      (res) => {
        console.log(res.data.message);
        dispatch(updateuserResponse(res.data.message));
      }
    ).catch(error => {
      console.log(error.response.data);
      dispatch(updateuserError(error.response.data));
    });
  }

}
