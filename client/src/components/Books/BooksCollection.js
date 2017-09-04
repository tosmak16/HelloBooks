import React from 'react';
// import { CardTitle, Card } from 'react-materialize';
import PropTypes from 'prop-types';

class BooksCollection extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
  }
  render() {
    const { data } = this.props;

    const litt = data.map(item => (<li key={ item.id } className="collection-item avatar">
      <img
        key={ item.id } name={ item.id } onClick={ this.handleClick } src={ require(`../../../public/img/${item.image}`) }
        alt="" className="circle"
      />
      <span className="title">{item.bookTitle}</span>
      <p>{item.author}</p>
      <button id="wishbtn" name={ item.id } onClick={ this.handleClick } type="button" className="btn-sm btn-warning shop">Check details</button>
      <a href="#!" className="secondary-content"><i key={ item.id } style={{ color: 'orange' }} className="material-icons ">grade</i></a>
    </li>));

    return (
      <div className="col m10 offset-m2 col l10 offset-l2 col s12 main">
        <h4 className="page-header">{this.props.heading}</h4>
        <hr />
        <div className=" row ">
          <div className="">
            <ul className="collection ">
              {litt}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

BooksCollection.propTypes = {


};

export default BooksCollection;