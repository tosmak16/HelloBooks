import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description This modal is used for user's feedback when a single response is required
 * 
 * @function SingleActionModal
 * 
 * @param {object} props
 * 
 * @returns {view} modal
 */
const SingleActionModal = props => (
  <div id={props.id} className="modal">
    <div className="modal-content">
      <h5>{props.heading}</h5>
      <p className="response-message-holder">{props.message}</p>
    </div>
    <div className="modal-footer">
      <a
        href=""
        onClick={props.onHandleExit}
        className="modal-action modal-close waves-effect waves-brown btn-flat"
      >Close</a>
    </div>
  </div>
);
SingleActionModal.propTypes = {
  heading: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onHandleExit: PropTypes.func.isRequired,
};
export default SingleActionModal;
