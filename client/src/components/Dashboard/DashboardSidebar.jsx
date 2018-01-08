import React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Link, browserHistory } from 'react-router';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import ActivityLoader from '../preloader/ActivityLoader';

let displayPreloader = 'none';
/**
 * @class DashboardSidebar
 * 
 * @extends {React.Component}
 */
class DashboardSidebar extends React.Component {
  /**
   * Creates an instance of DashboardSidebar.
   * 
   * @param {object} props
   * 
   * @memberof DashboardSidebar
   * 
   * @returns {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      imageName: '',
      email: '',
      profileImage: '',
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

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  /**
   * @param {object} nextProps
   * 
   * @memberof DashboardSidebar
   * 
   *  @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    displayPreloader = 'none';
    if (this.state.show) {
      if (!isEmpty(this.props.error)) {
        $('#modaE').modal('open');
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
        $('#modaS').modal('open');
      }
    }

    if (this.state.imageloaded) {
      if (!isEmpty(nextProps.imageUrl)) {
        this.props.userData[0].profileImage = nextProps.imageUrl;
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
   * @function handleClick
   * 
   * @param {object} event
   * 
   * @memberof DashboardSidebar
   * 
   *  @returns {void}
   */
  handleClick(event) {
    displayPreloader = 'block';
    event.preventDefault();
    this.setState({
      show: false,
      imageloaded: true,
      profileImage: '',
    });
    this.props.uploadAvatar(this.state.file);
    $('#modaO').modal('close');
  }
  /**
   * @function handleClose
   * 
   * @param {object} event
   * 
   * @memberof DashboardSidebar
   * 
   *  @returns {void}
   */
  handleClose(event) {
    event.preventDefault();
    $('#modaO').modal('close');
    this.setState({
      imagePreviewUrl: '',
    });
  }
  /**
   * @function handleExit
   * 
   * @param {object} event
   * 
   * @memberof DashboardSidebar
   * 
   * @returns {void}
   */
  handleExit(event) {
    event.preventDefault();
    $('#modaE').modal('close');
    $('#modaS').modal('close');
    this.setState({
      error: '',
      message: '',
      file: '',
    });
  }

  /**
   * @function handleEdit
   * 
   * @param {object} event
   * 
   * @memberof DashboardSidebar
   * 
   * @returns {void}
   */
  handleEdit(event) {
    event.preventDefault();
    if (this.state.file) {
      if (this.state.imageHeight > 200 || this.state.imageWidth > 150) {
        this.setState({ modalErrorMessage: 'Please image height  and width must be 200 and 150 respectively' });
        $('#modaE').modal('open');
      } else if (this.state.imageSize > 100000) {
        this.setState({ modalErrorMessage: 'Please image size must not be more than 100kb' });
        $('#modaE').modal('open');
      } else $('#modaO').modal('open');
    }
  }

  /**
   * @function handleImageChange
   * 
   * @param {object} event
   * 
   * @param {boolean} [set=true]
   * 
   * @memberof DashboardSidebar
   * 
   * @returns {void}
   */
  handleImageChange(event, set = true) {
    const reader = new FileReader();
    const file = event.target.files[0];
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
   * @param {object} event
   * 
   * @memberof DashboardSidebar
   * 
   * @returns {void}
   */
  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
    browserHistory.push('/login');
  }
  /**
   * @memberof DashboardSidebar
   * 
   * @returns {views} containing side navigation link
   */
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
                      {!_.isEmpty(this.props.userData[0])
                        && <img
                          id="userimg"
                          src={this.state.imagePreviewUrl ?
                            this.state.imagePreviewUrl :
                            !isEmpty(this.props.userData[0].profileImage) ? this.props.userData[0].profileImage : 'https://res.cloudinary.com/tosmak/image/upload/v1507297483/userimg_cxeszl.png'}
                          width="120"
                          height="120"
                          alt="images"
                        />}
                      <input
                        disabled={this.state.disabled}
                        className="fileInput"
                        id="photoInput"
                        onChange={this.handleImageChange}
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        placeholder="Upload profile image"
                      />

                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" style={{ width: '100px' }} type="text" placeholder="Upload profile image" />
                      <div className="input-field inline">
                        <button id="" style={{ marginTop: '0px', backgroundColor: '#3d1112', color: 'wheat' }} type="button" onClick={this.handleEdit} className="btn-sm">Upload</button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link to={'/dashboard/borrowedbooks'}>
                  <i className="material-icons left">local_library</i> Books Shelf
                </Link>
              </li>
              <li>
                <Link to={'/dashboard/userprofile'} ><i className="material-icons left">dashboard</i>Account</Link>
              </li>
              <li>
                <Link to={'/dashboard/history'}><i className="material-icons left">data_usage</i>History</Link>
              </li>
              <li>
                <Link to={'/dashboard/changepassword'} ><i className="material-icons left">lock</i>Change Password</Link>
              </li>
              <li>
                <Link to={'/login'} onClick={this.handleLogout} ><i className="material-icons left">exit_to_app</i>Logout</Link>
              </li>

            </ul>
          </div >
          <SingleActionModal
            id={'modaE'}
            heading={'Oh!'}
            message={this.state.error ? this.state.error : this.state.modalErrorMessage}
            onHandleExit={this.handleExit}
          />
          <SingleActionModal
            id={'modaS'}
            heading={'Done!'}
            message={this.state.message ? this.state.message : ''}
            onHandleExit={this.handleExit}
          />
          <DoubleActionModal
            id={'modaO'}
            onHandleClick={this.handleClick}
            onHandleClose={this.handleClose}
            bookTitle={''}
            heading={'Do you want to change your profile picture?'}
          />
        </div >
        <div
          style={{
            display: displayPreloader.toString()
          }}
          id="activity-loader-id"
          className="activity"
        >
          <ActivityLoader />
        </div>
      </div >
    );
  }
}
DashboardSidebar.propTypes = {
  userData: PropTypes.arrayOf(PropTypes.any).isRequired,
  error: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired
};
export default DashboardSidebar;

