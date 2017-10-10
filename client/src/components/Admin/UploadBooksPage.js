import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import $ from 'jquery';


import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';


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
      show: false,
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    sortedData = nextProps.item[0];
    if (this.state.display) {
      if (!lodash.isEmpty(sortedData.error)) {
        this.setState({
          display: false,
          error: sortedData.error
        });
        $('#modalError').modal('open');
      } else if (!lodash.isEmpty(sortedData.response)) {
        this.setState({
          file: '',
          display: false,
          message: sortedData.response,
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
        });
        $('#modalSuccess').modal('open');
      }
    }


    if (this.state.show) {
      if (!lodash.isEmpty(nextProps.imageUrl)) {
        this.setState({
          show: false,
          image: nextProps.imageUrl,
          display: true,
        });

        setTimeout(() => { this.props.uploadBook(this.state, localStorage.jwtToken); }, 5000);
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.props.uploadImage(this.state.file);
    this.setState({
      show: true,
      display: false,
    });
    $('#modalOpen').modal('close');
  }

  handleOpen(e) {
    e.preventDefault();
    if (this.state.imageHeight !== 200 || this.state.imageWidth !== 150) {
      this.setState({ modalErrorMessage: 'Please image height  and width must be 200 and 150 respectively' });
      $('#modalError').modal('open');
    } else if (this.state.imageSize > 500000) {
      this.setState({ modalErrorMessage: 'Please image size must not be more than 500kb' });
      $('#modalError').modal('open');
    } else if (this.state.bookTitle && this.state.isbn && this.state.stocknumber &&
      this.state.file) {
      this.setState({ modalErrorMessage: '' });
      $('#modalOpen').modal('open');
    }
  }

  handleClose(e) {
    e.preventDefault();
    $('#modalOpen').modal('close');
  }

  handleExit(e) {
    e.preventDefault();
    $('#modalError').modal('close');
    $('#modalSuccess').modal('close');
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
      });
    };

    reader.readAsDataURL(file);
  }


  render() {
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
                required value={this.state.bookTitle}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group input-field">
              <input
                type="text" name="author"
                className="form-control validate col l12 col m5 offset-m1 col s12"
                id="ubookAuthor" placeholder="Author"
                required value={this.state.author}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group input-field">
              <input
                type="text" name="category" value={this.state.category}
                className="form-control validate col l5  col m5 col s12"
                id="ubookCat" placeholder="Category" required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group input-field">
              <input
                type="text" name="isbn"
                className="form-control validate col l5 offset-l1 col m5 offset-m1 col s12"
                id="uISBN" placeholder="ISBN"
                required value={this.state.isbn}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group input-field">
            <input
              type="number" name="stocknumber" className="form-control validate" id="ustock" placeholder="Number in stock"
              required value={this.state.stocknumber}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group input-field">
            <label htmlFor="ubookSummary" />
            <textarea
              type="textarea" name="summary"
              className="form-control validate"
              id="ubookSummary" placeholder="Summary"
              required value={this.state.summary}
              onChange={this.handleChange}
            />
          </div>
          <div className="file-field input-field">
            <div id="filebtn" className="btn">
              <span>File</span>

              <input className="fileInput" id="photoInput" onChange={this.handleImageChange} type="file" accept=".png, .jpg, .jpeg" />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Upload cover" />


            </div>
          </div>
          <label htmlFor="filebtn">image format *jpg, *png</label>
          <div />
          <SingleActionModal
            id={'modalError'} heading={'Oh!'}
            message={this.state.error ? this.state.error : this.state.modalErrorMessage}
            onHandleExit={this.handleExit}
          />
          <SingleActionModal
            id={'modalSuccess'} heading={'Done!'}
            message={this.state.message ? this.state.message : ''}
            onHandleExit={this.handleExit}
          />
          <DoubleActionModal
            id={'modalOpen'}
            onHandleClick={this.handleClick}
            onHandleClose={this.handleClose}
            bookTitle={this.state.bookTitle}
            heading={'Do you want to add this book to store?'}
          />

          <div className="form-inline">
            <button onClick={this.handleOpen} style={{ marginTop: '10px', width: '300px' }} id="uploadbtn" type="button" className="btn-sm pbtn">Upload</button>
          </div>


        </form>
      </div>


    );
  }
}
UploadBooksPage.propTypes = {
  getbooks: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  item: PropTypes.array.isRequired,
  uploadBook: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};


export default UploadBooksPage;
