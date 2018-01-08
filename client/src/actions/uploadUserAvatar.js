import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadProfileImageError, uploadProfileImageRequest, uploadProfileImageResponse } from '../../actions/uploadAvatar';

const upload_preset = process.env.UPLOAD_PRESET;
/**
 * @export uploadUserAvatar
 * 
 * @description it dispatches action for upload user's avatar request and response
 * 
 * @param {object} file 
 * 
 * @returns {action} dispacted actions
 */
export const uploadUserAvatar = (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', upload_preset);
  return async (dispatch) => {
    dispatch(uploadProfileImageRequest(data));
    const response = await fetch('https://api.cloudinary.com/v1_1/tosmak/upload', {
      method: 'POST',
      body: data
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status >= 400 ? dispatch(uploadProfileImageError('Bad request')) :
      dispatch(uploadProfileImageResponse(jsonResponse.secure_url));
  }
}
export default uploadUserAvatar;
