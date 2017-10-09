import React from 'react';
import isEmpty from 'lodash/isEmpty';
import filterBy from 'lodash/filter';
import PropTypes from 'prop-types';

import BhTableRow from '../Dashboard/BhTableRow';


let tablerow = '';
class BorrowHistoryTable extends React.Component {
  componentWillMount() {
    if (isEmpty(this.props.data)) {
      this.props.getborrowedBooks(localStorage.jwtToken);
    }

    if (isEmpty(this.props.bookData)) {
      this.props.getbooks(true);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isRefreshed) {
      this.props.getborrowedBooks(localStorage.jwtToken);
    }
  }
  render() {
    if (this.props.data) {
      const { data } = this.props;
      tablerow = data.map(row =>
        (<BhTableRow
          key={ row.id }
          row={ row }
          value={ row.id }
          bookItem={ filterBy(this.props.bookData, ['id', row.bookId]) }
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
  bookData: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  getbooks: PropTypes.func.isRequired,
  getborrowedBooks: PropTypes.func.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
};


export default BorrowHistoryTable;
