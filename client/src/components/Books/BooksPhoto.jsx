import React from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';


import Cardbox from './Cardbox';


/**
 * @class BooksPhoto
 * @extends {React.PureComponent}
 */
class BooksPhoto extends React.PureComponent {
  /**
   * @returns {views} with card containing books image and details
   * @memberof BooksPhoto
   */
  render() {
    const { bookData, checkBookDetails } = this.props;
    const sortedData = lodash.orderBy(bookData, 'createdAt', 'desc');

    const filteredData = [];
    let i = 0;
    sortedData.forEach((element) => {
      if (i < 8) { filteredData.push(element); }
      i += 1;
    }, this);
    const cardbox = filteredData.map(item =>
      (<div key={item.id} className="col m5 col l3 col s6">
        <Cardbox checkBookDetails={checkBookDetails} item={item} /> </div>));
    return (
      <div className="col m10 offset-m2 col l10 offset-l2 col s12 main">
        <h4 className="page-header">Latest Books</h4>
        <hr />
        <div className="row">
          {cardbox}
        </div>
      </div>
    );
  }
}

BooksPhoto.propTypes = {
  checkBookDetails: PropTypes.func.isRequired,
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
};


export default BooksPhoto;
