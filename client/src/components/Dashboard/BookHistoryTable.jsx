import React from 'react';
import filterBy from 'lodash/filter';
import PropTypes from 'prop-types';
import { BookHistoryTableRow } from '../Dashboard/BookHistoryTableRow';
/**
 * @description Displays Borrowed Books History Table
 * 
 * @function BorrowHistoryTable
 * 
 * @param {object} props
 * 
 * @return {views} BookHistoryTable
 */
export const BorrowHistoryTable = (props) => {
  const { borrowBooksHistoryDate } = props;
  const tablerow = borrowBooksHistoryDate.map(book =>
    (<BookHistoryTableRow
      key={book.id}
      book={book}
      value={book.id}
      bookItem={filterBy(props.bookData, ['id', book.bookId])}
    />)
  );
  return (
    <div id="bh_table" className="row">
      <div className=" col l10 offset-l2 col m10 offset-m2 col s12">
        <h4 className="sub-header">Read List</h4>
        <div className="table-responsive">
          <table id="table_bh" className="table responsive-table bordered highlight striped">
            <thead>
              <tr>
                <th><span className="glyphicon glyphicon-education" /></th>
                <th>Title</th>
                <th>Author</th>
                <th>Borrowed Date</th>
                <th>Returned Date</th>
              </tr>
            </thead>
            <tbody>
              {tablerow}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
BorrowHistoryTable.propTypes = {
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  borrowBooksHistoryDate: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default BorrowHistoryTable;
