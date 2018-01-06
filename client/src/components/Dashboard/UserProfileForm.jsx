import React from 'react';
import PropTypes from 'prop-types';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import ActivityLoader from '../preloader/ActivityLoader';

/**
 * @function UserProfileForm
 * @param {object} props
 * @returns {views} UserProfileForm
 */
export const UserProfileForm = (props) => {
  const { state, handleEdit, handleInputChange, handleExit, handleClick, handleClose } = props;
  const { firstName, membershipType, message, displayPreloader, disabled, lastName, email,
    buttonText, mobileNumber, modalErrorMessage, error } = state;
  return (
    <div id="b_page" className="row">
      <form className="form-signin col col l10 offset-l1 col m11 offset-m2 col s12" action="">
        <h4 className="sub-header form-signin-heading"> Personal Info</h4>
        <div className="input-field">
          <label htmlFor="firstname" className="sr-only">First Name</label>
          <input
            type="text"
            id="firstname"
            className="form-control validate"
            placeholder="First Name"
            required
            value={firstName}
            name="firstName"
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
        <div className="input-field">
          <label htmlFor="lastname" className="sr-only">Last Name</label>
          <input
            type="text"
            id="lastname"
            className="form-control validate"
            placeholder="Last Name"
            required
            value={lastName}
            name="lastName"
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
        <div className="input-field">
          <label htmlFor="inputSignUpEmail" className="sr-only">Email address</label>
          <input
            type="email"
            id="inputSignUpEmail"
            className="form-control validate"
            placeholder="Email address"
            required

            value={email}
            name="email"
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="inputPhoneNumber">Phone number</label>
          <input
            type="number"
            id="inputPhoneNumber"
            className="form-control validate"
            placeholder="phone number"
            required
            value={mobileNumber}
            name="mobileNumber"
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>

        <select
          name="membershipType"
          className="browser-default"
          onChange={handleInputChange}
          disabled={disabled}
        >
          <option defaultValue={membershipType} >{membershipType}</option>
          <option value="Basic">Basic</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
        </select>
        <div className="form-group">
          <button
            id="editbtn"
            type="button"
            onClick={handleEdit}
            className="btn btn-primary pbtn"
          >{buttonText}</button>
        </div>

        <SingleActionModal
          id={'modalE'}
          heading={'Oh!'}
          message={error || modalErrorMessage}
          onHandleExit={handleExit}
        />
        <SingleActionModal
          id={'modalS'}
          heading={'Done!'}
          message={message || ''}
          onHandleExit={handleExit}
        />
        <DoubleActionModal
          id={'modalO'}
          onHandleClick={handleClick}
          onHandleClose={handleClose}
          bookTitle={''}
          heading={'Do you want to update your details?'}
        />


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

UserProfileForm.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleExit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  state: PropTypes.objectOf(PropTypes.any).isRequired
};


export default UserProfileForm;
