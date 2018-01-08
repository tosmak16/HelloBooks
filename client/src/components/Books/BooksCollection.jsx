import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function BooksCollection
 * 
 * @param {object} props
 * 
 * @returns {views} BookCollection
 */
const BooksCollection = (props) => {
  /**
   * @memberof BooksCollection
   * 
   * @returns {views} with collection of searched books
   */
  const { bookData, heading, checkBookDetails } = props;
  const bookCollectionRow = bookData.map(item => (<li key={item.id} className="collection-item avatar">
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
      onClick={checkBookDetails}
      type="button"
      className="btn-sm btn-warning shop"
    >Check details</button>
    <a href="#!" className="secondary-content"><i key={item.id} style={{ color: 'orange' }} className="material-icons ">grade</i></a>
  </li>));
  return (
    <div className="col m10 offset-m2 col l10 offset-l2 col s12 main">
      <h4 className="page-header">{heading}</h4>
      <hr />
      <div className=" row ">
        <div className="">
          <ul className="collection ">
            {bookCollectionRow}
          </ul>
        </div>
      </div>
    </div>
  );
};
BooksCollection.propTypes = {
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  checkBookDetails: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired
};
export default BooksCollection;
