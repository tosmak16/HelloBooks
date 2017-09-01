import axios from 'axios';
import { browserHistory } from 'react-router';

import { getbooksError, getbooksRequest, getbooksReponse } from '../../actions/getBooks';


export default function getbooks() {
  return (dispatch) => {
    dispatch(getbooksRequest());
    axios
      .get('/api/v2/books')
      .then(
      (res) => {
        dispatch(getbooksReponse(res.data.result));


        browserHistory.push('/books');

      }
      ).catch(error => {
        dispatch(getbooksError(error.response.data))
      });
  };
}
