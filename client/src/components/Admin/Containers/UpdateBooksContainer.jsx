import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';


import AdminSidebar from '../AdminSidebar';
import UpdateBooksPage from '../UpdateBooksPage';
import getbooks from '../../../actions/getBooks';
import refreshPage from '../../../actions/refreshPage';
import searchbooks from '../../../actions/searchbooks';
import { updateBook } from '../../../actions/updateBooks';
import { uploadImage } from '../../../actions/uploadImage';
import { uploadFile } from '../../../actions/uploadBookFile';

/**
 * @class UpdateBooksContainer
 * @extends {React.Component}
 */
class UpdateBooksContainer extends React.Component {
  /**
   * @memberof UpdateBooksContainer
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
   * @memberof UpdateBooksContainer
   */
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <AdminSidebar />
            <UpdateBooksPage
              bookData={this.props.bookData}
              getbooks={this.props.getbooks}
              filteredData={this.props.filteredData}
              updateItem={this.props.updateItem}
              searchbooks={this.props.searchbooks}
              updateBook={this.props.updateBook}
              uploadImage={this.props.uploadImage}
              imageUrl={this.props.imageUrl}
              fileUrl={this.props.fileUrl}
              uploadFile={this.props.uploadFile}
            />
          </div>
        </div>
      </div>
    );
  }
}

UpdateBooksContainer.propTypes = {
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  fileUrl: PropTypes.string.isRequired,
  filteredData: PropTypes.arrayOf(PropTypes.any).isRequired,
  getbooks: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isFetched: PropTypes.bool.isRequired,
  searchbooks: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  updateItem: PropTypes.arrayOf(PropTypes.any).isRequired,
  uploadFile: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,

};

/**
 * @param {arrayOfObject} state
 * @returns {object} of someredux state
 */
const mapStateToProps = function mapStateToProps(state) {
  return {
    isFetched: state.books[0].isFetched,
    bookData: state.books[0].data,
    filteredData: state.getFilteredBooks[0].filteredData,
    imageUrl: state.uploadImages[0].response,
    updateItem: state.updateBooks,
    fileUrl: state.bookFileUpload[0].response,
  };
};

export default connect(mapStateToProps, {
  getbooks,
  refreshPage,
  searchbooks,
  updateBook,
  uploadImage,
  uploadFile
})(UpdateBooksContainer);
