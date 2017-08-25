import React from 'react';
import { Link } from 'react-router';


export default () => (

  <div className="navbar-fixed">
    <nav id="nav_id" className="navbar-fixed">
      <div className="nav-wrapper">
        <div>
          <a id="hello" className="brand-logo" href="#"><i className="material-icons left"> collections</i>HelloBooks</a>
        </div>
        <div>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="books.html" >Catalog</a></li>
            <li><a href="dashboard.html"><i className="material-icons left">account_circle</i>user@gmail.com</a></li>
            <li><a href="index.html" ><i className="material-icons left">exit_to_app</i> Log out</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);
