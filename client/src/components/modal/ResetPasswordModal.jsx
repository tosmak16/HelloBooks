import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function ResetPasswordModal
 * @param {object} props
 * @returns {view} modal
 */
export const ResetPasswordModal = (props) => {
  const { handleInputEmailChange, handleClose, handleSendMail, userEmailText } = props;
  return (
    <div id="modalPassword" className="modal">
      <button
        id="modal-cancel"
        onClick={handleClose}
        className="material-icons brown-text"
      >
        cancel
      </button>
      <div id="modalPasswordHeader">
        <h5 style={{ color: 'indianred' }} >Forgotten your password?</h5>
      </div>
      <div className="modal-content">
        <p>We will send you a password reset mail  to use for login.
         Enter your login email address below
        </p>
        <div className="input-field ">
          <label htmlFor="firstname" className="sr-only">First Name</label>
          <i style={{ top: '20px' }} className="material-icons brown-text prefix">contact_mail</i>
          <input
            id="firstname"
            onChange={handleInputEmailChange}
            className="form-control validate"
            required
            value={userEmailText}
            type="email"
            name="email"
          />
          <div>
            <button
              onClick={handleSendMail}
              id="modalButton"
              className="waves-effect waves-brown material-icons"
            >
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
ResetPasswordModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleInputEmailChange: PropTypes.func.isRequired,
  handleSendMail: PropTypes.func.isRequired,
  userEmailText: PropTypes.string.isRequired
};
export default ResetPasswordModal;
