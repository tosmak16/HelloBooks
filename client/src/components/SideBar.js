import React from 'react';


class SideBar extends React.Component {
  render() {
    return (
      <div className="row">
        <div id="sidenava" className="col m2 col l2 sidebar ">
          <ul className="nav  nav-sidebar">
            <li><a className="heada" href="#"><b>SCIENCE & TECH</b></a></li>
            <li><a className="boda" href="#">Science</a></li>
            <li><a className="boda" href="#">Tech</a></li>
            <li><a className="boda" href="#">Computer</a></li>
          </ul>
          <ul className="nav nav-sidebar">
            <li><a className="heada" href=""><b>LIFE STYLE</b></a></li>
            <li><a className="boda" href="">Arts and Languages</a></li>
            <li><a className="boda" href="">Fashion and beauty</a></li>
            <li><a className="boda" href="">Food</a></li>
            <li><a className="boda" href="">Games</a></li>
          </ul>
          <ul className="nav nav-sidebar">
            <li><a className="heada" href=""><b>CAREER & MONEY</b></a></li>
            <li><a className="boda" href="">Management</a></li>
            <li><a className="boda" href="">Accounting</a></li>
          </ul>


        </div>
      </div>
    );
  }
}

export default SideBar;
