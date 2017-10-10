import React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';

import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';


let sortedData = '';


class ChangePasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      error: '',
      display: false,
      errors: '',
      message: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  componentWillMount() {
    $(document).ready(() => {
      $('.modal').modal();
    });
  }


  componentWillReceiveProps(nextProps) {
    sortedData = nextProps.item[0];
    if (this.state.display) {
      if (!isEmpty(sortedData.error) && this.state.display) {
        $('#modalError').modal('open');
        this.setState({
          display: false,
          errors: sortedData.error,
        });
      } else if (!isEmpty(sortedData.data) && this.state.display) {
        this.setState({
          display: false,
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          message: sortedData.data,
        });
        $('#modalSuccess').modal('open');
      }
    }
  }

  handleClose(e) {
    e.preventDefault();
    $('#modalOpen').modal('close');
  }

  handleExit(e) {
    e.preventDefault();

    $('#modalError').modal('close');
    $('#modalSuccess').modal('close');
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      display: true,
    });
    $('#modalOpen').modal('close');

    this.props.changePassword(this.state, localStorage.jwtToken);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSave(e) {
    e.preventDefault();
    if (!this.state.newPassword || !this.state.oldPassword || !this.state.confirmPassword) {
      this.setState({
        error: 'Please enter the required fields',
      });
    } else if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({
        error: 'new password and confirm password does not match',
      });
    } else if (this.state.newPassword.length < 6) {
      this.setState({
        error: 'password length must be more than 5',
      });
    } else {
      this.setState({
        error: '',
      });

      $('#modalOpen').modal('open');
    }
  }
  render() {
    return (
      <div id="ch_pas">
        <form className="form-signin col col l10 offset-l1 col m11 offset-m2 col s12" action="">
          <h4 className="sub-header form-signin-heading">Change password</h4>
          {this.state.error && <p style={{ color: 'red' }} className="help-block">*{this.state.error}*</p>}
          <div className="input-field">
            <label htmlFor="oldPassword" className="sr-only">Current Password</label>
            <input
              type="password" id="oldPassword" className="form-control validate" placeholder="Current password" required
              autoFocus value={ this.state.oldPassword } name="oldPassword" onChange={ this.handleInputChange }
              disabled={ this.state.disabled }
            />
          </div>
          <div className="input-field">
            <label htmlFor="newPassword" className="sr-only">New password</label>
            <input
              type="password" id="newPassword" className="form-control validate" placeholder="New password" required
              autoFocus value={ this.state.newPassword } name="newPassword" onChange={ this.handleInputChange }
              disabled={ this.state.disabled }
            />
          </div>

          <div className="input-field">
            <label htmlFor="confirmPassword" className="sr-only">Confirm password</label>
            <input
              type="password" id="confirmPassword" className="form-control validate" placeholder="Confirm password" required
              autoFocus value={ this.state.confirmPassword } name="confirmPassword" onChange={ this.handleInputChange }
              disabled={ this.state.disabled }
            />
          </div>
          <SingleActionModal
            id={ 'modalError' } heading={ 'Oh!' }
            message={ this.state.errors ? this.state.errors : '' }
            onHandleExit={ this.handleExit }
          />
          <SingleActionModal
            id={ 'modalSuccess' } heading={ 'Done!' }
            message={ this.state.message ? this.state.message : '' }
            onHandleExit={ this.handleExit }
          />
          <DoubleActionModal
            id={ 'modalOpen' }
            onHandleClick={ this.handleClick }
            onHandleClose={ this.handleClose }
            bookTitle={ '' }
            heading={ 'Do you want to change your password?' }
          />
          <div className="input-field inline">
            <button id="editbtn" type="button" onClick={ this.handleSave } className="btn btn-primary pbtn">Submit</button>
          </div>

        </form>
      </div>
    );
  }
}

ChangePasswordPage.propTypes = {
  changePassword: PropTypes.func.isRequired,
  item: PropTypes.array.isRequired,

};


export default ChangePasswordPage;
