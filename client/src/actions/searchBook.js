import lodash from 'lodash'
import books from '../../reducers/books';
import { searchFilteredBooks } from '../../actions/filterBooks';

/**
 * @export searchBook
 * @description it dispatch actions to search for books
 * @param {string} filterBy 
 * @param {string} searchText 
 * @param {array} data 
 * @returns {action} dispacted actions
 */
export default function searchBook(filterBy, searchText, data) {
  const newArray = [];
  data.forEach((element) => {
    if (filterBy === 'isbn') {
      newArray.push(element.isbn);
    }
    else if (filterBy === 'category') {
      newArray.push(element.category);
    }
    else if (filterBy === 'author') {
      newArray.push(element.author);
    }
    else {
      newArray.push(element.bookTitle);
    }
  });
  const parseArray = newArray;
  const searchTextIndex = parseArray.toString().toUpperCase().search(searchText.toUpperCase());
  let slicedSearchTextIndex = parseArray.toString().slice(searchTextIndex, -1)
  let commaIndexArray = slicedSearchTextIndex.toString().indexOf(',');
  let sortedArray = parseArray.toString().slice(searchTextIndex, searchTextIndex + commaIndexArray);
  let commaLastIndex = parseArray.toString().slice(0, searchTextIndex).lastIndexOf(',');
  let lastSortedArray = parseArray.toString().slice(commaLastIndex + 1, searchTextIndex + commaIndexArray)

  const sortedData = lodash.orderBy(data, 'createdAt', 'desc');
  if (sortedArray.length === 0) {
    sortedArray = parseArray.toString().slice(searchTextIndex, -1).toString();
    let sortedArray2 = parseArray.toString().slice(-1).toString();
    const filteredData = lodash.filter(sortedData, [filterBy, sortedArray + sortedArray2]);
    return (dispatch) => {
      dispatch(searchFilteredBooks(filteredData));
    }
  }
  else {
    const filteredData = lodash.filter(sortedData, [filterBy, lastSortedArray]);
    return (dispatch) => {
      dispatch(searchFilteredBooks(filteredData));
    }
  }

}

