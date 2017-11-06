import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {object} props
 * @returns {views} modal
 */
function DoubleActionModal(props) {
  return (
    <div id={props.id} className="modal">
      <div className="modal-content">
        <h5>{props.heading}</h5>
        <p>{props.bookTitle}</p>
      </div>
      <div className="modal-footer">
        <a
          href=""
          onClick={props.onHandleClose}
          className="modal-action modal-close waves-effect waves-brown btn-flat"
        >NO</a>
        <a
          href=""
          onClick={props.onHandleClick}
          type="submit"
          className="modal-action modal-close waves-effect waves-brown btn-flat"
        >YES</a>
      </div>
    </div>
  );
}
DoubleActionModal.propTypes = {
  bookTitle: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onHandleClick: PropTypes.func.isRequired,
  onHandleClose: PropTypes.func.isRequired,
};

export default DoubleActionModal;
