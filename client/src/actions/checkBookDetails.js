import lodash from 'lodash'
import { browserHistory } from 'react-router';
import { showBookDetails } from '../../actions/showBookDetails';
/**
 * @export checkBookDetails
 * @description this action controller helps to get selected book
 * and show its details
 * @param {string} bookId 
 * @param {boolean} set 
 * @returns {void}
 */
export const checkBookDetails = (bookId, set) => {
  return async (dispatch) => {
    dispatch(showBookDetails(bookId));
    set && browserHistory.push('/book/details');
  }
}
export default checkBookDetails;
