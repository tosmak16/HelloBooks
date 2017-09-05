import React from 'react';
import { CardTitle, Card } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import checkBookDetails from '../../actions/checkBookDetails';

class Cardbox extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.checkBookDetails(e.target.name);
    // localStorage.setItem('bookId', e.target.name);
    browserHistory.push('/details');
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
            image={ require(`../../../public/img/${item.image}`) }
          /> }
          actions={ <a style={{ fontSize: '10px' }} href="#">{item.author}</a> }
        > {<button id="wishbtn" name={ item.id } onClick={ this.handleClick } type="button" className="btn-sm btn-warning shop">Read</button>
          }</Card>
        {/* <text className="text-muted" disabled style={{ fontStyle: 'Bold', border: '10px', fontSize: '12px', }}>{item.bookTitle}</text> */}
      </div>
    );
  }
}

Cardbox.propTypes = {
  checkBookDetails: PropTypes.func.isRequired
};

export default connect(null, { checkBookDetails })(Cardbox);
