import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import _ from 'lodash';
import AdminSidebar from '../AdminSidebar';
import UploadBooksPage from '../UploadBooksPage';
import getbooks from '../../../actions/getBooks';
import { uploadBook } from '../../../actions/uploadBooks';
import { uploadImage } from '../../../actions/uploadImage';
import { uploadFile } from '../../../actions/uploadBookFile';
import { logout } from '../../../actions/logoutAction';
import {
  validateBookDetails
} from '../../../helperFunctions/validateBookDetails';

/**
 * @class UploadBooksContainer
 * @extends {React.Component}
 */
class UploadBooksContainer extends React.Component {
  /**
   * Creates an instance of UploadBooksPage.
   * @param {object} props
   * @memberof UploadBooksPage
   */
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      bookTitle: '',
      author: '',
      category: '',
      isbn: '',
      stockNumber: '',
      image: '',
      summary: '',
      imageHeight: 0,
      imageWidth: 0,
      imageSize: 0,
      modalErrorMessage: '',
      error: '',
      message: '',
      uploadingBookFile: false,
      uploadingBook: false,
      bookFile: '',
      bookFileUrl: '',
      uploadingBookCoverImage: false,
      displayPreloader: 'none'
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }
  /**
   * @memberof UploadBooksContainer
   * @returns {void}
   */
  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.getbooks(true);
    }
    $(document).ready(() => {
      $('.modal').modal();
    });
  }
  /**
   * @param {object} nextProps
   * @memberof UploadBooksPage
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const sortedData = nextProps.uploadBookItem[0];
    if (this.state.uploadingBookFile) {
      this.setState({
        displayPreloader: 'none'
      });
      if (!_.isEmpty(sortedData.error)) {
        this.setState({
          uploadingBookFile: false,
          error: sortedData.error
        });
        $('#modalError').modal('open');
      } else if (!_.isEmpty(sortedData.response)) {
        this.setState({
          file: '',
          uploadingBookFile: false,
          message: sortedData.response,
          imagePreviewUrl: '',
          bookTitle: '',
          author: '',
          category: '',
          isbn: '',
          stockNumber: '',
          image: '',
          summary: '',
          imageHeight: 0,
          imageWidth: 0,
          imageSize: 0,
        });
        $('#modalSuccess').modal('open');
        const fld = document.getElementById('photoInput');
        fld.form.reset();
        fld.focus();
      }
    }
    if (this.state.uploadingBook) {
      this.setState({
        displayPreloader: 'none'
      });
      if (!_.isEmpty(nextProps.imageUrl)) {
        this.setState({
          uploadingBook: false,
          image: nextProps.imageUrl,
          uploadingBookFile: false,
          uploadingBookCoverImage: true,
          displayPreloader: 'block'
        });
        setTimeout(() => { this.props.uploadFile(this.state.bookFile); }, 1000);
      }
    }

    if (this.state.uploadingBookCoverImage) {
      if (!_.isEmpty(nextProps.fileUrl)) {
        this.setState({
          uploadingBook: false,
          bookFileUrl: nextProps.fileUrl,
          uploadingBookFile: true,
          uploadingBookCoverImage: false,
          displayPreloader: 'block'
        });
        setTimeout(() => { this.props.uploadBook(this.state, localStorage.jwtToken); }, 1000);
      }
    }
  }
  /**
   * @param {object} event
   * @memberof UploadBooksPage
   * @returns {void}
   */
  handleClick(event) {
    this.setState({
      displayPreloader: 'block'
    });
    event.preventDefault();
    this.props.uploadImage(this.state.file);
    this.setState({
      uploadingBook: true,
      uploadingBookFile: false,
    });
    $('#modalOpen').modal('close');
  }
  /**
   * @param {object} event
   * @memberof UploadBooksPage
   * @returns {void}
   */
  handleOpen(event) {
    event.preventDefault();
    validateBookDetails(this.state)
      .then((responseMessage) => {
        if (responseMessage !== '') {
          this.setState({ modalErrorMessage: responseMessage });
          $('#modalError').modal('open');
        } else if (this.state.imageHeight !== 200 || this.state.imageWidth !== 150) {
          this.setState({ modalErrorMessage: 'Please image height  and width must be 200 and 150 respectively' });
          $('#modalError').modal('open');
        } else if (this.state.imageSize > 500000) {
          this.setState({ modalErrorMessage: 'Please image size must not be more than 500kb' });
          $('#modalError').modal('open');
        } else if (this.state.file && this.state.bookFile) {
          this.setState({ modalErrorMessage: '' });
          $('#modalOpen').modal('open');
        }
      });
  }
  /**
   * @param {object} event
   * @memberof UploadBooksPage
   * @returns {void}
   */
  handleClose(event) {
    event.preventDefault();
    $('#modalOpen').modal('close');
    this.setState({
      errorFix: true,
    });
  }
  /**
   * @param {object} event
   * @memberof UploadBooksPage
   * @returns {void}
   */
  handleExit(event) {
    event.preventDefault();
    $('#modalError').modal('close');
    $('#modalSuccess').modal('close');
    this.setState({
      error: '',
      message: '',
    });
    setTimeout(() => { this.props.getbooks(true); }, 3000);
  }
  /**
   * @param {object} event
   * @memberof UploadBooksPage
   * @returns {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {object} event
   * @memberof UploadBooksPage
   * @returns {void}
   */
  handleImageChange(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;
      image.onload = () => {
        this.setState({
          imageHeight: image.height,
          imageWidth: image.width,
          imageSize: file.size,
        });
      };
    };
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  /**
   * @param {object} event
   * @memberof UploadBooksPage
   * @returns {void}
   */
  handleFileChange(event) {
    event.preventDefault();
    const reader = new FileReader();
    const bookFile = event.target.files[0];
    reader.onload = () => {
    };
    reader.onloadend = () => {
      this.setState({
        bookFile,
      });
    };
    reader.readAsDataURL(bookFile);
  }

  /**
   * @returns {views} containing uploadbook and admin sidebar component
   * @memberof UploadBooksContainer
   */
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <AdminSidebar
              logout={this.props.logout}
            />
            <UploadBooksPage
              handleChange={this.handleChange}
              handleClick={this.handleClick}
              handleClose={this.handleClose}
              handleExit={this.handleExit}
              handleFileChange={this.handleFileChange}
              handleImageChange={this.handleImageChange}
              handleOpen={this.handleOpen}
              state={this.state}
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
  logout: PropTypes.func.isRequired,
  uploadBook: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploadBookItem: PropTypes.arrayOf(PropTypes.any).isRequired,
};

/**
 * @param {arrayOfObject} state
 * @returns {object} of some redux state
 */
const mapStateToProps = function mapStateToProps(state) {
  return {
    isFetched: state.books[0].isFetched,
    imageUrl: state.uploadImages[0].response,
    uploadBookItem: state.uploadBooks,
    fileUrl: state.bookFileUpload[0].response,
  };
};

export default connect(mapStateToProps, {
  getbooks,
  uploadBook,
  uploadImage,
  uploadFile,
  logout
})(UploadBooksContainer);
