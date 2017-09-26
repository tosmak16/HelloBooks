import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';


import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import updateUser from '../../actions/updateuserDetails';
import { uploadAvatar } from '../../actions/uploadUserAvatar';
import refreshPage from '../../actions/refreshPage';
import getUserdetails from '../../actions/getUserDetails';


let sortedData = '';
let pointer = false;


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
    // this.handleSelected = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    // this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      const image = new Image();

      image.src = reader.result;

      image.onload = () => {
        this.setState({
          imageHeight: image.height,
          imageWidth: image.width,
          imageSize: file.size,
        });
      };
    };
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
        profileImage: Date.now() + file.name,
      });
    };

    reader.readAsDataURL(file);
  }

  handleExit(e) {
    e.preventDefault();
    document.getElementById('modalE').style.display = 'none';
    document.getElementById('modalS').style.display = 'none';
    this.setState({
      error: '',
      message: '',
      file: '',
    });
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClose(e) {
    e.preventDefault();
    document.getElementById('modalO').style.display = 'none';
  }


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
      if (this.state.file) {
        if (this.state.imageHeight !== 200 || this.state.imageWidth !== 150) {
          pointer = false;
          this.setState({ modalErrorMessage: 'Please image height  and width must be 200 and 150 respectively' });
          document.getElementById('modalE').style.display = 'block';
        } else if (this.state.imageSize > 500000) {
          pointer = false;
          this.setState({ modalErrorMessage: 'Please image size must not be more than 500kb' });
          document.getElementById('modalE').style.display = 'block';
        }
      }

      if (this.state.firstName && this.state.lastName && this.state.email && this.state.membershipType && pointer) {
        this.setState({
          modalErrorMessage: '',
          disabled: true,
          buttonText: 'Edit',
        });
        document.getElementById('modalO').style.display = 'block';
        pointer = false;
      }
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
        profileImage: nextProps.data[0].profileImage,
        show: false,

      });
    }
    sortedData = nextProps.item[0];
    if (this.state.display) {
      if (!isEmpty(sortedData.error) && this.state.display) {
        document.getElementById('modalE').style.display = 'block';
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
        this.state.file ? this.props.uploadAvatar(this.state.file) : '';

        document.getElementById('modalS').style.display = 'block';
      }
    }

    if (this.state.imageloaded) {
      if (nextProps.image.status === 200) {
        //  setTimeout(() => { this.props.getUserdetails(); }, 3000);
        // this.props.getUserdetails();
        this.setState({
          imageloaded: false,
        });
        // this.props.getbooks(true);

        this.props.getUserdetails();
      }
    }
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

          <div className="file-field input-field">
            <div id="filebtn" className="btn">
              <span>File</span>

              <input
                disabled={ this.state.disabled } className="fileInput" id="photoInput" onChange={ this.handleImageChange } type="file"
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Upload profile image" />
            </div>
          </div>

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

};

function mapStateToProps(state) {
  return {
    bookData: state.books[0].data,
    isRefreshed: state.refreshPage[0].isRefreshed,
    item: state.updateUser,
    image: state.userProfileImage[0].response
  };
}

export default connect(mapStateToProps, { updateUser, uploadAvatar, refreshPage, getUserdetails })(Userprofile);
