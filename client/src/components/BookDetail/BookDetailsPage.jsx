import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SideBar from '../SideBar';
import DetailsForm from './DetailsForm';
import checkBookDetails from '../../actions/checkBookDetails';
import borrowBooks from '../../actions/borrowBooks';
import showbooksByCategory from '../../actions/showbooksByCategory';

/**
 * @param {object} props
 * @returns {views} containing sidebar and details form
 */
export function BookDetailsPage(props) {
  /**
   * @returns {views} with sidebar and bookDetails form
   * @memberof BookDetailsPage
   */
  return (
    <div>
      <SideBar
        bookData={props.bookData}
        showbooksByCategory={props.showbooksByCategory}
      />

      <DetailsForm
        book={props.book}
        borrowBooks={props.borrowBooks}
        checkBookDetails={props.checkBookDetails}
        bookData={props.bookData}
        borrowBookItem={props.borrowBookItem}

      />
    </div>
  );
}


BookDetailsPage.propTypes = {
  book: PropTypes.arrayOf(PropTypes.any).isRequired,
  borrowBooks: PropTypes.func.isRequired,
  checkBookDetails: PropTypes.func.isRequired,
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  borrowBookItem: PropTypes.arrayOf(PropTypes.any).isRequired,
  showbooksByCategory: PropTypes.func.isRequired
};

/**
 * @param {object} state
 * @returns {object} of some reducer state
 */
function mapStateToProps(state) {
  return {
    bookData: state.books[0].data,
    book: state.selectedbook,
    borrowBookItem: state.borrowBooks,
  };
}

export default connect(mapStateToProps, {
  checkBookDetails,
  showbooksByCategory,
  borrowBooks
})(BookDetailsPage);
