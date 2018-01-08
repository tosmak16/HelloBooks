import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function Cardbox
 * 
 * @return {views} books
 * 
 * @param {object} props
 */
const Cardbox = (props) => {
  const { item, checkBookDetails } = props;
  /**
   * @function handleClick
   * @param {object} event
   * @memberof Cardbox
   * @returns {void}
   */
  const handleClick = (event) => {
    checkBookDetails(event.target.name, true);
  };
  return (
    <div id="card_div">
      <div id="img_holder" className="container">
        <img id="book_img" src={item.image} alt="Avatar" className="image" style={{ width: '150px', height: '200px' }} />
        <div className="middle">
          <label htmlFor="book_img" style={{ fontSize: '12px', fontStyle: 'bold' }} className="text"> {item.bookTitle}</label>
          <button style={{ width: '120px', backgroundColor: 'transparent' }} type="btn-sm" name={item.id} onClick={handleClick} className="text">Read</button>
        </div>
      </div>
    </div>
  );
};
Cardbox.propTypes = {
  checkBookDetails: PropTypes.func.isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Cardbox;
