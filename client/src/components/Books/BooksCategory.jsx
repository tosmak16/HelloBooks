import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import BooksCollection from './BooksCollection';

let sortedData = '';
let booksCollection = null;

/**
 * @class BooksCategory
 * @extends {React.Component}
 */
class BooksCategory extends React.Component {
  /**
   * @function componentWillMount
   * @memberof BooksCategory
   * @returns {void}
   */
  componentWillMount() {
    if (this.props.categoryData[0]) { sortedData = this.props.categoryData[0]; }
  }

  /**
   *
   * @function componentWillReceiveProps
   * @param {object} nextProps
   * @memberof BooksCategory
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.categoryData[0]) { sortedData = nextProps.categoryData[0]; }
  }
  /**
   * @function render
   * @returns {view} containing book data selected by category
   * @memberof BooksCategory
   */
  render() {
    if (sortedData.categoryData) {
      booksCollection = <BooksCollection checkBookDetails={this.props.checkBookDetails} heading={`${sortedData.category} Books`} bookData={sortedData.categoryData} />;
    }
    return (
      <div className="row">
        {!lodash.isEmpty(sortedData.categoryData) ? booksCollection : <h4>{''}</h4>}
      </div>
    );
  }
}

BooksCategory.propTypes = {
  checkBookDetails: PropTypes.func.isRequired,
  categoryData: PropTypes.arrayOf(PropTypes.any).isRequired,
};


export default BooksCategory;
