import lodash from 'lodash'

import books from '../../reducers/books';
import { getFilteredBooks } from '../../actions/getFilteredBooks';


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
  const y = parseArray.toString().toUpperCase().slice(x, -1).toString().search(',');
  let k = parseArray.toString().slice(x, x + y);
  const sortedData = lodash.orderBy(data, 'createdAt', 'desc');
  if (k.length === 0) {
    k = parseArray.toString().slice(x, -1).toString();
    let k2 = parseArray.toString().slice(-1).toString();
    const filteredData = lodash.filter(sortedData, [filterBy, k + k2]);
    return (dispatch) => {
      dispatch(getFilteredBooks(filteredData));
    }
  }
  else {
    const filteredData = lodash.filter(sortedData, [filterBy, k]);
    return (dispatch) => {
      dispatch(getFilteredBooks(filteredData));
    }
  }

}

