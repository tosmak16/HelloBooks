import React from 'react';
import PropTypes from 'prop-types';


/**
 * 
 * 
 * @class Cardbox
 * @extends {React.Component}
 */
class Cardbox extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  /**
   * 
   * @function handleClick
   * @param {any} e 
   * @memberof Cardbox
   */
  handleClick(e) {
    this.props.checkBookDetails(e.target.name, true);
  }

  /**
   * 
   *@function render
   * @returns 
   * @memberof Cardbox
   */
  render() {
    const { item } = this.props;
    return (
      <div id="card_div">
        <div id="img_holder" className="container">
          <img id="book_img" src={ item.image } alt="Avatar" className="image" style={{ width: '150px', height: '200px' }} />
          <div className="middle">
            <label htmlFor="book_img" style={{ fontSize: '12px', fontStyle: 'bold' }} className="text"> {item.bookTitle}</label>


            <button style={{ width: '120px', backgroundColor: 'transparent' }} type="btn-sm" name={ item.id } onClick={ this.handleClick } className="text">Read</button>

          </div>
          {/* <text className="text-muted" disabled style={{ fontStyle: 'Bold', border: '10px', fontSize: '12px', }}>{item.bookTitle}</text> */}
        </div>
      </div>
    );
  }
}


Cardbox.propTypes = {
  checkBookDetails: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default Cardbox;
