import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

import { getuserdetailsError, getuserdetailsReponse, getuserdetailsRequest } from '../../actions/getUserDetails';


export default function getUserdetails() {
  let decodedToken = jwtDecode(localStorage.jwtToken);
  let userId = decodedToken.id;

  return (dispatch) => {
    dispatch(getuserdetailsRequest());
    axios
      .get('/api/v2/users/' + userId)
      .then(
      (res) => {

        dispatch(getuserdetailsReponse(res.data.result));
      }
      ).catch(error => {
        dispatch(getuserdetailsError('Error in getting data'))
      });
  };
}
