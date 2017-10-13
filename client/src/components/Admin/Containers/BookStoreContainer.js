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


class BookStoreContainer extends React.Component {
  componentWillMount() {
    if (!this.props.isFetched) {
      this.props.getbooks(true);
    }


    $(document).ready(() => {
      $('.modal').modal();
    });
  }
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <AdminSidebar />
            <BookStorePage
              data={ this.props.data }
              deleteBook={ this.props.deleteBook }
              filteredData={ this.props.filteredData }
              getbooks={ this.props.getbooks }
              isRefreshed={ this.props.isRefreshed }
              item={ this.props.item }
              refreshPage={ this.props.refreshPage }
              searchbooks={ this.props.searchbooks }
            />
          </div>
        </div>
      </div>
    );
  }
}

BookStoreContainer.propTypes = {
  data: PropTypes.array.isRequired,
  deleteBook: PropTypes.func.isRequired,
  filteredData: PropTypes.array.isRequired,
  getbooks: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  item: PropTypes.array.isRequired,
  refreshPage: PropTypes.func.isRequired,
  searchbooks: PropTypes.func.isRequired,

};


function mapStateToProps(state) {
  return {
    data: state.books[0].data,
    filteredData: state.getFilteredBooks[0].filteredData,
    isRefreshed: state.refreshPage[0].isRefreshed,
    item: state.deleteBooks,
    isFetched: state.books[0].isFetched,
  };
}

export default connect(mapStateToProps, {
  getbooks,
  deleteBook,
  refreshPage,
  searchbooks,
})(BookStoreContainer);
