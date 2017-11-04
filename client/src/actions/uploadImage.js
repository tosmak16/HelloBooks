import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadimageError, uploadimageRequest, uploadimageResponse } from '../../actions/UploadImages';

const upload_preset = 'bjfllgrd';
/**
 * 
 * 
 * @export
 * @param {any} file 
 * @returns 
 */
export function uploadImage(file) {

  console.log(file);
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', upload_preset);
  return (dispatch) => {
    dispatch(uploadimageRequest(data));

    return fetch('https://api.cloudinary.com/v1_1/tosmak/upload', {
      method: 'POST',
      body: data
    })
      .then(
      (res) => {
        if (res.status >= 400) {
          throw res.status;
        }
        else if (res.status === 200) {
          return res.json()
        }
      })
      .then((response) => {
        dispatch(uploadimageResponse(response.secure_url));
      })
      .catch(error => {
        dispatch(uploadimageError('Bad request'));
      });

  }
}
