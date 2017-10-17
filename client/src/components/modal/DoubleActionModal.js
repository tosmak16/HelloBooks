import React from 'react';
import PropTypes from 'prop-types';

/**
 * 
 * 
 * @class DoubleActionModal
 * @extends {React.Component}
 */
class DoubleActionModal extends React.Component {
  /**
   * 
   * 
   * @returns 
   * @memberof DoubleActionModal
   */
  render() {
    return (
      <div id={ this.props.id } className="modal">
        <div className="modal-content">
          <h5>{this.props.heading}</h5>
          <p>{this.props.bookTitle}</p>
        </div>
        <div className="modal-footer">
          <a
            href="" onClick={ this.props.onHandleClose }
            className="modal-action modal-close waves-effect waves-brown btn-flat"
          >NO</a>
          <a
            href="" onClick={ this.props.onHandleClick }
            type="submit" className="modal-action modal-close waves-effect waves-brown btn-flat"
          >YES</a>
        </div>
      </div>
    );
  }
}

DoubleActionModal.propTypes = {
  bookTitle: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onHandleClick: PropTypes.func.isRequired,
  onHandleClose: PropTypes.func.isRequired,


};

export default DoubleActionModal;
