import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import $ from 'jquery';


import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';


let sortedData = '';
let pointer = false;

/**
 * 
 * 
 * @class Userprofile
 * @extends {React.Component}
 */
class Userprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      profileImage: '',
      membershipType: 'Basic',
      show: true,
      disabled: true,
      buttonText: 'Edit',
      display: false,
      error: '',
      message: '',
      image: '',
      summary: '',
      imageHeight: 0,
      imageWidth: 0,
      imageSize: 0,
      file: '',
      imagePreviewUrl: '',
      modalErrorMessage: '',
      imageloaded: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }
  componentWillMount() {
    $(document).ready(() => {
      $('.modal').modal();
    });
  }

  /**
   * 
   * @function componentWillReceiveProps
   * @param {any} nextProps 
   * @memberof Userprofile
   */
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.data) && this.state.show) {
      this.setState({
        firstName: nextProps.data[0].firstName,
        lastName: nextProps.data[0].lastName,
        email: nextProps.data[0].email,
        mobileNumber: nextProps.data[0].mobileNumber ? nextProps.data[0].mobileNumber : 0,
        membershipType: nextProps.data[0].membershipType,
        profileImage: nextProps.data[0].profileImage,
        show: false,

      });
    }
    sortedData = nextProps.item[0];


    if (!isEmpty(sortedData.error) && this.state.display) {
      $('#modalE').modal('open');
      this.setState({
        display: false,
        error: sortedData.error,
      });
    } else if (!isEmpty(sortedData.data) && this.state.display) {
      this.setState({
        display: false,
        message: sortedData.data,
        imageloaded: true
      });
      $('#modalS').modal('open');
    }
  }

  /**
   * 
   * @function handleExit
   * @param {any} e 
   * @memberof Userprofile
   */
  handleExit(e) {
    e.preventDefault();

    $('#modalE').modal('close');
    $('#modalS').modal('close');

    this.setState({
      error: '',
      message: '',
      file: '',
    });
  }
  /**
   * 
   * @function handleInputChange
   * @param {any} e 
   * @memberof Userprofile
   */
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
   * 
   * @function handleClose
   * @param {any} e 
   * @memberof Userprofile
   */
  handleClose(e) {
    e.preventDefault();
    {
      $('#modalO').modal('close');
    }
  }

  /**
   * 
   * @function handleEdit
   * @param {any} e 
   * @memberof Userprofile
   */
  handleEdit(e) {
    pointer = true;
    e.preventDefault();
    if (this.state.disabled) {
      this.setState({
        disabled: false,
        buttonText: 'Save',

      });
    }


    if (!this.state.disabled) {
      if (this.state.firstName && this.state.lastName && this.state.email && this.state.membershipType && pointer) {
        this.setState({
          modalErrorMessage: '',
          disabled: true,
          buttonText: 'Edit',
        });
        $('#modalO').modal('open');
        pointer = false;
      }
    }
  }

  /**
   * 
   *@function handleClick
   * @param {any} e 
   * @memberof Userprofile
   */
  handleClick(e) {
    e.preventDefault();
    this.setState({
      display: true,
    });
    this.props.updateUser(this.state, localStorage.jwtToken);
    $('#modalO').modal('close');
  }


  render() {
    return (

      <div id="b_page" className="row">
        <form className="form-signin col col l10 offset-l1 col m11 offset-m2 col s12" action="">
          <h4 className="sub-header form-signin-heading"> Personal Info</h4>
          <div className="input-field">
            <label htmlFor="firstname" className="sr-only">First Name</label>
            <input
              type="text" id="firstname" className="form-control validate" placeholder="First Name" required
              autoFocus value={ this.state.firstName } name="firstName" onChange={ this.handleInputChange }
              disabled={ this.state.disabled }
            />
          </div>
          <div className="input-field">
            <label htmlFor="lastname" className="sr-only">Last Name</label>
            <input
              type="text" id="lastname" className="form-control validate" placeholder="Last Name" required
              autoFocus value={ this.state.lastName } name="lastName" onChange={ this.handleInputChange }
              disabled={ this.state.disabled }
            />
          </div>
          <div className="input-field">
            <label htmlFor="inputSignUpEmail" className="sr-only">Email address</label>
            <input
              type="email" id="inputSignUpEmail" className="form-control validate" placeholder="Email address" required
              autoFocus value={ this.state.email } name="email" onChange={ this.handleInputChange }
              disabled={ this.state.disabled }
            />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="inputPhoneNumber">Phone number</label>
            <input
              type="number" id="inputPhoneNumber" className="form-control validate" placeholder="phone number" required
              autoFocus value={ this.state.mobileNumber } name="mobileNumber" onChange={ this.handleInputChange }
              disabled={ this.state.disabled }
            />
          </div>

          <select name="membershipType" className="browser-default" onChange={ this.handleInputChange } disabled={ this.state.disabled } >
            <option defaultValue={ this.state.membershipType } >{this.state.membershipType}</option>
            <option value="Basic">Basic</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
          </select>

          <SingleActionModal
            id={ 'modalE' } heading={ 'Oh!' }
            message={ this.state.error ? this.state.error : this.state.modalErrorMessage }
            onHandleExit={ this.handleExit }
          />
          <SingleActionModal
            id={ 'modalS' } heading={ 'Done!' }
            message={ this.state.message ? this.state.message : '' }
            onHandleExit={ this.handleExit }
          />
          <DoubleActionModal
            id={ 'modalO' }
            onHandleClick={ this.handleClick }
            onHandleClose={ this.handleClose }
            bookTitle={ '' }
            heading={ 'Do you want to update your details?' }
          />

          <div className="input-field inline">
            <button id="editbtn" type="button" onClick={ this.handleEdit } className="btn btn-primary pbtn">{this.state.buttonText}</button>
          </div>

        </form>
      </div>
    );
  }
}

Userprofile.propTypes = {
  data: PropTypes.array.isRequired,
  item: PropTypes.array.isRequired,
  updateUser: PropTypes.func.isRequired,

};


export default Userprofile;
