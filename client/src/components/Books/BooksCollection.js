import React from 'react';
// import { CardTitle, Card } from 'react-materialize';
import PropTypes from 'prop-types';

class BooksCollection extends React.Component {
  render() {
    const { data } = this.props;

    const litt = data.map(item => (<li className="collection-item avatar">
      <img src={ require(`../../../public/img/${item.image}`) } alt="" className="circle" />
      <span className="title">{item.bookTitle}</span>
      <p>{item.author}</p>
      <a href="#!" className="secondary-content"><i style={{ color: 'orange' }} className="material-icons ">grade</i></a>
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
  data: PropTypes.array.isRequired,
  heading: PropTypes.string.isRequired
};

export default BooksCollection;
