import React from 'react';
import { CardTitle, Card } from 'react-materialize';

import x from '../../../public/img/l2.jpg';

class Cardbox extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div>
        <Card
          key={ item.id } value={ item.id }
          className="small"
          header={ <CardTitle key={ item.id } image={ require(`../../../public/img/${item.image}`) } /> }
          actions={ <a href="#">{item.author}</a> }
        > {item.bookTitle}</Card>
      </div>
    );
  }
}


export default Cardbox;
