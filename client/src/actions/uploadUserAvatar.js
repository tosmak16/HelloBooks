import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadProfileImageError, uploadProfileImageRequest, uploadProfileImageResponse } from '../../actions/uploadAvatar';


export function uploadAvatar(file) {
  const data = new FormData();
  data.append('file', file);
  return (dispatch) => {
    dispatch(uploadProfileImageRequest(data));

    return fetch('http://localhost:8000/api/v2/users/image', {
      method: 'POST',
      body: data
    })
      .then(
      (res) => res.json())
      .then((response) => {
        if (response.status >= 400) {
          throw response.message
        }
        else if (response.status === 200) {
          dispatch(uploadProfileImageResponse(response));
        }
      })
      .catch(error => {
        dispatch(uploadProfileImageError(error));
      });
  }
}
