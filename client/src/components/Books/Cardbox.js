import React from 'react';
import { CardTitle, Card } from 'react-materialize';

import x from '../../../public/img/l2.jpg';

class Cardbox extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div id="card_div">
        <Card

          key={ item.id } value={ item.id }

          className="small card_holder"
          header={ <CardTitle key={ item.id } id="card_box" image={ require(`../../../public/img/${item.image}`) } /> }
          actions={ <a style={{ fontSize: '10px' }} href="#">{item.author}</a> }
        > {<a style={{ fontSize: '10px', color: 'black', fontStyle: 'bold' }} href="#">{item.bookTitle}</a>}</Card>
      </div>
    );
  }
}


export default Cardbox;
