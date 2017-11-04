import lodash from 'lodash'

import books from '../../reducers/books';
import { getFilteredBooks } from '../../actions/getFilteredBooks';

/**
 * 
 * 
 * @export
 * @param {any} filterBy 
 * @param {any} searchText 
 * @param {any} data 
 * @returns 
 */
export default function searchbooks(filterBy, searchText, data) {
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
  }, this);



  const parseArray = newArray;
  const x = parseArray.toString().toUpperCase().search(searchText.toUpperCase());
  let j = parseArray.toString().slice(x, -1)
  let k = j.toString().indexOf(',');
  let l = parseArray.toString().slice(x, x + k);
  let p = parseArray.toString().slice(0, x).lastIndexOf(',');
  let u = parseArray.toString().slice(p + 1, x + k)

  const sortedData = lodash.orderBy(data, 'createdAt', 'desc');
  if (l.length === 0) {
    l = parseArray.toString().slice(x, -1).toString();
    let l2 = parseArray.toString().slice(-1).toString();
    const filteredData = lodash.filter(sortedData, [filterBy, l + l2]);
    return (dispatch) => {
      dispatch(getFilteredBooks(filteredData));
    }
  }
  else {
    const filteredData = lodash.filter(sortedData, [filterBy, u]);
    return (dispatch) => {
      dispatch(getFilteredBooks(filteredData));
    }
  }

}

