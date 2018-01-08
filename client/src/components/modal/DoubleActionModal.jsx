import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
/**
 * @description This modal is used for user feedback when no or yes response is required
 * 
 * @param {object} props
 * 
 * @returns {views} modal
 */
const DoubleActionModal = props => (
  <div id={props.id} className="modal">
    <div className="modal-content">
      <h5>{props.heading}</h5>
      <p>{props.bookTitle}</p>
    </div>
    <div className="modal-footer">
      <Link
        href=""
        onClick={props.onHandleClose}
        className="double-button-no modal-action modal-close waves-effect waves-brown btn-flat"
      >NO</Link>
      <Link
        href=""
        onClick={props.onHandleClick}
        type="submit"
        className="double-button-yes modal-action modal-close waves-effect waves-brown btn-flat"
      >YES</Link>
    </div>
  </div>
);
DoubleActionModal.propTypes = {
  bookTitle: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onHandleClick: PropTypes.func.isRequired,
  onHandleClose: PropTypes.func.isRequired,
};
export default DoubleActionModal;
