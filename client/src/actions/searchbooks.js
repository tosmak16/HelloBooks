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

  // let arraysss = ['tobi', 'tobii', 'tobi is a boy', 'the is']
  // let c = arraysss.toString().indexOf('the')
  // let j = arraysss.toString().slice(c, -1)
  // let k = j.toString().indexOf(',');
  // let l = arraysss.toString().slice(c, c + k);
  // let p = arraysss.toString().slice(0, c).lastIndexOf(',');
  // let u = arraysss.toString().slice(p + 1, c + k)
  // console.log(u);
  const parseArray = newArray;
  const x = parseArray.toString().toUpperCase().search(searchText.toUpperCase());
  let j = parseArray.toString().slice(x, -1)
  let k = j.toString().indexOf(',');
  let l = parseArray.toString().slice(x, x + k);
  let p = parseArray.toString().slice(0, x).lastIndexOf(',');
  let u = parseArray.toString().slice(p + 1, x + k)
  // const y = parseArray.toString().toUpperCase().slice(x, -1).toString().search(',');
  // let k = parseArray.toString().slice(x, x + y);
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

