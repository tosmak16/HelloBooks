import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadimageError, uploadimageRequest, uploadimageResponse } from '../../actions/UploadImages';


export function uploadImage(file) {
  const data = new FormData();
  data.append('file', file);
  return (dispatch) => {
    dispatch(uploadimageRequest(data));
    axios.post('/api/v2/book', data).then(
      (res) => {
        dispatch(uploadimageResponse(res));
      }
    ).catch(error => {
      dispatch(uploadimageError(error));
    });

  }
}
