import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';

import BookStorePage from '../BookStorePage';
import AdminSidebar from '../AdminSidebar';
import getbooks from '../../../actions/getBooks';
import { deleteBook } from '../../../actions/deleteBooks';
import refreshPage from '../../../actions/refreshPage';
import searchbooks from '../../../actions/searchbooks';

/**
 * @class BookStoreContainer
 * @extends {React.Component}
 */
class BookStoreContainer extends React.Component {
  /**
   * @memberof BookStoreContainer
   * @returns {void}
   */
  componentWillMount() {
    if (!this.props.isFetched) {
      this.props.getbooks(true);
    }
    $(document).ready(() => {
      $('.modal').modal();
    });
  }
  /**
   * @returns {void}
   * @memberof BookStoreContainer
   */
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <AdminSidebar />
            <BookStorePage
              bookData={this.props.bookData}
              deleteBook={this.props.deleteBook}
              filteredData={this.props.filteredData}
              getbooks={this.props.getbooks}
              isRefreshed={this.props.isRefreshed}
              deleteBookResponse={this.props.deleteBookResponse}
              refreshPage={this.props.refreshPage}
              searchbooks={this.props.searchbooks}
            />
          </div>
        </div>
      </div>
    );
  }
}

BookStoreContainer.propTypes = {
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteBook: PropTypes.func.isRequired,
  filteredData: PropTypes.arrayOf(PropTypes.any).isRequired,
  getbooks: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  deleteBookResponse: PropTypes.arrayOf(PropTypes.any).isRequired,
  refreshPage: PropTypes.func.isRequired,
  searchbooks: PropTypes.func.isRequired,

};

/**
 * @param {arrayOfObject} state
 * @returns {object} of some redux state
 */
const mapStateToProps = function mapStateToProps(state) {
  return {
    bookData: state.books[0].data,
    filteredData: state.getFilteredBooks[0].filteredData,
    isRefreshed: state.refreshPage[0].isRefreshed,
    deleteBookResponse: state.deleteBooks,
    isFetched: state.books[0].isFetched,
  };
};

export default connect(mapStateToProps, {
  getbooks,
  deleteBook,
  refreshPage,
  searchbooks,
})(BookStoreContainer);
