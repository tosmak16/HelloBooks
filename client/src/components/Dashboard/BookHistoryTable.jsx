import React from 'react';
import isEmpty from 'lodash/isEmpty';
import filterBy from 'lodash/filter';
import PropTypes from 'prop-types';

import BookHistoryTableRow from '../Dashboard/BookHistoryTableRow';


let tablerow = '';
/**
 * @class BorrowHistoryTable
 * @extends {React.Component}
 */
class BorrowHistoryTable extends React.Component {
  /**
   * @memberof BorrowHistoryTable
   * @returns {void}
   */
  componentWillMount() {
    if (isEmpty(this.props.borrowBooksHistoryDate)) {
      this.props.getborrowedBooks(localStorage.jwtToken);
    }

    if (isEmpty(this.props.bookData)) {
      this.props.getbooks(true);
    }
  }
  /**
   * @returns {void}
   * @param {object} nextProps
   * @memberof BorrowHistoryTable
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isRefreshed) {
      this.props.getborrowedBooks(localStorage.jwtToken);
    }
  }
  /**
   * @returns {views} containing table list of user's borrowing history
   * @memberof BorrowHistoryTable
   */
  render() {
    if (this.props.borrowBooksHistoryDate) {
      const { borrowBooksHistoryDate } = this.props;
      tablerow = borrowBooksHistoryDate.map(book =>
        (<BookHistoryTableRow
          key={book.id}
          book={book}
          value={book.id}
          bookItem={filterBy(this.props.bookData, ['id', book.bookId])}
        />)
      );
    }
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
  }
}

BorrowHistoryTable.propTypes = {
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  borrowBooksHistoryDate: PropTypes.arrayOf(PropTypes.any).isRequired,
  getbooks: PropTypes.func.isRequired,
  getborrowedBooks: PropTypes.func.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
};


export default BorrowHistoryTable;
