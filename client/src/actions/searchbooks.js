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
  const k = parseArray.toString().slice(x, x + y);
  console.log(k.toString().toUpperCase());
  const sortedData = lodash.orderBy(data, 'createdAt', 'desc');

  const filteredData = lodash.filter(sortedData, [filterBy, k]);
  console.log(filteredData);
  return (dispatch) => {
    dispatch(getFilteredBooks(filteredData));
  }

}

