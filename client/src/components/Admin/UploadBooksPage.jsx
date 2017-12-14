import React from 'react';
import PropTypes from 'prop-types';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import ActivityLoader from '../preloader/ActivityLoader';

/**
 * @function UploadBooksPage
 * @param {object} props
 * @returns {views} UploadBook form
 */
const UploadBooksPage = (props) => {
  const {
    state, handleChange, handleClick, handleClose,
    handleExit, handleFileChange, handleImageChange, handleOpen
  } = props;
  return (
    <div id="b_page" className="row">
      <form
        className="form-signin col l10 offset-l1 col m11 offset-m2 col s12"
        action=""
        encType="multipart/form-data"
      >
        <h4 className="sub-header"> Upload Book</h4>
        <div className="row">
          <div className="form-group input-field">
            <input
              type="text"
              name="bookTitle"
              className="form-control validate col l12  col m5  col s12"
              id="ubookTitle"
              placeholder="Title"
              required
              value={state.bookTitle}
              onChange={handleChange}
            />
          </div>
          <div className="form-group input-field">
            <input
              type="text"
              name="author"
              className="form-control validate col l12 col m5 offset-m1 col s12"
              id="ubookAuthor"
              placeholder="Author"
              required
              value={state.author}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group input-field">
            <input
              type="text"
              name="category"
              value={state.category}
              className="form-control validate col l5  col m5 col s12"
              id="ubookCat"
              placeholder="Category"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group input-field">
            <input
              type="text"
              name="isbn"
              className="form-control validate col l5 offset-l1 col m5 offset-m1 col s12"
              id="uISBN"
              placeholder="ISBN"
              required
              value={state.isbn}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group input-field">
          <input
            type="number"
            name="stockNumber"
            className="form-control validate"
            id="ustock"
            placeholder="Number in stock"
            required
            value={state.stockNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group input-field">
          <label htmlFor="ubookSummary" />
          <textarea
            type="textarea"
            name="summary"
            className="form-control validate"
            id="ubookSummary"
            placeholder="Summary"
            required
            value={state.summary}
            onChange={handleChange}
          />
        </div>
        <div className="file-field input-field">
          <div id="filebtn" className="btn">
            <span>File</span>

            <input
              className="fileInput"
              id="photoInput"
              onChange={handleImageChange}
              type="file"
              accept=".png, .jpg, .jpeg"
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="Upload cover" />
          </div>
        </div>
        <label htmlFor="filebtn">image format *jpg, *png</label>
        <div />
        <div className="file-field input-field">
          <div id="filebtn" className="btn">
            <span>File</span>
            <input
              className="fileInput"
              id="photoInput"
              onChange={handleFileChange}
              type="file"
              accept=".pdf"
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="Upload PDF" />
          </div>
        </div>
        <label htmlFor="filebtn">file format *pdf</label>
        <div />
        <SingleActionModal
          id={'modalError'}
          heading={'Oh!'}
          message={state.error ? state.error : state.modalErrorMessage}
          onHandleExit={handleExit}
        />
        <SingleActionModal
          id={'modalSuccess'}
          heading={'Done!'}
          message={state.message ? state.message : ''}
          onHandleExit={handleExit}
        />
        <DoubleActionModal
          id={'modalOpen'}
          onHandleClick={handleClick}
          onHandleClose={handleClose}
          bookTitle={state.bookTitle}
          heading={'Do you want to add this book to store?'}
        />
        <div className="form-inline">
          <button onClick={handleOpen} style={{ marginTop: '10px', width: '300px' }} id="uploadbtn" type="button" className="btn-sm pbtn">Upload</button>
        </div>
        <div
          style={{ display: state.displayPreloader.toString() }}
          id="activity-loader-id"
          className="activity"
        >
          <ActivityLoader />
        </div>
      </form>
    </div>
  );
};
UploadBooksPage.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleExit: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  state: PropTypes.objectOf(PropTypes.any).isRequired
};


export default UploadBooksPage;
