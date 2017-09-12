import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadimageError, uploadimageRequest, uploadimageResponse } from '../../actions/UploadImages';


export function uploadImage(file) {
  console.log(file);
  const data = new FormData();
  data.append('file', file);
  return (dispatch) => {
    dispatch(uploadimageRequest(data));
    axios.post('/api/v2/book', data).then(
      (res) => {
        console.log(res);
        dispatch(uploadimageResponse(res));
      }
    ).catch(error => {
      console.log(error);
      dispatch(uploadimageError(error));
    });

  }
}
