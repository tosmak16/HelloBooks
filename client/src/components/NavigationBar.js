import React from 'react';
import { Link } from 'react-router';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import auth from '../../reducers/auth';
import logout from '../actions/logoutAction';


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const userLinks = (
      <div>
        <ul id="nav-mobile" className="right hide-on-small-only ">
          <li><Link href="books" >Catalog</Link></li>
          <li><Link href=""><i className="material-icons left">account_circle</i>{user.user} profile</Link></li>
          <li><Link href="/signup" onClick={ this.handleLogout } ><i className="material-icons left">exit_to_app</i> Log out</Link></li>
        </ul>
      </div >
    );
    const userLinks2 = (
      <div>
        <ul id="nav-mobile" className="left hide-on-med-and-up">
          <li><Link href="books" >Catalog</Link></li>
          <li><Link href=""><i className="material-icons left">account_circle</i>{user.user} profile</Link></li>
          <li><Link href="/signup" onClick={ this.handleLogout } ><i className="material-icons left">exit_to_app</i> Log out</Link></li>
        </ul>
      </div >
    );

    const guestLinks = (
      <ul id="nav-mobile" className="right hide-on-small-only ">
        <li>
          <Link href="/signup" id="signup" className="waves-effect waves-light btn-sm btn-flat"><i className="material-icons left">account_box</i> Sign Up</Link>
        </li>
        <li><Link href="/login" id="login" className="waves-effect waves-light btn-sm btn-flat"><i className="material-icons left">exit_to_app</i> Sign In</Link></li>
      </ul>
    );
    const guestLinks2 = (
      <ul id="nav-mobile" className="left hide-on-med-and-up ">
        <li>
          <Link href="/signup" id="signup" className="waves-effect waves-light btn-sm btn-flat"><i className="material-icons left">account_box</i> Sign Up</Link>
        </li>
        <li><Link href="/login" id="login" className="waves-effect waves-light btn-sm btn-flat"><i className="material-icons left">exit_to_app</i> Sign In</Link></li>
      </ul>
    );
    return (
      <div>
        <div className="navbar-fixed">
          <nav id="nav_id" className="navbar-fixed">
            <div className="nav-wrapper">
              <div>
                <Link id="hello" className="brand-logo left" href="#"><i className="material-icons left"> collections</i>HelloBooks</Link>
              </div>
              <div>
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
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
