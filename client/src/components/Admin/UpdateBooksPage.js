import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import $ from 'jquery';

import MembershipSelect from '../select/MembershipSelect';
import SearchBar from '../SearchBar';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';


let sortedData = '';
let pointer = true;

class UpdateBooksPage extends React.Component {
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
      pointer: false,
      modalErrorMessage: '',
      display: false,
      show: false,
      errors: '',
      message: '',
      trigger: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelected = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }


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
        pointer: true,
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
        pointer: false,
        show: false,
      });
    }

    sortedData = nextProps.item[0];
    if (this.state.display) {
      if (!lodash.isEmpty(sortedData.error) && this.state.display) {
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
          pointer: false,
          modalErrorMessage: '',
          display: false,
          errors: sortedData.error,
        });
      } else if (!lodash.isEmpty(sortedData.response) && this.state.display) {
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
          pointer: false,
          modalErrorMessage: '',
          file: '',
          display: false,
          message: sortedData.response
        });
        $('#modalS').modal('open');
      }
    }

    if (this.state.trigger) {
      if (!lodash.isEmpty(nextProps.imageUrl)) {
        this.setState({
          trigger: false,
          image: nextProps.imageUrl,
          display: true,
        });

        setTimeout(() => { this.props.updateBook(this.state, localStorage.jwtToken); }, 5000);
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.file.length !== 0) {
      this.props.uploadImage(this.state.file);
      this.setState({
        display: false,
        trigger: true,
      });
    } else if (this.state.file.length === 0) {
      this.props.updateBook(this.state, localStorage.jwtToken);
      this.setState({
        display: true,
        trigger: false
      });
    }
    $('#modalO').modal('close');
  }

  handleOpen(e) {
    pointer = true;
    e.preventDefault();
    if (this.state.file) {
      if (this.state.imageHeight > 200 || this.state.imageWidth > 150) {
        pointer = false;
        this.setState({ modalErrorMessage: 'Please image height  and width must be 200 and 150 respectively' });
        $('#modalE').modal('open');
      } else if (this.state.imageSize > 500000) {
        pointer = false;
        this.setState({ modalErrorMessage: 'Please image size must not be more than 500kb' });
        $('#modalE').modal('open');
      }
    }

    if (this.state.bookTitle && this.state.isbn && this.state.stocknumber && pointer) {
      this.setState({ modalErrorMessage: '' });
      $('#modalO').modal('open');
      pointer = false;
    }
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({
      errors: '',
      message: '',
    });
    $('#modalO').modal('close');
  }

  handleExit(e) {
    e.preventDefault();
    $('#modalE').modal('close');
    $('#modalS').modal('close');
    this.setState({
      errors: '',
      message: '',
    });
    setTimeout(() => { this.props.getbooks(true); }, 3000);
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length > 3 && this.state.filterBy !== '') {
      this.setState({ error: '', show: true, });
      this.props.searchbooks(this.state.filterBy, this.state.searchText, this.props.data);
    }
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
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


  handleSelected(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div id="bh_table" className="row">
        <form onSubmit={ this.handleSubmit } className="form-signin col l11 offset-l1 col m11 offset-m2 col s12" action="" encType="multipart/form-data">
          <div className="">
            <div className="">
              <MembershipSelect
                onHandleSelected={ this.handleSelected }
                value={ this.state.filterBy }
              />
            </div>
            <div className="">
              <SearchBar onChange={ this.handleChange } name="searchText" value={ this.state.searchText } />
            </div>
          </div >
          <h4 className="sub-header"> Edit book</h4>
          <div className="form-group input-field">
            <label htmlFor="ebookTitle">Title</label>
            <input
              disabled={ !this.state.pointer } name="bookTitle"
              type="text" value={ this.state.bookTitle }
              className="form-control validate" id="ebookTitle"
              placeholder="Book Title" required
              onChange={ this.handleInputChange }
            />
          </div>
          <div className="form-group input-field">
            <label htmlFor="ebookAuthor">Author</label>
            <input
              name="author" disabled={ !this.state.pointer }
              type="text" value={ this.state.author }
              className="form-control validate" id="ebookAuthor"
              placeholder="Author" required
              onChange={ this.handleInputChange }
            />
          </div>
          <div className="form-group input-field">
            <label htmlFor="ebookCat">Category</label>
            <input
              name="category" disabled={ !this.state.pointer }
              type="text" value={ this.state.category }
              className="form-control validate" id="ebookCat"
              placeholder="Category" required
              onChange={ this.handleInputChange }
            />
          </div>
          <div className="form-group input-field">
            <label htmlFor="eISBN">ISBN</label>
            <input
              name="isbn" disabled
              type="text" value={ this.state.isbn }
              className="form-control validate" id="eISBN"
              placeholder="ISBN" required
              onChange={ this.handleInputChange }
            />
          </div>
          <div className="form-group input-field">
            <label htmlFor="estock">Number in stock</label>
            <input
              name="stocknumber" disabled={ !this.state.pointer }
              type="number" value={ this.state.stocknumber }
              className="form-control validate"
              id="estock" placeholder="Number in stock" required
              onChange={ this.handleInputChange }
            />
          </div>

          <div className="form-group input-field">
            <label htmlFor="ebookSummary" />
            <textarea
              type="textarea" name="summary"
              className="form-control validate"
              id="ebookSummary" placeholder="Summary"
              required disabled={ !this.state.pointer }
              value={ this.state.summary }
              onChange={ this.handleInputChange }
            />
          </div>
          <div className="file-field input-field">
            <div id="filebtn" className="btn">
              <span>File</span>
              <input
                disabled={ !this.state.pointer }
                className="fileInput" type="file"
                id="photoInput" onChange={ this.handleImageChange }
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Upload cover" />
            </div>
          </div>

          <SingleActionModal
            id={ 'modalE' } heading={ 'Oh!' }
            message={ this.state.errors ? this.state.errors : this.state.modalErrorMessage }
            onHandleExit={ this.handleExit }
          />
          <SingleActionModal
            id={ 'modalS' } heading={ 'Done!' }
            message={ this.state.message ? this.state.message : '' }
            onHandleExit={ this.handleExit }
          />
          <DoubleActionModal
            id={ 'modalO' }
            onHandleClick={ this.handleClick }
            onHandleClose={ this.handleClose }
            bookTitle={ this.state.bookTitle }
            heading={ 'Do you want to Update this book?' }
          />

          <div className="form-inline">
            <button
              disabled={ !this.state.pointer }
              onClick={ this.handleOpen } style={{ marginTop: '10px', width: '300px' }} id="updatebtn" type="button"
              className="btn-sm pbtn"
            >Update</button>
          </div>
        </form>
      </div>

    );
  }
}

UpdateBooksPage.propTypes = {
  data: PropTypes.array.isRequired,
  filteredData: PropTypes.array.isRequired,
  getbooks: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  item: PropTypes.array.isRequired,
  searchbooks: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,


};


export default UpdateBooksPage;
