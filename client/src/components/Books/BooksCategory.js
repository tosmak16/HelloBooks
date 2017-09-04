import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash';

import BooksCollection from './BooksCollection';

let i = 0;
let sortedData = '';
let display = null;
class BooksCategory extends React.Component {
  render() {
    sortedData = this.props.data[i];
    console.log(i);

    if (lodash.isObject(sortedData)) {
      display = <BooksCollection heading={ `${sortedData.category} Books` } data={ sortedData.categoryData } />;
      i += 1;
    }
    return (
      <div className="row">
        {!lodash.isEmpty(sortedData) ? display : <h4>{''}</h4>}

      </div>
    );
  }
}
BooksCategory.propTypes = {

};


export default BooksCategory;
