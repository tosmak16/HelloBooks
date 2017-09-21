import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import getUserdetails from '../../actions/getUserDetails';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import updateUser from '../../actions/updateuserDetails';


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
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSelected = this.handleChange.bind(this);
    // this.handleImageChange = this.handleImageChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    // this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleExit(e) {
    e.preventDefault();
    document.getElementById('modalE').style.display = 'none';
    document.getElementById('modalS').style.display = 'none';
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  handleClose(e) {
    e.preventDefault();
    document.getElementById('modalO').style.display = 'none';
  }

  handleExit(e) {
    e.preventDefault();
    document.getElementById('modalE').style.display = 'none';
    document.getElementById('modalS').style.display = 'none';
  }
  componentWillMount() {
    if (isEmpty(this.props.data)) {
      this.props.getUserdetails();
    }
  }

  handleEdit(e) {
    e.preventDefault();
    if (this.state.disabled) {
      this.setState({
        disabled: false,
        buttonText: 'Save',
      });
    }

    if (!this.state.disabled) {
      this.setState({
        disabled: true,
        buttonText: 'Edit',
      });
      document.getElementById('modalO').style.display = 'block';
      console.log(this.state);
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      display: true,
    });
    this.props.updateUser(this.state);
    document.getElementById('modalO').style.display = 'none';
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   firstName: nextProps.data.firstName
    // });
    if (!isEmpty(this.props.data) && this.state.show) {
      this.setState({
        firstName: nextProps.data[0].firstName,
        lastName: nextProps.data[0].lastName,
        email: nextProps.data[0].email,
        mobileNumber: nextProps.data[0].mobileNumber ? nextProps.data[0].mobileNumber : 0,
        membershipType: nextProps.data[0].membershipType,
        show: false,

      });
    }

    if (!isEmpty(nextProps.messages.toString()) && this.state.display) {
      this.setState({
        display: false,
      });
      document.getElementById('modalS').style.display = 'block';
    }

    if (isEmpty(nextProps.errors) && this.state.display) {
      document.getElementById('modalE').style.display = 'block';
      this.setState({
        display: false,
      });
    }
  }


  render() {
    console.log(`render data:${this.props.data}`);
    console.log(this.state.firstName);
    console.log(this.state.show);

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
            message={ this.props.errors }
            onHandleExit={ this.handleExit }
          />
          <SingleActionModal
            id={ 'modalS' } heading={ 'Done!' }
            message={ this.props.messages.toString() }
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
  getUserdetails: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    error: state.UserDetails.error,
    data: state.UserDetails.data,
    bookData: state.books.data,
    isRefreshed: state.refreshPage.isRefreshed,
    messages: state.updateUser.data,
    errors: state.updateUser.error,
  };
}

export default connect(mapStateToProps, { getUserdetails, updateUser })(Userprofile);
