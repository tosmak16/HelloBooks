import React from 'react';
import PropTypes from 'prop-types';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import ActivityLoader from '../preloader/ActivityLoader';

/**
 * @function ChangePasswordForm
 * @param {object} props
 * @returns {views} changepassword form
 */
export const ChangePasswordForm = (props) => {
  const { state, handleInputChange, handleExit, handleClick, handleClose, handleSave } = props;
  const { error, oldPassword, newPassword, confirmPassword,
    displayPreloader, errors, message, disabled } = state;
  return (
    <div id="ch_pas">
      <form className="form-signin col col l10 offset-l1 col m11 offset-m2 col s12" action="">
        <h4 className="sub-header form-signin-heading">Change password</h4>
        {error && <p style={{ color: 'red' }} className="help-block">*{error}*</p>}
        <div className="input-field">
          <label htmlFor="oldPassword" className="sr-only">Current Password</label>
          <input
            type="password"
            id="oldPassword"
            className="form-control validate"
            placeholder="Current password"
            required
            value={oldPassword}
            name="oldPassword"
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
        <div className="input-field">
          <label htmlFor="newPassword" className="sr-only">New password</label>
          <input
            type="password"
            id="newPassword"
            className="form-control validate"
            placeholder="New password"
            required
            value={newPassword}
            name="newPassword"
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
        <div className="input-field">
          <label htmlFor="confirmPassword" className="sr-only">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control validate"
            placeholder="Confirm password"
            required
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
        <SingleActionModal
          id={'modalError'}
          heading={'Oh!'}
          message={errors || ''}
          onHandleExit={handleExit}
        />
        <SingleActionModal
          id={'modalSuccess'}
          heading={'Done!'}
          message={message || ''}
          onHandleExit={handleExit}
        />
        <DoubleActionModal
          id={'modalOpen'}
          onHandleClick={handleClick}
          onHandleClose={handleClose}
          bookTitle={''}
          heading={'Do you want to change your password?'}
        />
        <div className="input-field inline">
          <button
            id="editbtn"
            type="button"
            onClick={handleSave}
            className="btn btn-primary pbtn"
          >Submit</button>
        </div>
        <div
          style={{ display: displayPreloader.toString() }}
          id="activity-loader-id"
          className="activity"
        >
          <ActivityLoader />
        </div>
      </form>
    </div>
  );
};
ChangePasswordForm.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleExit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  state: PropTypes.objectOf(PropTypes.any).isRequired
};
export default ChangePasswordForm;
