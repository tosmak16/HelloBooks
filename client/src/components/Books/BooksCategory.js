import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash';

import BooksCollection from './BooksCollection';

let i = -2;
let sortedData = '';
let display = null;
class BooksCategory extends React.Component {
  render() {
    i++;
    sortedData = this.props.data[i];

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

function mapStateToProps(state) {
  return {
    data: state.category,

  };
}

export default connect(mapStateToProps, null)(BooksCategory);
