import React from 'react';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';

/**
 * @description it compose of admin side bar
 * @returns {views} containing admin side nav bar
 * @param {object} props
 */
const AdminSidebar = (props) => {
  const handleLogout = (event) => {
    event.preventDefault();
    props.logout();
    browserHistory.push('/login');
  };
  return (
    <div className="row">
      <div className="col s12 col m2 col l2">
        <div id="sidebar-wrapper" >
          <ul className="sidebar-nav" style={{ marginTop: '10px' }} >
            <li >
              <Link to={'/admin/bookstore'} >
                <i className="material-icons left">local_convenience_store</i> Book Store
              </Link>
            </li>
            <li>
              <Link to={'/admin/uploadbook'}> <i className="material-icons left">cloud_upload</i>Upload Book</Link>
            </li>
            <li>
              <Link to={'/admin/updatebook'} ><i className="material-icons left">system_update</i>Update Book</Link>
            </li>
            <li>
              <Link href="#"><i className="material-icons left">lock</i>Change Password</Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLogout}><i
                className="material-icons left"
              >exit_to_app</i>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
AdminSidebar.propTypes = {
  logout: PropTypes.func.isRequired
};
export default AdminSidebar;
