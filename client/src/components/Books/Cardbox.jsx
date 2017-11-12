import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class Cardbox
 * @extends {React.Component}
 */
class Cardbox extends React.Component {
  /**
   * Creates an instance of Cardbox.
   * @param {object} props
   * @memberof Cardbox
   */
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  /**
   * @function handleClick
   * @param {object} event
   * @memberof Cardbox
   * @returns {void}
   */
  handleClick(event) {
    this.props.checkBookDetails(event.target.name, true);
  }

  /**
   *
   *@function render
   * @returns {views} containing image cardbox
   * @memberof Cardbox
   */
  render() {
    const { item } = this.props;
    return (
      <div id="card_div">
        <div id="img_holder" className="container">
          <img id="book_img" src={item.image} alt="Avatar" className="image" style={{ width: '150px', height: '200px' }} />
          <div className="middle">
            <label htmlFor="book_img" style={{ fontSize: '12px', fontStyle: 'bold' }} className="text"> {item.bookTitle}</label>
            <button style={{ width: '120px', backgroundColor: 'transparent' }} type="btn-sm" name={item.id} onClick={this.handleClick} className="text">Read</button>
          </div>
        </div>
      </div>
    );
  }
}

Cardbox.propTypes = {
  checkBookDetails: PropTypes.func.isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Cardbox;
