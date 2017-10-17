import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import $ from 'jquery';

/**
 * 
 * 
 * @class SideBar
 * @extends {React.Component}
 */
class SideBar extends React.Component {
  /**
   * Creates an instance of SideBar.
   * @param {any} props 
   * @memberof SideBar
   */
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
  }
  /**
   * 
   * 
   * @param {any} e 
   * @param {boolean} [set=true] 
   * @memberof SideBar
   */
  handleClick(e) {
    this.props.showbooksByCategory(e.target.name, this.props.data);
  }
  /**
   * 
   * 
   * @param {any} e 
   * @param {boolean} [set=true] 
   * @memberof SideBar
   */
  handleCollapse(e, set = true) {
    if (set) {
      $('.collapsible').collapsible();
    }
    this.setState({
      fixError: true
    });
  }
  /**
   * 
   * 
   * @returns 
   * @memberof SideBar
   */
  render() {
    return (
      <div className="row">
        <div id="sidenava" className="col s12 col m2 col l2 sidebar ">
          <ul className="collapsible" data-collapsible="accordion">
            <li> <div className="collapsible-header"> <Link className="heada" onClick={ this.handleCollapse } ><b>SCIENCE&TECH</b></Link> </div>
              <div className="collapsible-body"><Link className="boda" name="Science" onClick={ this.handleClick } to="/books/science">Science</Link> </div>

              <div className="collapsible-body"><Link className="boda" name="Technology" onClick={ this.handleClick } to="/books/technology">Technology</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Computer" onClick={ this.handleClick } to="/books/computer">Computer</Link> </div>
            </li>

            <li> <div className="collapsible-header"> <Link className="heada" onClick={ this.handleCollapse } ><b>LITERATURE</b></Link> </div>
              <div className="collapsible-body"> <Link className="boda" name="Fiction" onClick={ this.handleClick } to="/books/fiction">Fiction</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Mystery" onClick={ this.handleClick } to="/books/mystery">Mystery</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Romance" onClick={ this.handleClick } to="/books/romance">Romance</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Sci-Fiction" onClick={ this.handleClick } to="/books/Sci-fiction">Sci-Fiction</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Adventure" onClick={ this.handleClick } to="/books/adventure">Adventure</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Action" onClick={ this.handleClick } to="/books/action">Action</Link> </div>
            </li>

            <li> <div className="collapsible-header"> <Link className="heada" onClick={ this.handleCollapse } ><b>STYLE AND ART</b></Link> </div>
              <div className="collapsible-body"> <Link className="boda" name="Arts" onClick={ this.handleClick } to="/books/arts">Arts</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Languages" onClick={ this.handleClick } to="/books/languages">Languages</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Fashion" onClick={ this.handleClick } to="/books/fashion">Fashion</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Food" onClick={ this.handleClick } to="/books/food">Food</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Games" onClick={ this.handleClick } to="/books/games">Games</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Music" onClick={ this.handleClick } to="/books/music">Music</Link> </div>
            </li>

            <li> <div className="collapsible-header"> <Link className="heada" onClick={ this.handleCollapse } ><b>CAREER & MONEY</b></Link> </div>
              <div className="collapsible-body"> <Link className="boda" name="Management" onClick={ this.handleClick } to="/books/management">Management</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Accounting" onClick={ this.handleClick } to="/books/accounting">Accounting</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Entrepreneurship" onClick={ this.handleClick } to="/books/entrepreneurship">Entrepreneurship</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Leadership" onClick={ this.handleClick } to="/books/leadership">Leadership</Link> </div>
            </li>

            <li> <div className="collapsible-header"> <Link className="heada" onClick={ this.handleCollapse } ><b>PERSONAL GROWTH</b></Link> </div>
              <div className="collapsible-body"> <Link className="boda" name="Psychology" onClick={ this.handleClick } to="/books/psychology">Psychology</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Relationships" onClick={ this.handleClick } to="/books/relationship">Relationships</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Self-Improvement" onClick={ this.handleClick } to="/books/link">Self-Improvement</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Religion" onClick={ this.handleClick } to="/books/religion">Religion</Link> </div>
            </li>

            <li> <div className="collapsible-header"> <Link className="heada" onClick={ this.handleCollapse } ><b>HEALTH & FITNESS</b></Link> </div>
              <div className="collapsible-body"> <Link className="boda" name="Fitness" onClick={ this.handleClick } to="/books/fitness">Fitness</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Nutrition" onClick={ this.handleClick } to="/books/nutrition">Nutrition</Link> </div>

              <div className="collapsible-body"> <Link className="boda" name="Sports" onClick={ this.handleClick } to="/books/sports">Sports</Link> </div>
            </li>


          </ul>

        </div>
      </div >
    );
  }
}

SideBar.propTypes = {
  data: PropTypes.array.isRequired,
  showbooksByCategory: PropTypes.func.isRequired,

};

export default SideBar;

