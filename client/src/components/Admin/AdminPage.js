import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';

import BookStorePage from './BookStorePage';
import AdminSidebar from './AdminSidebar';
import UploadBooksPage from './UploadBooksPage';
import UpdateBooksPage from './UpdateBooksPage';
import getbooks from '../../actions/getBooks';
import { deleteBook } from '../../actions/deleteBooks';
import refreshPage from '../../actions/refreshPage';
import searchbooks from '../../actions/searchbooks';
import { uploadBook } from '../../actions/uploadBooks';
import { uploadImage } from '../../actions/uploadImage';
import { updateBook } from '../../actions/updateBooks';


class AdminPage extends React.Component {
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
            <UploadBooksPage
              getbooks={ this.props.getbooks } imageUrl={ this.props.imageUrl }
              item={ this.props.uploadItem } uploadBook={ this.props.uploadBook }
              uploadImage={ this.props.uploadImage }
            />
            <UpdateBooksPage
              data={ this.props.data } getbooks={ this.props.getbooks }
              filteredData={ this.props.filteredData } item={ this.props.updateItem }
              searchbooks={ this.props.searchbooks } updateBook={ this.props.updateBook }
              uploadImage={ this.props.uploadImage } imageUrl={ this.props.imageUrl }
            />
          </div>
        </div>
      </div>
    );
  }
}

AdminPage.propTypes = {
  data: PropTypes.array.isRequired,
  deleteBook: PropTypes.func.isRequired,
  filteredData: PropTypes.array.isRequired,
  getbooks: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isFetched: PropTypes.bool.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  item: PropTypes.array.isRequired,
  refreshPage: PropTypes.func.isRequired,
  searchbooks: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  updateItem: PropTypes.array.isRequired,
  uploadBook: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploadItem: PropTypes.array.isRequired,

};


function mapStateToProps(state) {
  return {
    isFetched: state.books[0].isFetched,
    data: state.books[0].data,
    filteredData: state.getFilteredBooks[0].filteredData,
    isRefreshed: state.refreshPage[0].isRefreshed,
    item: state.deleteBooks,
    imageUrl: state.uploadImages[0].response,
    uploadItem: state.uploadBooks,
    updateItem: state.updateBooks,
  };
}

export default connect(mapStateToProps, {
  getbooks,
  deleteBook,
  refreshPage,
  searchbooks,
  uploadBook,
  uploadImage,
  updateBook
})(AdminPage);
