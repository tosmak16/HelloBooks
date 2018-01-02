import lodash from 'lodash'
import { browserHistory } from 'react-router';

import { showBookDetails } from '../../actions/showBookDetails';


/**
 * 
 * 
 * @export
 * @param {any} bookId 
 * @param {any} set 
 * @returns
 */
export default function checkBookDetails(bookId, set) {
  return async (dispatch) => {
    dispatch(showBookDetails(bookId));
    set && browserHistory.push('/book/details');
  }

}
