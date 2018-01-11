import lodash from 'lodash'
import books from '../../reducers/books';
import { searchFilteredBooks } from '../../actions/filterBooks';

/**
 * @export searchBook
 * 
 * @description it dispatch actions to search for books
 * 
 * @param {string} filterBy 
 * 
 * @param {string} searchText 
 * 
 * @param {array} data 
 * 
 * @returns {action} dispacted actions
 */
export default function searchBook(filterBy, searchText, data) {
  const filteredData = data.filter(item => item[filterBy].toLowerCase().includes(searchText.toLowerCase()));
  return (dispatch) => {
    dispatch(searchFilteredBooks(filteredData));
  }
}

