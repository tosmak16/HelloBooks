import { browserHistory } from 'react-router';
import { uploadFileError, uploadFileRequest, uploadFileResponse } from '../../actions/uploadBookFile';

const upload_preset = process.env.UPLOAD_PRESET;
/**
 * @export uploadFile
 * @description it dispact action for upload book file request and response
 * @param {object} file 
 * @returns {action} dispacted actions
 */
export const uploadFile = (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', upload_preset);
  return async (dispatch) => {
    dispatch(uploadFileRequest(file));
    const response = await fetch('https://api.cloudinary.com/v1_1/tosmak/auto/upload', {
      method: 'POST',
      body: data
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status >= 400 ? dispatch(uploadFileError('Bad request')) :
      dispatch(uploadFileResponse(jsonResponse.secure_url));
  }
}
export default uploadFile;
