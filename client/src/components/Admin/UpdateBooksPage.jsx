import React from 'react';
import PropTypes from 'prop-types';
import CategorySelect from '../select/CategorySelect';
import SearchBar from '../SearchBar';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import ActivityLoader from '../preloader/ActivityLoader';

/**
 * @class UpdateBooksPage
 * @returns {views} Upload books form
 * @param {object} props
 */
const UpdateBooksPage = (props) => {
  const { state, handleChange, handleClick, handleClose, handleExit,
    handleFileChange, handleImageChange, handleInputChange,
    handleOpen, handleSelected } = props;
  return (
    <div id="bh_table" className="row">
      <form
        className="form-signin col l11 offset-l1 col m11 offset-m2 col s12"
        action=""
        encType="multipart/form-data"
      >
        <div className="">
          <div className="">
            <CategorySelect
              onHandleSelected={handleSelected}
              value={state.filterBy}
            />
          </div>
          <div className="">
            <SearchBar
              onChange={handleChange}
              name="searchText"
              value={state.searchText}
            />
          </div>
        </div >
        <h4 className="sub-header"> Edit book</h4>
        <div className="form-group input-field">
          <label htmlFor="ebookTitle">Title</label>
          <input
            disabled={!state.isDisabled}
            name="bookTitle"
            type="text"
            value={state.bookTitle}
            className="form-control validate"
            id="ebookTitle"
            placeholder="Book Title"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-field">
          <label htmlFor="ebookAuthor">Author</label>
          <input
            name="author"
            disabled={!state.isDisabled}
            type="text"
            value={state.author}
            className="form-control validate"
            id="ebookAuthor"
            placeholder="Author"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-field">
          <label htmlFor="ebookCat">Category</label>
          <input
            name="category"
            disabled={!state.isDisabled}
            type="text"
            value={state.category}
            className="form-control validate"
            id="ebookCat"
            placeholder="Category"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-field">
          <label htmlFor="eISBN">ISBN</label>
          <input
            name="isbn"
            disabled
            type="text"
            value={state.isbn}
            className="form-control validate"
            id="eISBN"
            placeholder="ISBN"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-field">
          <label htmlFor="estock">Number in stock</label>
          <input
            name="stockNumber"
            disabled={!state.isDisabled}
            type="number"
            value={state.stockNumber}
            className="form-control validate"
            id="estock"
            placeholder="Number in stock"
            required
            onChange={handleInputChange}
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
            disabled={!state.isDisabled}
            value={state.summary}
            onChange={handleInputChange}
          />
        </div>
        <div className="file-field input-field">
          <div id="filebtn" className="btn">
            <span>File</span>
            <input
              disabled={!state.isDisabled}
              className="fileInput"
              type="file"
              id="photoInput"
              onChange={handleImageChange}
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
              disabled={!state.isDisabled}
              className="fileInput"
              type="file"
              id="photoInput"
              onChange={handleFileChange}
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
          message={state.errors ? state.errors : state.modalErrorMessage}
          onHandleExit={handleExit}
        />
        <SingleActionModal
          id={'modalS'}
          heading={'Done!'}
          message={state.message ? state.message : ''}
          onHandleExit={handleExit}
        />
        <DoubleActionModal
          id={'modalO'}
          onHandleClick={handleClick}
          onHandleClose={handleClose}
          bookTitle={state.bookTitle}
          heading={'Do you want to Update this book?'}
        />
        <div className="form-inline">
          <button
            disabled={!state.isDisabled}
            onClick={handleOpen}
            style={{ marginTop: '10px', width: '300px' }}
            id="updatebtn"
            type="button"
            className="btn-sm pbtn"
          >Update</button>
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
UpdateBooksPage.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleExit: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleSelected: PropTypes.func.isRequired,
  state: PropTypes.objectOf(PropTypes.any).isRequired
};


export default UpdateBooksPage;

