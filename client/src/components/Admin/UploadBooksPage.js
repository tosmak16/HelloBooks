import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { uploadBook } from '../../actions/uploadBooks';
import { uploadImage } from '../../actions/uploadImage';
import lodash from 'lodash';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import getbooks from '../../actions/getBooks';


let sortedData = '';

class UploadBooksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
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
      modalErrorMessage: '',
      error: '',
      message: '',
      display: false,
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.uploadBook(this.state, localStorage.jwtToken);

    this.setState({
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
      display: true,
    });
    document.getElementById('modalOpen').style.display = 'none';
  }

  handleOpen(e) {
    e.preventDefault();
    if (this.state.imageHeight !== 200 || this.state.imageWidth !== 150) {
      this.setState({ modalErrorMessage: 'Please image height  and width must be 200 and 150 respectively' });
      document.getElementById('modalError').style.display = 'block';
    } else if (this.state.imageSize > 500000) {
      this.setState({ modalErrorMessage: 'Please image size must not be more than 500kb' });
      document.getElementById('modalError').style.display = 'block';
    } else if (this.state.bookTitle && this.state.isbn && this.state.stocknumber &&
      this.state.file) {
      this.setState({ modalErrorMessage: '' });
      document.getElementById('modalOpen').style.display = 'block';
    }
  }

  handleClose(e) {
    e.preventDefault();
    document.getElementById('modalOpen').style.display = 'none';
  }

  handleExit(e) {
    e.preventDefault();
    document.getElementById('modalError').style.display = 'none';
    document.getElementById('modalSuccess').style.display = 'none';
    this.setState({
      error: '',
      message: '',
    });
    setTimeout(() => { this.props.getbooks(true); }, 3000);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
        image: Date.now() + file.name,
      });
    };

    reader.readAsDataURL(file);
  }

  componentWillReceiveProps(nextProps) {
    sortedData = nextProps.item[0];
    if (this.state.display) {
      if (!lodash.isEmpty(sortedData.error)) {
        this.setState({
          display: false,
          error: sortedData.error
        });
        document.getElementById('modalError').style.display = 'block';
      } else if (!lodash.isEmpty(sortedData.response)) {
        this.props.uploadImage(this.state.file);
        this.setState({
          file: '',
          display: false,
          message: sortedData.response,
        });
        document.getElementById('modalSuccess').style.display = 'block';
      }
    }
  }


  render() {
    // const { imagePreviewUrl } = this.state;
    // let $imagePreview = null;
    // if (imagePreviewUrl) {
    //   $imagePreview = (<img style={{ width: '100px', height: '100px' }} src={ imagePreviewUrl } />);
    // } else {
    //   $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    // }
    return (
      <div id="b_page" className="row">

        <form className="form-signin col l10 offset-l1 col m11 offset-m2 col s12" action="" encType="multipart/form-data">
          <h4 className="sub-header"> Upload Book</h4>
          <div className="row">
            <div className="form-group input-field">
              <input
                type="text" name="bookTitle"
                className="form-control validate col l12  col m5  col s12"
                id="ubookTitle" placeholder="Title"
                required value={ this.state.bookTitle }
                onChange={ this.handleChange }
              />
            </div>
            <div className="form-group input-field">
              <input
                type="text" name="author"
                className="form-control validate col l12 col m5 offset-m1 col s12"
                id="ubookAuthor" placeholder="Author"
                required value={ this.state.author }
                onChange={ this.handleChange }
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group input-field">
              <input
                type="text" name="category" value={ this.state.category }
                className="form-control validate col l5  col m5 col s12"
                id="ubookCat" placeholder="Category" required
                onChange={ this.handleChange }
              />
            </div>
            <div className="form-group input-field">
              <input
                type="text" name="isbn"
                className="form-control validate col l5 offset-l1 col m5 offset-m1 col s12"
                id="uISBN" placeholder="ISBN"
                required value={ this.state.isbn }
                onChange={ this.handleChange }
              />
            </div>
          </div>
          <div className="form-group input-field">
            <input
              type="number" name="stocknumber" className="form-control validate" id="ustock" placeholder="Number in stock"
              required value={ this.state.stocknumber }
              onChange={ this.handleChange }
            />
          </div>

          <div className="form-group input-field">
            <label htmlFor="ubookSummary" />
            <textarea
              type="textarea" name="summary"
              className="form-control validate"
              id="ubookSummary" placeholder="Summary"
              required value={ this.state.summary }
              onChange={ this.handleChange }
            />
          </div>
          <div className="file-field input-field">
            <div id="filebtn" className="btn">
              <span>File</span>

              <input className="fileInput" id="photoInput" onChange={ this.handleImageChange } type="file" accept=".png, .jpg, .jpeg" />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Upload cover" />


            </div>
          </div>
          <label htmlFor="filebtn">image format *jpg, *png</label>
          <div />
          {/* <div className="previewComponent">
            <div className="imgPreview" >
              {$imagePreview}
            </div>
          </div> */}
          <SingleActionModal
            id={ 'modalError' } heading={ 'Oh!' }
            message={ this.state.error ? this.state.error : this.state.modalErrorMessage }
            onHandleExit={ this.handleExit }
          />
          <SingleActionModal
            id={ 'modalSuccess' } heading={ 'Done!' }
            message={ this.state.message ? this.state.message : '' }
            onHandleExit={ this.handleExit }
          />
          <DoubleActionModal
            id={ 'modalOpen' }
            onHandleClick={ this.handleClick }
            onHandleClose={ this.handleClose }
            bookTitle={ this.state.bookTitle }
            heading={ 'Do you want to add this book to store?' }
          />

          <div className="form-inline">
            <button onClick={ this.handleOpen } style={{ marginTop: '10px', width: '300px' }} id="uploadbtn" type="button" className="btn-sm pbtn">Upload</button>
          </div>


        </form>
      </div>


    );
  }
}
UploadBooksPage.propTypes = {
  getbooks: PropTypes.func.isRequired,
  item: PropTypes.array.isRequired,
  uploadBook: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    item: state.uploadBooks,
  };
}

export default connect(mapStateToProps, { uploadBook, uploadImage, getbooks })(UploadBooksPage);
