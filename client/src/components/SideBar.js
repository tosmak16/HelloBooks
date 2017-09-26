import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import showbooksByCategory from '../actions/showbooksByCategory';

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    browserHistory.push('/books');
    this.props.showbooksByCategory(e.target.name, this.props.data);
  }

  handleCollapse(e) {
    e.preventDefault();
    $('.collapsible').collapsible();
  }
  render() {
    return (
      <div className="row">
        <div id="sidenava" className="col s12 col m2 col l2 sidebar ">
          <ul className="collapsible" data-collapsible="accordion">
            <li> <div className="collapsible-header"> <label className="heada" onClick={ this.handleCollapse } ><b>SCIENCE&TECH</b></label> </div>
              <div className="collapsible-body"><a className="boda" name="Science" onClick={ this.handleClick } href="#">Science</a> </div>

              <div className="collapsible-body"><a className="boda" name="Technology" onClick={ this.handleClick } href="#">Technology</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Computer" onClick={ this.handleClick } href="#">Computer</a> </div>
            </li>

            <li> <div className="collapsible-header"> <label className="heada" onClick={ this.handleCollapse } ><b>LITERATURE</b></label> </div>
              <div className="collapsible-body"> <a className="boda" name="Fiction" onClick={ this.handleClick } href="#">Fiction</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Mystery" onClick={ this.handleClick } href="#">Mystery</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Romance" onClick={ this.handleClick } href="#">Romance</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Sci-Fiction" onClick={ this.handleClick } href="#">Sci-Fiction</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Adventure" onClick={ this.handleClick } href="#">Adventure</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Action" onClick={ this.handleClick } href="#">Action</a> </div>
            </li>

            <li> <div className="collapsible-header"> <label className="heada" onClick={ this.handleCollapse } ><b>STYLE AND ART</b></label> </div>
              <div className="collapsible-body"> <a className="boda" name="Arts" onClick={ this.handleClick } href="#">Arts</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Languages" onClick={ this.handleClick } href="#">Languages</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Fashion" onClick={ this.handleClick } href="#">Fashion</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Food" onClick={ this.handleClick } href="#">Food</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Games" onClick={ this.handleClick } href="#">Games</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Music" onClick={ this.handleClick } href="#">Music</a> </div>
            </li>

            <li> <div className="collapsible-header"> <label className="heada" onClick={ this.handleCollapse } ><b>CAREER & MONEY</b></label> </div>
              <div className="collapsible-body"> <a className="boda" name="Management" onClick={ this.handleClick } href="#">Management</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Accounting" onClick={ this.handleClick } href="#">Accounting</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Entrepreneurship" onClick={ this.handleClick } href="#">Entrepreneurship</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Leadership" onClick={ this.handleClick } href="#">Leadership</a> </div>
            </li>

            <li> <div className="collapsible-header"> <label className="heada" onClick={ this.handleCollapse } ><b>PERSONAL GROWTH</b></label> </div>
              <div className="collapsible-body"> <a className="boda" name="Psychology" onClick={ this.handleClick } href="#">Psychology</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Relationships" onClick={ this.handleClick } href="#">Relationships</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Self-Improvement" onClick={ this.handleClick } href="#">Self-Improvement</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Religion" onClick={ this.handleClick } href="#">Religion</a> </div>
            </li>

            <li> <div className="collapsible-header"> <label className="heada" onClick={ this.handleCollapse } ><b>HEALTH & FITNESS</b></label> </div>
              <div className="collapsible-body"> <a className="boda" name="Fitness" onClick={ this.handleClick } href="#">Fitness</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Nutrition" onClick={ this.handleClick } href="#">Nutrition</a> </div>

              <div className="collapsible-body"> <a className="boda" name="Sports" onClick={ this.handleClick } href="#">Sports</a> </div>
            </li>


          </ul>

        </div>
      </div >
    );
  }
}

SideBar.propTypes = {
  showbooksByCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.books[0].data
});
export default connect(mapStateToProps, { showbooksByCategory })(SideBar);

