import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';

import Table from './Table';

class BooksList extends React.Component {
  render() {
    const { products } = this.props;
    // const a = products;


    // const x = orderBy(a, 'createdAt', 'desc');
    // const y = [];
    // let i = 0;
    // x.forEach((element) => {
    //   if (i < 4) { y.push(element); }
    //   i++;
    // }, this);

    // console.log(y);

    return (
      <div>
        <div className="row">
          <div className=" col l9 offset-l2 col m9  offset-m2  col s9 offset-s2">
            <h4 className="sub-header">Available books</h4>
            <div className="responsive-table" />
            <Table products={ products } />
          </div>
        </div>
      </div >
    );
  }
}

BooksList.propTypes = {
  products: PropTypes.array.isRequired
};

export default BooksList;
