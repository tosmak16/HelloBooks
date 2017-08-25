import React from 'react';

class AdminSidebar extends React.Component {
  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li style={{ margintop: '20px' }}>
            <a id="dash" href="#">
              <i className="material-icons left">local_convenience_store</i> Book Store
            </a>
          </li>
          <li>
            <a id="myP" href="#"> <i className="material-icons left">cloud_upload</i>Upload Book</a>
          </li>
          <li>
            <a id="bor" href="#"><i className="material-icons left">system_update</i>Update Book</a>
          </li>
          <li>
            <a href="#"><i className="material-icons left">lock</i>Change Password</a>
          </li>
          <li>
            <a href="index.html"><i className="material-icons left">exit_to_app</i>Logout</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default AdminSidebar;
