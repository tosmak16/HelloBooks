import React from 'react';
import jwtDecode from 'jwt-decode';
import { PropTypes } from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/logout';


/**
 * @description Nav bar functional component
 * 
 * @argument {object} props
 * 
 * @returns {views} navigation bar
 */
const NavigationBar = (props) => {
  let decodedToken = '';
  /**
    * @param {object} event
    *
    * @returns {void} 
   */
  const handleLogout = (event) => {
    event.preventDefault();
    props.logout();
    browserHistory.push('/login');
  };

  const triggerDropdown = () => { $('.dropdown-button').dropdown(); };

  const { isAuthenticated, user } = props.auth;
  isAuthenticated ? decodedToken = jwtDecode(localStorage.jwtToken) : decodedToken;
  const userLinks = (
    <div>
      <ul id="nav-mobile" className="right hide-on-small-only navbar_list">
        <li><Link to="/books" >Catalogue</Link></li>
        {isAuthenticated && decodedToken.role.toString() === 'admin'
          &&
          <li>
            <Link className="user-profile-nav" to="/admin" >
              <i
                className="material-icons left"
              >store
              </i>Store
            </Link>
          </li>}
        <li>
          <Link
            className="dropdown-button"
            to=""
            onClick={triggerDropdown}
            data-activates="dropdown1"
          >
            {`${user.user}`}
            <i className="material-icons right">
              arrow_drop_down
            </i>
          </Link>
        </li>
      </ul>
      <div>
        <ul id="dropdown1" className="dropdown-content drop-down-width">
          <li><Link
            className="user-profile-nav navbar-drop-down"
            to="/dashboard/userprofile"
          >
            <i
              className="material-icons left"
            >account_circle</i>{user.user}</Link></li>
          <li>
            <Link to={'/login'} className="navbar-drop-down" onClick={handleLogout} >
              <i className="material-icons left">
                exit_to_app
              </i>
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </div >
  );
  const userLinks2 = (
    <div>
      <ul id="nav-mobile" className="left hide-on-med-and-up navbar_list ">
        <li><Link to="/books" >Catalogue</Link></li>
        {isAuthenticated && decodedToken.role.toString() === 'admin' && <li>
          <Link className="user-profile-nav" to="/admin" >
            <i className="material-icons left">store</i>Store</Link></li>}
        <li>
          <Link
            className="dropdown-button"
            to=""
            onClick={triggerDropdown}
            data-activates="dropdown2"
          >
            {`${user.user}`}
            <i className="material-icons right">
              arrow_drop_down
            </i>
          </Link>
        </li>
      </ul>
      <div>
        <ul id="dropdown2" className="dropdown-content drop-down-width">
          <li><Link
            className="user-profile-nav navbar-drop-down"
            to="/dashboard/userprofile"
          >
            <i
              className="material-icons left"
            >account_circle</i>{user.user}</Link></li>
          <li>
            <Link to={'/login'} className="navbar-drop-down" onClick={handleLogout} >
              <i className="material-icons left">
                exit_to_app
              </i>
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </div >
  );
  const guestLinks = (
    <ul id="nav-mobile" className="right hide-on-small-only ">
      <li>
        <Link
          to="/signup"
          id="signup"
          className="waves-effect waves-light btn-sm btn-flat"
        >
          <i className="material-icons left">
            account_box
          </i>
          Sign Up
        </Link>
      </li>
      <li><Link
        to="/login"
        id="login"
        className="waves-effect waves-light btn-sm btn-flat"
      ><i className="material-icons left">
          exit_to_app
        </i>
        Sign In
      </Link>
      </li>
    </ul>
  );
  const guestLinks2 = (
    <ul id="nav-mobile" className="left hide-on-med-and-up ">
      <li>
        <Link
          to="/signup"
          id="signup"
          className="waves-effect waves-light btn-sm btn-flat"
        ><i className="material-icons left">
            account_box
          </i>
          Sign Up
        </Link>
      </li>
      <li><Link
        to="/login"
        id="login"
        className="waves-effect waves-light btn-sm btn-flat"
      ><i className="material-icons left">
          exit_to_app
        </i>
        Sign In
      </Link>
      </li>
    </ul>
  );
  return (
    <div>
      <div className="navbar-fixed">
        <nav id="nav_id" className="navbar-fixed">
          <div className="nav-wrapper">
            <div style={{ marginLeft: '50px' }}>
              <Link
                id="hello"
                className="brand-logo left"
                to="/books"
              >
                <i className="material-icons left">
                  collections
                </i>
                HelloBooks
              </Link>
            </div>
            <div style={{ marginRight: '30px' }}>
              {isAuthenticated ? userLinks : guestLinks}
            </div>
          </div>
        </nav>

      </div>
      <div className="navbar-fixed hide-on-med-and-up">
        <nav id="nav_id" className="navbar-fixed">
          <div className="nav-wrapper">
            <div>
              {isAuthenticated ? userLinks2 : guestLinks2}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

NavigationBar.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  logout: PropTypes.func.isRequired,
};
/**
 * @param {arrayOfObject} state
 * 
 * @returns {object} of some reduxreducers
 */
function mapStateToProps(state) {
  return {
    auth: state.auth[0],
  };
}
export default connect(mapStateToProps, { logout })(NavigationBar);
