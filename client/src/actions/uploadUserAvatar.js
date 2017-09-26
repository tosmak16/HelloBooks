import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadProfileImageError, uploadProfileImageRequest, uploadProfileImageResponse } from '../../actions/uploadAvatar';


export function uploadAvatar(file) {
  const data = new FormData();
  data.append('file', file);
  return (dispatch) => {
    dispatch(uploadProfileImageRequest(data));
    axios.post('/api/v2/users/image', data).then(
      (res) => {
        dispatch(uploadProfileImageResponse(res));
      }
    ).catch(error => {
      dispatch(uploadProfileImageError(error));
    });

  }
}
