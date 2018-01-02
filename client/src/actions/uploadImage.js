import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadimageError, uploadimageRequest, uploadimageResponse } from '../../actions/UploadImages';

const upload_preset = process.env.UPLOAD_PRESET;
/**
 * @export uploadImage
 * @description it dispatches action for upload image request and response
 * @param {object} file 
 * @returns {action} dispacted actions
 */
export const uploadImage = (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', upload_preset);
  return async (dispatch) => {
    dispatch(uploadimageRequest(data));
    const response = await fetch('https://api.cloudinary.com/v1_1/tosmak/upload', {
      method: 'POST',
      body: data
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status >= 400 ? dispatch(uploadimageError('Bad request')) :
      dispatch(uploadimageResponse(jsonResponse.secure_url));
  }
}
export default uploadImage;
