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
  if (set === true) { browserHistory.push('/book/details'); }
  return (dispatch) => {
    dispatch(showBookDetails(bookId));
  }

}
