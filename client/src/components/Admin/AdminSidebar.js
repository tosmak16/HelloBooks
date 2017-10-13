import React from 'react';
import { Link } from 'react-router';

class AdminSidebar extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 col m2 col l2">
          <div id="sidebar-wrapper" >
            <ul className="sidebar-nav" style={{ marginTop: '10px' }} >
              <li >
                <Link to={ '/admin/bookstore' } >
                  <i className="material-icons left">local_convenience_store</i> Book Store
                </Link>
              </li>
              <li>
                <Link to={ '/admin/uploadbook' }> <i className="material-icons left">cloud_upload</i>Upload Book</Link>
              </li>
              <li>
                <Link to={ '/admin/updatebook' } ><i className="material-icons left">system_update</i>Update Book</Link>
              </li>
              <li>
                <Link href="#"><i className="material-icons left">lock</i>Change Password</Link>
              </li>
              <li>
                <Link href="index.html"><i className="material-icons left">exit_to_app</i>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminSidebar;
