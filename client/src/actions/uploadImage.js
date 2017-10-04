import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadimageError, uploadimageRequest, uploadimageResponse } from '../../actions/UploadImages';


export function uploadImage(file) {
  const data = new FormData();
  data.append('file', file);
  return (dispatch) => {
    dispatch(uploadimageRequest(data));

    return fetch('http://localhost:8000/api/v2/books/image', {
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
          dispatch(uploadimageResponse(response));
        }
      })
      .catch(error => {
        dispatch(uploadimageError(error));
      });

  }
}
