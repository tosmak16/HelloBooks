import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import getUserdetails from '../../actions/getUserDetails';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import updateUser from '../../actions/updateuserDetails';
import { uploadAvatar } from '../../actions/uploadUserAvatar';

let imgName = '';
const display = true;
const show = true;

class DashboardSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      imageName: '',
      email: '',
      profileImage: '',
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

    this.handleClickBookShelf = this.handleClickBookShelf.bind(this);
    this.handleClickAccount = this.handleClickAccount.bind(this);
    this.handleClickHistory = this.handleClickHistory.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }


  handleClick(e) {
    e.preventDefault();
    this.setState({
      show: true,
    });
    this.props.updateUser(this.state);
    document.getElementById('modaO').style.display = 'none';
  }

  handleClose(e) {
    e.preventDefault();
    document.getElementById('modaO').style.display = 'none';
    this.setState({
      imagePreviewUrl: '',
    });
  }

  handleExit(e) {
    e.preventDefault();
    document.getElementById('modaE').style.display = 'none';
    document.getElementById('modaS').style.display = 'none';
    this.setState({
      error: '',
      message: '',
      file: '',
    });
  }


  handleEdit(e) {
    e.preventDefault();
    if (this.state.file) {
      if (this.state.imageHeight !== 200 || this.state.imageWidth !== 150) {
        this.setState({ modalErrorMessage: 'Please image height  and width must be 200 and 150 respectively' });

        document.getElementById('modaE').style.display = 'block';
      } else if (this.state.imageSize > 100000) {
        this.setState({ modalErrorMessage: 'Please image size must not be more than 100kb' });
        document.getElementById('modaE').style.display = 'block';
      } else {
        document.getElementById('modaO').style.display = 'block';
      }
    }
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


  componentWillMount() {

  }

  componentDidMount() {


  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.data)) {
      imgName = nextProps.data[0];
      this.setState({
        display: false,
      });
    }

    if (this.state.show) {
      if (!isEmpty(this.props.error)) {
        document.getElementById('modaE').style.display = 'block';
        this.setState({
          show: false,
          error: this.props.error,
          imagePreviewUrl: '',
        });
      } else if (!isEmpty(this.props.message)) {
        this.setState({
          show: false,
          imageloaded: true
        });
        this.state.file ? this.props.uploadAvatar(this.state.file) : '';
      }
    }

    if (this.state.imageloaded) {
      if (nextProps.image.status === 200) {
        this.setState({
          imageloaded: false,
          message: 'Image uploaded successfully',
        });

        document.getElementById('modaS').style.display = 'block';
      }
    }
  }

  componentWillUpdate() {

  }


  handleClickBookShelf(e) {
    e.preventDefault();
    document.getElementById('bb_table').style.display = 'block';
    document.getElementById('b_page').style.display = 'none';
    document.getElementById('bh_table').style.display = 'none';
    document.getElementById('ch_pas').style.display = 'none';
  }
  handleClickAccount(e) {
    e.preventDefault();
    document.getElementById('b_page').style.display = 'block';
    document.getElementById('bb_table').style.display = 'none';
    document.getElementById('bh_table').style.display = 'none';
    document.getElementById('ch_pas').style.display = 'none';
  }
  handleClickHistory(e) {
    e.preventDefault();
    document.getElementById('bh_table').style.display = 'block';
    document.getElementById('bb_table').style.display = 'none';
    document.getElementById('b_page').style.display = 'none';
    document.getElementById('ch_pas').style.display = 'none';
  }
  handleChangePassword(e) {
    e.preventDefault();
    document.getElementById('bh_table').style.display = 'none';
    document.getElementById('bb_table').style.display = 'none';
    document.getElementById('b_page').style.display = 'none';
    document.getElementById('ch_pas').style.display = 'block';
  }


  render() {
    return (
      <div className="row">
        <div className="col s12 col m2 col l2">
          <div id="sidebar-wrapper" >
            <ul className="sidebar-nav" style={{ marginTop: '10px' }} >
              <li>
                <div id="imageborder">
                  <div className="file-field input-field">
                    <div id="filebtn" style={{ marginLeft: '5px', color: 'white' }} className="">
                      <span />
                      <img id="userimg" src={ this.state.imagePreviewUrl ? this.state.imagePreviewUrl : !isEmpty(imgName.profileImage) ? require(`../../../public/img/${imgName.profileImage}`) : require('../../../public/img/userimg.png') } width="120" height="120" alt="images" />


                      <input
                        disabled={ this.state.disabled } className="fileInput" id="photoInput" onChange={ this.handleImageChange }
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        placeholder="Upload profile image"
                      />


                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" style={{ width: '100px' }} type="text" placeholder="Upload profile image" />
                      <div className="input-field inline">
                        <button id="" style={{ marginTop: '0px', backgroundColor: '#3d1112', color: 'wheat' }} type="button" onClick={ this.handleEdit } className="btn-sm">Upload</button>
                      </div>
                    </div>
                  </div>

                </div>
              </li>
              <li>
                <a id="dash" onClick={ this.handleClickBookShelf } href="#">
                  <i className="material-icons left">local_library</i> Books Shelf
                </a>
              </li>
              <li>
                <a id="myP" onClick={ this.handleClickAccount } href="#"><i className="material-icons left">dashboard</i>Account</a>
              </li>
              <li>
                <a id="bor" onClick={ this.handleClickHistory } href="#"><i className="material-icons left">data_usage</i>History</a>
              </li>
              <li>
                <a href="#" onClick={ this.handleChangePassword } ><i className="material-icons left">lock</i>Change Password</a>
              </li>
              <li>
                <a href="index.html"><i className="material-icons left">exit_to_app</i>Logout</a>
              </li>

            </ul>
          </div >
          <SingleActionModal
            id={ 'modaE' } heading={ 'Oh!' }
            message={ this.state.error ? this.state.error : this.state.modalErrorMessage }
            onHandleExit={ this.handleExit }
          />
          <SingleActionModal
            id={ 'modaS' } heading={ 'Done!' }
            message={ this.state.message ? this.state.message : '' }
            onHandleExit={ this.handleExit }
          />
          <DoubleActionModal
            id={ 'modaO' }
            onHandleClick={ this.handleClick }
            onHandleClose={ this.handleClose }
            bookTitle={ '' }
            heading={ 'Do you want to change your profile picture?' }
          />
        </div >
      </div >
    );
  }
}

DashboardSidebar.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired

};

function mapStateToProps(state) {
  return {
    //  data: state.UserDetails[0].data,
    image: state.userProfileImage[0].response,
    error: state.updateUser[0].error,
    message: state.updateUser[0].data,
  };
}

export default connect(mapStateToProps, { updateUser, uploadAvatar })(DashboardSidebar);
