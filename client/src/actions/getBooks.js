import axios from 'axios';
import { browserHistory } from 'react-router';

import { getbooksError, getbooksRequest, getbooksReponse } from '../../actions/getBooks';


export default function getbooks(set) {
  return (dispatch) => {
    dispatch(getbooksRequest());
    axios
      .get('/api/v2/books')
      .then(
      (res) => {
        dispatch(getbooksReponse(res.data.result));
        if (!set)
        { browserHistory.push('/books'); }
        else if (set) {

        }
      }
      ).catch(error => {
        dispatch(getbooksError(error.response.data))
      });
  };
}
