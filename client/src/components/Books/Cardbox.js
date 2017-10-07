import React from 'react';
import { CardTitle, Card } from 'react-materialize';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';


class Cardbox extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.checkBookDetails(e.target.name, true);
  }
  render() {
    const { item } = this.props;
    return (
      <div id="card_div">
        <Card


          key={ item.id } value={ item.id }
          className="small card_holder"
          header={ <CardTitle
            key={ item.id } id="card_box"
            image={ item.image ? item.image : '' }
          /> }
        > {<button id="wishbtn" name={ item.id } onClick={ this.handleClick } type="button" className="btn-sm btn-warning shop">Read</button>
          }</Card>
        {/* <text className="text-muted" disabled style={{ fontStyle: 'Bold', border: '10px', fontSize: '12px', }}>{item.bookTitle}</text> */}
      </div>
    );
  }
}

Cardbox.propTypes = {
  checkBookDetails: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default Cardbox;
