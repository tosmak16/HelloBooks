import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadFileError, uploadFileRequest, uploadFileResponse } from '../../actions/uploadfiles';

const upload_preset = 'bjfllgrd';

export function uploadFile(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', upload_preset);
  return (dispatch) => {
    dispatch(uploadFileRequest(file));

    return fetch('https://api.cloudinary.com/v1_1/tosmak/auto/upload', {
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
        dispatch(uploadFileResponse(response.secure_url));
      })
      .catch(error => {
        dispatch(uploadFileError('Bad request'));
      });

  }
}
