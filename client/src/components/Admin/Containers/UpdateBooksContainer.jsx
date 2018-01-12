import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import _ from 'lodash';
import AdminSidebar from '../AdminSidebar';
import UpdateBooksPage from '../UpdateBooksPage';
import { getBooks } from '../../../actions/getBooks';
import refreshPage from '../../../actions/refreshPage';
import searchBook from '../../../actions/searchBook';
import { updateBook } from '../../../actions/updateBook';
import { uploadImage } from '../../../actions/uploadImage';
import { uploadFile } from '../../../actions/uploadFile';
import { updateBookDetailsTemp } from '../HelperFunctions/updateBookDetailsTemp';
import { logout } from '../../../actions/logout';
import { validateBookDetails } from '../../../helperFunctions/validateBookDetails';

/**
 * @description UpdateBooks Connected component
 * 
 * @class UpdateBooksContainer
 * 
 * @extends {React.Component}
 */
class UpdateBooksContainer extends React.Component {
  /**
 * @description Creates an instance of UpdateBooksPage.
 * 
 * @param {object} props
 * 
 * @memberof UpdateBooksPage
 */
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      bookId: '',
      filterBy: '',
      searchText: '',
      error: '',
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
      isDisabled: false,
      modalErrorMessage: '',
      updatingBookDetails: false,
      show: false,
      errors: '',
      message: '',
      updatingBookCoverImage: false,
      bookFile: '',
      bookFileUrl: '',
      updatingBookFile: false,
      displayPreloader: 'none',
      imageLoaded: false,
      bookData: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelected = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }
  /**
   * @memberof UpdateBooksContainer
   * 
   * @returns {void}
   */
  componentDidMount() {
    document.title = 'UpdateBooksPage';

    if (!this.props.isFetched) {
      this.props.getBooks(true);
    }
    $(document).ready(() => {
      $('.modal').modal();
    });
  }
  /**
   * @param {object} nextProps
   * 
   * @memberof UpdateBooksPage
   * 
   * @returns {void}
  */
  componentWillReceiveProps(nextProps) {
    if (this.props.isFetched) {
      this.setState({
        bookData: nextProps.bookData
      });
    }
    if (nextProps.filteredData.length !== 0 && this.state.show) {
      this.setState({
        bookId: nextProps.filteredData[0].id,
        bookTitle: nextProps.filteredData[0].bookTitle,
        author: nextProps.filteredData[0].author,
        category: nextProps.filteredData[0].category,
        stockNumber: nextProps.filteredData[0].stockNumber,
        isbn: nextProps.filteredData[0].isbn,
        image: nextProps.filteredData[0].image,
        summary: nextProps.filteredData[0].summary,
        isDisabled: true,
        show: false,
      });
    }
    if (nextProps.filteredData.length === 0 && this.state.show) {
      this.setState({
        bookId: '',
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
        isDisabled: false,
        show: false,
      });
    }
    const sortedData = nextProps.updateItem[0];
    if (this.state.updatingBookDetails) {
      this.setState({
        displayPreloader: 'none'
      });
      if (!_.isEmpty(sortedData.error) && this.state.updatingBookDetails) {
        const fld = document.getElementById('photoInput');
        fld.form.reset();
        fld.focus();
        $('#modalE').modal('open');
        this.setState({
          filterBy: '',
          searchText: '',
          error: '',
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
          isDisabled: false,
          modalErrorMessage: '',
          updatingBookDetails: false,
          errors: sortedData.error,
        });
      } else if (!_.isEmpty(sortedData.response) && this.state.updatingBookDetails) {
        updateBookDetailsTemp(this.state);
        this.setState({
          filterBy: '',
          searchText: '',
          error: '',
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
          isDisabled: false,
          modalErrorMessage: '',
          file: '',
          updatingBookDetails: false,
          message: sortedData.response
        });
        const fld = document.getElementById('photoInput');
        fld.form.reset();
        fld.focus();
        $('#modalS').modal('open');
      }
    }
    if (this.state.updatingBookCoverImage && !this.state.updatingBookFile) {
      this.setState({
        displayPreloader: 'none'
      });
      if (!_.isEmpty(nextProps.imageUrl)) {
        this.setState({
          updatingBookCoverImage: false,
          image: nextProps.imageUrl,
          updatingBookDetails: true,
          displayPreloader: 'block'
        });
        setTimeout(() => { this.props.updateBook(this.state, localStorage.jwtToken); }, 1000);
      }
    }
    if (this.state.updatingBookFile && !this.state.updatingBookCoverImage) {
      this.setState({
        displayPreloader: 'none'
      });
      if (!_.isEmpty(nextProps.fileUrl) && !this.state.updatingBookCoverImage) {
        this.setState({
          updatingBookFile: false,
          bookFileUrl: nextProps.fileUrl,
          updatingBookDetails: true,
          displayPreloader: 'block'
        });
        setTimeout(() => { this.props.updateBook(this.state, localStorage.jwtToken); }, 1000);
      }
    }
    if (this.state.updatingBookCoverImage && this.state.updatingBookFile) {
      this.setState({
        displayPreloader: 'none'
      });
      if (!_.isEmpty(nextProps.imageUrl)) {
        this.setState({
          updatingBookCoverImage: false,
          updatingBookFile: true,
          image: nextProps.imageUrl,
          updatingBookDetails: false,
          displayPreloader: 'block'
        });
        setTimeout(() => { this.props.uploadFile(this.state.bookFile); }, 1000);
      }
    }
  }
  /**
   * @param {object} event
   * 
   * @memberof UpdateBooksPage
   * 
   * @returns {void}
   */
  handleClick(event) {
    this.setState({
      displayPreloader: 'block'
    });
    event.preventDefault();
    if (this.state.file.length !== 0 && this.state.bookFile.length === 0) {
      this.props.uploadImage(this.state.file);
      this.setState({
        updatingBookDetails: false,
        updatingBookFile: false,
        updatingBookCoverImage: true,
      });
    } else if (this.state.bookFile.length !== 0 && this.state.file.length === 0) {
      this.props.uploadFile(this.state.bookFile);
      this.setState({
        updatingBookDetails: false,
        updatingBookCoverImage: false,
        updatingBookFile: true,
      });
    } else if (this.state.file.length === 0 && this.state.bookFile.length === 0) {
      this.props.updateBook(this.state, localStorage.jwtToken);
      this.setState({
        updatingBookDetails: true,
        updatingBookCoverImage: false,
        updatingBookFile: false,
      });
    } else if (this.state.file.length !== 0 && this.state.bookFile.length !== 0) {
      this.props.uploadImage(this.state.file);
      this.setState({
        updatingBookDetails: false,
        updatingBookCoverImage: true,
        updatingBookFile: true,
      });
    }
    $('#modalO').modal('close');
  }

  /**
   * @param {object} event
   * 
   * @memberof UpdateBooksPage
   * 
   * @returns {void}
   */
  handleOpen(event) {
    this.setState({
      imageLoaded: true
    });
    event.preventDefault();
    validateBookDetails(this.state)
      .then((responseMessage) => {
        if (responseMessage !== '') {
          this.setState({
            imageLoaded: false,
            modalErrorMessage: responseMessage
          });
          $('#modalE').modal('open');
        } else if (this.state.file) {
          if (this.state.imageHeight > 200 || this.state.imageWidth > 150) {
            this.setState({
              imageLoaded: false,
              modalErrorMessage: 'Please image height and width must be 200 and 150 respectively'
            });
            $('#modalE').modal('open');
          } else if (this.state.imageSize > 500000) {
            this.setState({
              imageLoaded: false,
              modalErrorMessage: 'Please image size must not be more than 500kb'
            });
            $('#modalE').modal('open');
          }
        }

        if (this.state.bookTitle && this.state.isbn &&
          this.state.stockNumber && this.state.imageLoaded) {
          this.setState({
            modalErrorMessage: '',
            imageLoaded: false
          });
          $('#modalO').modal('open');
        }
      });
  }
  /**
   * @param {object} event
   * 
   * @memberof UpdateBooksPage
   * 
   * @returns {void}
   */
  handleClose(event) {
    event.preventDefault();
    this.setState({
      errors: '',
      message: '',
      bookFile: '',
      file: ''
    });
    $('#modalO').modal('close');
  }
  /**
   * @param {object} event
   * 
   * @memberof UpdateBooksPage
   * 
   * @returns {void}
   */
  handleExit(event) {
    event.preventDefault();
    $('#modalE').modal('close');
    $('#modalS').modal('close');
    this.setState({
      errors: '',
      message: '',
      bookFile: '',
      file: ''
    });
  }
  /**
   * @param {object} event
   * 
   * @memberof UpdateBooksPage
   * 
   * @returns {void}
   */
  handleInputChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param {object} event
   * 
   * @memberof UpdateBooksPage
   * 
   * @returns {void}
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value.length > 3 && this.state.filterBy !== '') {
      this.setState({ error: '', show: true, });
      this.props.searchBook(this.state.filterBy, this.state.searchText, this.props.bookData);
    }
  }
  /**
   * @param {object} event
   * 
   * @memberof UpdateBooksPage
   * 
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
   * 
   * @memberof UpdateBooksPage
   * 
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
   * @param {object} event
   * 
   * @memberof UpdateBooksPage
   * 
   * @returns {void}
   */
  handleSelected(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @returns {void}
   * 
   * @memberof UpdateBooksContainer
   */
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <AdminSidebar
              logout={this.props.logout}
            />
            <UpdateBooksPage
              handleChange={this.handleChange}
              handleClick={this.handleClick}
              handleClose={this.handleClose}
              handleExit={this.handleExit}
              handleSelected={this.handleSelected}
              handleFileChange={this.handleFileChange}
              handleImageChange={this.handleImageChange}
              handleOpen={this.handleOpen}
              handleInputChange={this.handleInputChange}
              state={this.state}
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
  getBooks: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isFetched: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  searchBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  updateItem: PropTypes.arrayOf(PropTypes.any).isRequired,
  uploadFile: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,

};
/**
 * @param {arrayOfObject} state
 * 
 * @returns {object} of someredux state
 */
const mapStateToProps = function mapStateToProps(state) {
  return {
    isFetched: state.books[0].isFetched,
    bookData: state.books[0].data,
    filteredData: state.filteredBooks[0].filteredData,
    imageUrl: state.uploadImages[0].response,
    updateItem: state.updateBooks,
    fileUrl: state.bookFileUpload[0].response,
  };
};
export default connect(mapStateToProps, {
  getBooks,
  refreshPage,
  searchBook,
  updateBook,
  uploadImage,
  uploadFile,
  logout
})(UpdateBooksContainer);
