import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SideBar from '../SideBar';
import DetailsForm from './DetailsForm';
import { checkBookDetails } from '../../actions/checkBookDetails';
import { borrowBook } from '../../actions/borrowBook';
import displayBooksByCategory from '../../actions/displayBooksByCategory';

/**
 * @description it's a connected component for Bookdetails page
 * 
 * @param {object} props
 * 
 * @returns {views} containing sidebar and details form
 */
export const BookDetailsPage = props =>
  /**
   * @returns {views} with sidebar and bookDetails form
   * 
   * @memberof BookDetailsPage
   */
  (
    <div>
      <SideBar
        bookData={props.bookData}
        showbooksByCategory={props.displayBooksByCategory}
      />
      <DetailsForm
        book={props.book}
        borrowBooks={props.borrowBook}
        checkBookDetails={props.checkBookDetails}
        bookData={props.bookData}
        borrowBookItem={props.borrowBookItem}
      />
    </div>
  );
BookDetailsPage.propTypes = {
  book: PropTypes.arrayOf(PropTypes.any).isRequired,
  borrowBook: PropTypes.func.isRequired,
  checkBookDetails: PropTypes.func.isRequired,
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  borrowBookItem: PropTypes.arrayOf(PropTypes.any).isRequired,
  displayBooksByCategory: PropTypes.func.isRequired
};
/**
 * @param {object} state
 * 
 * @returns {object} of some reducer state
 */
const mapStateToProps = state => ({
  bookData: state.books[0].data,
  book: state.selectedBookDetails,
  borrowBookItem: state.borrowBooks,
});
export default connect(mapStateToProps, {
  checkBookDetails,
  displayBooksByCategory,
  borrowBook
})(BookDetailsPage);
