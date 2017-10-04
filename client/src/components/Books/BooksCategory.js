import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import BooksCollection from './BooksCollection';


let sortedData = '';
let display = null;
class BooksCategory extends React.Component {
  componentWillMount() {
    if (this.props.data[0]) { sortedData = this.props.data[0]; }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data[0]) { sortedData = nextProps.data[0]; }
  }
  render() {
    if (sortedData.categoryData) {
      display = <BooksCollection heading={ `${sortedData.category} Books` } data={ sortedData.categoryData } />;
    }
    return (
      <div className="row">
        {!lodash.isEmpty(sortedData.categoryData) ? display : <h4>{''}</h4>}

      </div>
    );
  }
}
BooksCategory.propTypes = {
  data: PropTypes.array.isRequired,
};


export default BooksCategory;
