import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadProfileImageError, uploadProfileImageRequest, uploadProfileImageResponse } from '../../actions/uploadAvatar';

const upload_preset = 'bjfllgrd';
/**
 * @export
 * @param {object} file 
 * @returns 
 */
export function uploadAvatar(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', upload_preset);
  return (dispatch) => {
    dispatch(uploadProfileImageRequest(data));
    return fetch('https://api.cloudinary.com/v1_1/tosmak/upload', {
      method: 'POST',
      body: data
    })
      .then(
      (res) => {
        if (res.status === 200) {
          return res.json()
        }

        else if (res.status >= 400) {
          throw res.statusText
        }
      })
      .then((response) => {
        dispatch(uploadProfileImageResponse(response.secure_url));
      })
      .catch(error => {
        dispatch(uploadProfileImageError('Bad request'));
      });
  }
}
