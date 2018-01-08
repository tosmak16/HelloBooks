import React from 'react';
import filterBy from 'lodash/filter';
import PropTypes from 'prop-types';
import { BorrowedbooksTableRow } from './BorrowedbooksTableRow';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import PdfReader from '../pdf/PdfReader';
import ActivityLoader from '../preloader/ActivityLoader';


/**
 * @description Displays Borrowed Books Table
 * 
 * @function BorrowedbooksTable
 * 
 * @param {object} props
 * 
 * @return {views} BorrowedBooks Tbale
 */
export const BorrowedbooksTable = (props) => {
  const { state, handleRead, unreturnedBooksData, handleClick,
    handleClose, handleExit, handleNo, handleYes, bookData } = props;
  const { bookLoaded, message, displayPreloader, errors, pdfUrl } = state;

  const tablerow = unreturnedBooksData.map(book => (
    <BorrowedbooksTableRow
      key={book.id}
      book={book}
      value={book.id}
      bookItem={filterBy(bookData, ['id', book.bookId])}
      onHandleClick={handleClick}
      onHandleRead={handleRead}
    />));

  return (
    <div id="bb_table" className="row">
      {bookLoaded && <div id="pdf_wrapper" >

        <div id="pdf_reader" >
          {bookLoaded && <PdfReader onHandleClose={handleClose} pdfUrl={pdfUrl} />}
        </div>
      </div>
      }
      <div className="  col l10 offset-l2 col m10 offset-m2 col s12">
        <h4 className="sub-header"> Current Reads</h4>
        <div className="responsive-table">
          <table id="table_bb" className="table responsive-table bordered highlight striped">
            <thead>
              <tr>
                <th><span className="glyphicon glyphicon-education" /></th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>ISBN</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tablerow}
            </tbody>
          </table>
        </div>
        <SingleActionModal
          id={'modal3'}
          heading={'Done!'}
          message={message || ''}
          onHandleExit={handleExit}
        />
        <SingleActionModal
          id={'modal2'}
          heading={'Oh!'}
          message={errors || ''}
          onHandleExit={handleExit}
        />
        <DoubleActionModal
          id={'modal1'}
          onHandleClick={handleYes}
          onHandleClose={handleNo}
          bookTitle={''}
          heading={'Do you want to return this book?'}
        />
      </div>
      <div
        style={{ display: displayPreloader.toString() }}
        id="activity-loader-id"
        className="activity"
      >
        <ActivityLoader />
      </div>
    </div>
  );
};
BorrowedbooksTable.propTypes = {
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  unreturnedBooksData: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleExit: PropTypes.func.isRequired,
  handleNo: PropTypes.func.isRequired,
  handleRead: PropTypes.func.isRequired,
  handleYes: PropTypes.func.isRequired,
  state: PropTypes.objectOf(PropTypes.any).isRequired
};
export default BorrowedbooksTable;
