import React from 'react';
import isEmpty from 'lodash/isEmpty';
import filterBy from 'lodash/filter';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BhTableRow from '../Dashboard/BhTableRow';
import getborrowedBooks from '../../actions/getborrowedBooks';
import getbooks from '../../actions/getBooks';
import refreshPage from '../../actions/refreshPage';

let tablerow = '';
class BorrowHistoryTable extends React.Component {
  componentWillMount() {
    if (isEmpty(this.props.data)) {
      this.props.getborrowedBooks();
    }

    if (isEmpty(this.props.bookData)) {
      this.props.getbooks(true);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isRefreshed) {
      setTimeout(() => { this.props.refreshPage(true); }, 1000);
      this.props.getborrowedBooks();
      setTimeout(() => { this.props.refreshPage(false); }, 1000);
      // this.props.getbooks(true);
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
  getbooks: PropTypes.func.isRequired,
  getborrowedBooks: PropTypes.func.isRequired,
  refreshPage: PropTypes.func.isRequired,

};

function mapStateToProps(state) {
  return {
    error: state.getborrowedBooks[0].error,
    data: state.getborrowedBooks[0].data,
    bookData: state.books[0].data,
    isRefreshed: state.refreshPage[0].isRefreshed
  };
}

export default connect(mapStateToProps, { getborrowedBooks, getbooks, refreshPage })(BorrowHistoryTable);
