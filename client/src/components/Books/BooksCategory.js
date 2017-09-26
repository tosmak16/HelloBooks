import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash';

import BooksCollection from './BooksCollection';


let sortedData = '';
let display = null;
class BooksCategory extends React.Component {
  render() {
    sortedData = this.props.data[0];
    if (lodash.isObject(sortedData)) {
      display = <BooksCollection heading={ `${sortedData.category} Books` } data={ sortedData.categoryData } />;
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
