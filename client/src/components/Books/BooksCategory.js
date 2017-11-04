import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import BooksCollection from './BooksCollection';


let sortedData = '';
let display = null;

/**
 * 
 * 
 * @class BooksCategory
 * @extends {React.Component}
 */
class BooksCategory extends React.Component {
  /**
   * 
   * @function componentWillMount
   * @memberof BooksCategory
   */
  componentWillMount() {
    if (this.props.data[0]) { sortedData = this.props.data[0]; }
  }

  /**
   * 
   * @function componentWillReceiveProps
   * @param {any} nextProps 
   * @memberof BooksCategory
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.data[0]) { sortedData = nextProps.data[0]; }
  }
  /**
   * 
   * @function render
   * @returns 
   * @memberof BooksCategory
   */
  render() {
    if (sortedData.categoryData) {
      display = <BooksCollection checkBookDetails={ this.props.checkBookDetails } heading={ `${sortedData.category} Books` } data={ sortedData.categoryData } />;
    }
    return (
      <div className="row">
        {!lodash.isEmpty(sortedData.categoryData) ? display : <h4>{''}</h4>}
      </div>
    );
  }
}

BooksCategory.propTypes = {
  checkBookDetails: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};


export default BooksCategory;
