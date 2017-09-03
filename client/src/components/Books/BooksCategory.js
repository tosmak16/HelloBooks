import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BooksCollection from './BooksCollection';

class BooksCategory extends React.Component {
  render() {
    return (
      <div className="row">
        {<BooksCollection heading={ 'Top interest' } data={ this.props.data } />}
      </div>
    );
  }
}
BooksCategory.propTypes = {

};

export default connect(null, null)(BooksCategory);
