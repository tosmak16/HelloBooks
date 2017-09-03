import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash';

import BooksCollection from './BooksCollection';

class BooksCategory extends React.Component {
  render() {
    const display = <BooksCollection heading={ `${this.props.category} Books` } data={ this.props.data } />;
    return (
      <div className="row">
        {!lodash.isEmpty(this.props.data) ? display : <h4>{''}</h4>}

      </div>
    );
  }
}
BooksCategory.propTypes = {

};

function mapStateToProps(state) {
  return {
    data: state.getFilteredBooks.categoryData,
    category: state.getFilteredBooks.category
  };
}

export default connect(mapStateToProps, null)(BooksCategory);
