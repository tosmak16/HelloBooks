import React from 'react';
import lodash from 'lodash';


import Cardbox from './Cardbox';

class BooksPhoto extends React.Component {
  render() {
    const { data } = this.props;
    const sortedData = lodash.orderBy(data, 'createdAt', 'desc');

    const filteredData = [];
    let i = 0;
    sortedData.forEach((element) => {
      if (i < 4) { filteredData.push(element); }
      i++;
    }, this);
    const cardbox = filteredData.map(item => <div key={ item.id } className="col m5 col l3 col s6"> <Cardbox key={ item.id } item={ item } /> </div>);
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


export default BooksPhoto;
