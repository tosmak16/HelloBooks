import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import getUserdetails from '../../actions/getUserDetails';

let imgName = '';
let display = true;
const show = true;

class DashboardSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      imageName: '',
    };

    this.handleClickBookShelf = this.handleClickBookShelf.bind(this);
    this.handleClickAccount = this.handleClickAccount.bind(this);
    this.handleClickHistory = this.handleClickHistory.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
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


  componentWillMount() {
    if (!this.props.data) {
      this.props.getUserdetails();
    }
  }

  componentDidMount() {
    //  imgName = this.props.data[0];

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && display) {
      imgName = nextProps.data[0];
      display = false;
    }
  }

  componentWillUpdate() {

  }


  render() {
    return (
      <div className="row">
        <div className="col s12 col m2 col l2">
          <div id="sidebar-wrapper" >
            <ul className="sidebar-nav" style={{ marginTop: '10px' }} >
              <li>
                <div id="imageborder">
                  <img id="userimg" src={ !isEmpty(imgName.profileImage) ? require(`../../../public/img/${imgName.profileImage}`) : require('../../../public/img/userimg.png') } width="120" height="120" alt="images" />
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
        </div >
      </div >
    );
  }
}
function mapStateToProps(state) {
  return {
    data: state.UserDetails[0].data,
    userDataError: state.UserDetails[0].error,
    isRefreshed: state.refreshPage[0].isRefreshed,
    image: state.userProfileImage[0].response
  };
}

export default connect(mapStateToProps, { getUserdetails })(DashboardSidebar);
