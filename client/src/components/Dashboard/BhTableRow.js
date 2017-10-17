import React from 'react';
import PropTypes from 'prop-types';

let bdate = '';
let fdate = '';
/**
 * 
 * 
 * @class BhTableRow
 * @extends {React.Component}
 */
class BhTableRow extends React.Component {
  /**
   * 
   * 
   * @returns 
   * @memberof BhTableRow
   */
  render() {
    const { row } = this.props;
    const { bookItem } = this.props;
    bdate = row.brdate;
    fdate = row.rdate;
    return (
      <tr >

        <td><img src={bookItem[0].image} style={{ width: '30px', height: '30px' }} alt="name" /></td>
        <td> {bookItem[0].bookTitle}</td>
        <td >{bookItem[0].author}</td>
        <td>{bdate.slice(0, bdate.search('T'))}</td>
        <td >{row.rdate ? fdate.slice(0, fdate.search('T')) : 'Not yet returned'}</td>
      </tr >
    );
  }
}

BhTableRow.propTypes = {
  bookItem: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
};

export default BhTableRow;
