import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import $ from 'jquery';

import CategorySelect from '../select/CategorySelect';
import SearchBar from '../SearchBar';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import ActivityLoader from '../preloader/ActivityLoader';


let sortedData = '';
let imageLoaded = true;
let displayPreloader = 'none';

/**
 * @class UpdateBooksPage
 * @extends {React.Component}
 */
class UpdateBooksPage extends React.Component {
  /**
   * Creates an instance of UpdateBooksPage.
   * @param {object} props
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
      stocknumber: '',
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
   * @param {object} nextProps
   * @memberof UpdateBooksPage
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.filteredData.length !== 0 && this.state.show) {
      this.setState({
        bookId: nextProps.filteredData[0].id,
        bookTitle: nextProps.filteredData[0].bookTitle,
        author: nextProps.filteredData[0].author,
        category: nextProps.filteredData[0].category,
        isbn: nextProps.filteredData[0].isbn,
        stocknumber: nextProps.filteredData[0].stocknumber,
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
        stocknumber: '',
        image: '',
        summary: '',
        imageHeight: 0,
        imageWidth: 0,
        imageSize: 0,
        isDisabled: false,
        show: false,
      });
    }
    sortedData = nextProps.updateItem[0];
    if (this.state.updatingBookDetails) {
      displayPreloader = 'none';
      if (!lodash.isEmpty(sortedData.error) && this.state.updatingBookDetails) {
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
          stocknumber: '',
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
      } else if (!lodash.isEmpty(sortedData.response) && this.state.updatingBookDetails) {
        this.setState({
          filterBy: '',
          searchText: '',
          error: '',
          imagePreviewUrl: '',
          bookTitle: '',
          author: '',
          category: '',
          isbn: '',
          stocknumber: '',
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
        $('#modalS').modal('open');
      }
    }
    if (this.state.updatingBookCoverImage && !this.state.updatingBookFile) {
      displayPreloader = 'none';
      if (!lodash.isEmpty(nextProps.imageUrl)) {
        this.setState({
          updatingBookCoverImage: false,
          image: nextProps.imageUrl,
          updatingBookDetails: true,
        });
        displayPreloader = 'block';
        setTimeout(() => { this.props.updateBook(this.state, localStorage.jwtToken); }, 1000);
      }
    }


    if (this.state.updatingBookFile && !this.state.updatingBookCoverImage) {
      displayPreloader = 'none';
      if (!lodash.isEmpty(nextProps.fileUrl) && !this.state.updatingBookCoverImage) {
        this.setState({
          updatingBookFile: false,
          bookFileUrl: nextProps.fileUrl,
          updatingBookDetails: true,
        });
        displayPreloader = 'block';
        setTimeout(() => { this.props.updateBook(this.state, localStorage.jwtToken); }, 1000);
      }
    }

    if (this.state.updatingBookCoverImage && this.state.updatingBookFile) {
      displayPreloader = 'none';
      if (!lodash.isEmpty(nextProps.imageUrl)) {
        this.setState({
          updatingBookCoverImage: false,
          updatingBookFile: true,
          image: nextProps.imageUrl,
          updatingBookDetails: false,
        });
        displayPreloader = 'block';
        setTimeout(() => { this.props.uploadFile(this.state.bookFile); }, 1000);
      }
    }
  }
  /**
   *
   *
   * @param {object} event
   * @memberof UpdateBooksPage
   * @returns {void}
   */
  handleClick(event) {
    displayPreloader = 'block';
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
   * @memberof UpdateBooksPage
   * @returns {void}
   */
  handleOpen(event) {
    imageLoaded = true;

    event.preventDefault();
    if (this.state.file) {
      if (this.state.imageHeight > 200 || this.state.imageWidth > 150) {
        imageLoaded = false;
        this.setState({ modalErrorMessage: 'Please image height and width must be 200 and 150 respectively' });
        $('#modalE').modal('open');
      } else if (this.state.imageSize > 500000) {
        imageLoaded = false;
        this.setState({ modalErrorMessage: 'Please image size must not be more than 500kb' });
        $('#modalE').modal('open');
      }
    }

    if (this.state.bookTitle && this.state.isbn && this.state.stocknumber && imageLoaded) {
      this.setState({ modalErrorMessage: '' });
      $('#modalO').modal('open');
      imageLoaded = false;
    }
  }
  /**
   * @param {object} event
   * @memberof UpdateBooksPage
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
   * @memberof UpdateBooksPage
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
    setTimeout(() => { this.props.getbooks(true); }, 3000);
  }
  /**
   * @param {object} event
   * @memberof UpdateBooksPage
   * @returns {void}
   */
  handleInputChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param {object} event
   * @memberof UpdateBooksPage
   * @returns {void}
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value.length > 3 && this.state.filterBy !== '') {
      this.setState({ error: '', show: true, });
      this.props.searchbooks(this.state.filterBy, this.state.searchText, this.props.bookData);
    }
  }
  /**
   * @param {object} event
   * @memberof UpdateBooksPage
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
   * @memberof UpdateBooksPage
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
   * @memberof UpdateBooksPage
   * @returns {void}
   */
  handleSelected(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @returns {views} containing form view of input fields
   * @memberof UpdateBooksPage
   */
  render() {
    return (
      <div id="bh_table" className="row">
        <form
          onSubmit={this.handleSubmit}
          className="form-signin col l11 offset-l1 col m11 offset-m2 col s12"
          action=""
          encType="multipart/form-data"
        >
          <div className="">
            <div className="">
              <CategorySelect
                onHandleSelected={this.handleSelected}
                value={this.state.filterBy}
              />
            </div>
            <div className="">
              <SearchBar
                onChange={this.handleChange}
                name="searchText"
                value={this.state.searchText}
              />
            </div>
          </div >
          <h4 className="sub-header"> Edit book</h4>
          <div className="form-group input-field">
            <label htmlFor="ebookTitle">Title</label>
            <input
              disabled={!this.state.isDisabled}
              name="bookTitle"
              type="text"
              value={this.state.bookTitle}
              className="form-control validate"
              id="ebookTitle"
              placeholder="Book Title"
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group input-field">
            <label htmlFor="ebookAuthor">Author</label>
            <input
              name="author"
              disabled={!this.state.isDisabled}
              type="text"
              value={this.state.author}
              className="form-control validate"
              id="ebookAuthor"
              placeholder="Author"
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group input-field">
            <label htmlFor="ebookCat">Category</label>
            <input
              name="category"
              disabled={!this.state.isDisabled}
              type="text"
              value={this.state.category}
              className="form-control validate"
              id="ebookCat"
              placeholder="Category"
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group input-field">
            <label htmlFor="eISBN">ISBN</label>
            <input
              name="isbn"
              disabled
              type="text"
              value={this.state.isbn}
              className="form-control validate"
              id="eISBN"
              placeholder="ISBN"
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group input-field">
            <label htmlFor="estock">Number in stock</label>
            <input
              name="stocknumber"
              disabled={!this.state.isDisabled}
              type="number"
              value={this.state.stocknumber}
              className="form-control validate"
              id="estock"
              placeholder="Number in stock"
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group input-field">
            <label htmlFor="ebookSummary" />
            <textarea
              type="textarea"
              name="summary"
              className="form-control validate"
              id="ebookSummary"
              placeholder="Summary"
              required
              disabled={!this.state.isDisabled}
              value={this.state.summary}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="file-field input-field">
            <div id="filebtn" className="btn">
              <span>File</span>
              <input
                disabled={!this.state.isDisabled}
                className="fileInput"
                type="file"
                id="photoInput"
                onChange={this.handleImageChange}
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="Choose a cover image"
              />
            </div>
          </div>
          <div className="file-field input-field">
            <div id="filebtn" className="btn">
              <span>File</span>
              <input
                disabled={!this.state.isDisabled}
                className="fileInput"
                type="file"
                id="photoInput"
                onChange={this.handleFileChange}
                accept=".pdf"
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Choose a file" />
            </div>
          </div>

          <SingleActionModal
            id={'modalE'}
            heading={'Oh!'}
            message={this.state.errors ? this.state.errors : this.state.modalErrorMessage}
            onHandleExit={this.handleExit}
          />
          <SingleActionModal
            id={'modalS'}
            heading={'Done!'}
            message={this.state.message ? this.state.message : ''}
            onHandleExit={this.handleExit}
          />
          <DoubleActionModal
            id={'modalO'}
            onHandleClick={this.handleClick}
            onHandleClose={this.handleClose}
            bookTitle={this.state.bookTitle}
            heading={'Do you want to Update this book?'}
          />
          <div className="form-inline">
            <button
              disabled={!this.state.isDisabled}
              onClick={this.handleOpen}
              style={{ marginTop: '10px', width: '300px' }}
              id="updatebtn"
              type="button"
              className="btn-sm pbtn"
            >Update</button>
          </div>
          <div
            style={{ display: displayPreloader.toString() }}
            id="activity-loader-id"
            className="activity"
          >
            <ActivityLoader />
          </div>
        </form>
      </div>

    );
  }
}

UpdateBooksPage.propTypes = {
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  fileUrl: PropTypes.string.isRequired,
  filteredData: PropTypes.arrayOf(PropTypes.any).isRequired,
  getbooks: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  updateItem: PropTypes.arrayOf(PropTypes.any).isRequired,
  searchbooks: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,


};


export default UpdateBooksPage;
