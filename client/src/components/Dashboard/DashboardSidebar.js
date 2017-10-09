import React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';

import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';

let imgName = '';

/**
 * 
 * 
 * @class DashboardSidebar
 * @extends {React.Component}
 */
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
  /**
   * 
   * 
   * @param {any} nextProps 
   * @memberof DashboardSidebar
   */
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.data)) {
      imgName = nextProps.data[0];
      this.setState({
        display: false,
      });
    }

    if (this.state.show) {
      if (!isEmpty(this.props.error)) {
        $('#modaE').show();
        this.setState({
          show: false,
          error: this.props.error,
          imagePreviewUrl: '',
        });
      } else if (!isEmpty(this.props.message)) {
        this.setState({
          show: false,
          message: 'Image uploaded successfully',
        });
        $('#modaS').show();
      }
    }

    if (this.state.imageloaded) {
      if (!isEmpty(nextProps.imageUrl)) {
        this.setState({
          imageloaded: false,
          profileImage: nextProps.imageUrl,
          show: true,
        });

        this.props.updateUser({ profileImage: nextProps.imageUrl }, localStorage.jwtToken);
      }
    }
  }

  /**
   * 
   * @function handleClick
   * @param {any} e 
   * @memberof DashboardSidebar
   */
  handleClick(e) {
    e.preventDefault();
    this.setState({
      show: false,
      imageloaded: true,
      profileImage: '',
    });
    this.props.uploadAvatar(this.state.file);
    $('#modaO').hide();
  }
  /**
   * 
   * @function handleClose
   * @param {any} e 
   * @memberof DashboardSidebar
   */
  handleClose(e) {
    e.preventDefault();
    $('#modaO').hide();
    this.setState({
      imagePreviewUrl: '',
    });
  }
  /**
   * 
   * @function handleExit
   * @param {any} e 
   * @memberof DashboardSidebar
   */
  handleExit(e) {
    e.preventDefault();

    $('#modaE').hide();
    $('#modaS').hide();

    this.setState({
      error: '',
      message: '',
      file: '',
    });
  }

  /**
   * 
   * @function handleEdit
   * @param {any} e 
   * @memberof DashboardSidebar
   */
  handleEdit(e) {
    e.preventDefault();
    if (this.state.file) {
      if (this.state.imageHeight > 200 || this.state.imageWidth > 150) {
        this.setState({ modalErrorMessage: 'Please image height  and width must be 200 and 150 respectively' });
        $('#modaE').show();
      } else if (this.state.imageSize > 100000) {
        this.setState({ modalErrorMessage: 'Please image size must not be more than 100kb' });
        $('#modaE').show();
      } else $('#modaO').show();
    }
  }

  /**
   * 
   * @function handleImageChange
   * @param {any} e 
   * @param {boolean} [set=true] 
   * @memberof DashboardSidebar
   */
  handleImageChange(e, set = true) {
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
      });
    };
    if (set) { reader.readAsDataURL(file); }
  }

  /**
   * 
   * @function handleClickBookShelf
   * @param {any} e 
   * @memberof DashboardSidebar
   */
  handleClickBookShelf(e) {
    e.preventDefault();
    {
      $('#bb_table').show();
      $('#b_page').hide();
      $('#bh_table').hide();
      $('#ch_pas').hide();
    }
  }

  /**
   * 
   * @function handleClickAccount
   * @param {any} e 
   * @memberof DashboardSidebar
   */
  handleClickAccount(e) {
    e.preventDefault();
    {
      $('#b_page').show();
      $('#bb_table').hide();
      $('#bh_table').hide();
      $('#ch_pas').hide();
    }
  }
  /**
   * 
   * @function handleClickHistory
   * @param {any} e 
   * @memberof DashboardSidebar
   */
  handleClickHistory(e) {
    e.preventDefault();
    {
      $('#bh_table').show();
      $('#bb_table').hide();
      $('#b_page').hide();
      $('#ch_pas').hide();
    }
  }

  /**
   * 
   *@function handleChangePassword
   * @param {any} e 
   * @memberof DashboardSidebar
   */
  handleChangePassword(e) {
    e.preventDefault();
    {
      $('#bh_table').hide();
      $('#bb_table').hide();
      $('#b_page').hide();
      $('#ch_pas').show();
    }
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
                      <img id="userimg" src={ this.state.imagePreviewUrl ? this.state.imagePreviewUrl : !isEmpty(imgName.profileImage) ? imgName.profileImage : 'http://res.cloudinary.com/tosmak/image/upload/v1507297483/userimg_cxeszl.png' } width="120" height="120" alt="images" />


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
  imageUrl: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired

};

export default DashboardSidebar;
