import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class BooksCollection
 * @extends {React.Component}
 */
class BooksCollection extends React.Component {
  /**
   * Creates and initializes instanceof BooksCollection.
   * @param {object} props
   * @memberof BooksCollection
   */
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * @param {object} event
   * @param {boolean} [set=true]
   * @memberof BooksCollection
   * @returns {void}
   */
  handleClick(event) {
    this.props.checkBookDetails(event.target.name, true);
  }
  /**
   * @returns
   * @memberof BooksCollection
   * @returns {views} with collection of searched books
   */
  render() {
    const { bookData } = this.props;

    const litt = bookData.map(item => (<li key={item.id} className="collection-item avatar">
      <img
        key={item.id}
        name={item.id}
        src={item.image ? item.image : ''}
        alt=""
        className="circle"
      />
      <span className="title">{item.bookTitle}</span>
      <p>{item.author}</p>
      <button
        id="wishbtn"
        name={item.id}
        onClick={this.handleClick}
        type="button"
        className="btn-sm btn-warning shop"
      >Check details</button>
      <a href="#!" className="secondary-content"><i key={item.id} style={{ color: 'orange' }} className="material-icons ">grade</i></a>
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
  checkBookDetails: PropTypes.func.isRequired,
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  heading: PropTypes.string.isRequired,
};

export default BooksCollection;
