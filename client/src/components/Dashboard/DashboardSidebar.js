import React from 'react';


class DashboardSidebar extends React.Component {
  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav ">
          <li style={{ marginTop: '20px' }} >
            <div className="container">
              <div className="row">
                <div id="imageborder">
                  <img id="userimg" src="img/userimg.jpg" width="120" height="120" alt="images" />
                </div>
              </div>
            </div>
          </li>
          <li>
            <a id="dash" href="#">
              <i className="material-icons left">local_library</i> Books Shelf
            </a>
          </li>
          <li>
            <a id="myP" href="#"><i className="material-icons left">dashboard</i>Account</a>
          </li>
          <li>
            <a id="bor" href="#"><i className="material-icons left">data_usage</i>History</a>
          </li>
          <li>
            <a href="#"><i className="material-icons left">lock</i>Change Password</a>
          </li>
          <li>
            <a href="index.html"><i className="material-icons left">exit_to_app</i>Logout</a>
          </li>

        </ul>
      </div >
    );
  }
}

export default DashboardSidebar;
