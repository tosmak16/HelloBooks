import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SideBar from '../SideBar';
import DetailsForm from './DetailsForm';

import checkBookDetails from '../../actions/checkBookDetails';
import borrowBooks from '../../actions/borrowBooks';
import showbooksByCategory from '../../actions/showbooksByCategory';

/**
 * 
 * 
 * @export
 * @class BookDetailsPage
 * @extends {React.Component}
 */
export class BookDetailsPage extends React.Component {
  /**
   * 
   * 
   * @returns 
   * @memberof BookDetailsPage
   */
  render() {
    return (
      <div>
        <SideBar data={ this.props.data } showbooksByCategory={ this.props.showbooksByCategory } />

        <DetailsForm
          book={ this.props.book }
          borrowBooks={ this.props.borrowBooks }
          checkBookDetails={ this.props.checkBookDetails }
          data={ this.props.data }
          item={ this.props.item }

        />
      </div>
    );
  }
}

BookDetailsPage.propTypes = {
  book: PropTypes.array.isRequired,
  borrowBooks: PropTypes.func.isRequired,
  checkBookDetails: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  item: PropTypes.array.isRequired,
  showbooksByCategory: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    data: state.books[0].data,
    book: state.selectedbook,
    item: state.borrowBooks,

  };
}

export default connect(mapStateToProps, {
  checkBookDetails,
  showbooksByCategory,
  borrowBooks
})(BookDetailsPage);
