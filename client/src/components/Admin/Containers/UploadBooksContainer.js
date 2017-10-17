import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';


import AdminSidebar from '../AdminSidebar';
import UploadBooksPage from '../UploadBooksPage';
import getbooks from '../../../actions/getBooks';
import { uploadBook } from '../../../actions/uploadBooks';
import { uploadImage } from '../../../actions/uploadImage';
import { uploadFile } from '../../../actions/uploadBookFile';

/**
 * 
 * 
 * @class UploadBooksContainer
 * @extends {React.Component}
 */
class UploadBooksContainer extends React.Component {
  /**
   * 
   * 
   * @memberof UploadBooksContainer
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
   * 
   * 
   * @returns 
   * @memberof UploadBooksContainer
   */
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <AdminSidebar />
            <UploadBooksPage
              getbooks={ this.props.getbooks } imageUrl={ this.props.imageUrl }
              item={ this.props.uploadItem } uploadBook={ this.props.uploadBook }
              uploadImage={ this.props.uploadImage } fileUrl={ this.props.fileUrl }
              uploadFile={ this.props.uploadFile }
            />
          </div>
        </div>
      </div>
    );
  }
}

UploadBooksContainer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  getbooks: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isFetched: PropTypes.bool.isRequired,
  uploadBook: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploadItem: PropTypes.array.isRequired,
};

/**
 * 
 * 
 * @param {any} state 
 * @returns 
 */
const mapStateToProps = function mapStateToProps(state) {
  return {
    isFetched: state.books[0].isFetched,
    imageUrl: state.uploadImages[0].response,
    uploadItem: state.uploadBooks,
    fileUrl: state.bookFileUpload[0].response,
  };
};

export default connect(mapStateToProps, {
  getbooks,
  uploadBook,
  uploadImage,
  uploadFile
})(UploadBooksContainer);
