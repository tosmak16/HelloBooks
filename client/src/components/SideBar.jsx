import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import $ from 'jquery';

/**
 * @description  Side Bar Component
 * 
 * @param {object} props 
 * 
 * @returns {views} side bar componets
 */
const SideBar = (props) => {
  /**
   * @param {object} event
   * 
   * @memberof SideBar
   * 
   * @returns {void}
   */
  const handleClick = (event) => {
    props.showbooksByCategory(event.target.name, props.bookData);
  };
  /**
   * @memberof SideBar
   * 
   * @returns {void}
   */
  const handleCollapse = () => {
    $('.collapsible').collapsible();
  };
  return (
    <div className="row">
      <div id="sidenava" className="col s12 col m2 col l2 sidebar ">
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header">
              <Link
                className="heada"
                onClick={handleCollapse}
              ><b>SCIENCE&TECH</b>
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Science"
                onClick={handleClick}
                to="/books/science"
              >Science
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Technology"
                onClick={handleClick}
                to="/books/technology"
              >Technology
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Computer"
                onClick={handleClick}
                to="/books/computer"
              >Computer
              </Link>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <Link
                className="heada"
                onClick={handleCollapse}
              ><b>LITERATURE</b>
              </Link>
            </div>

            <div className="collapsible-body">
              <Link
                className="boda"
                name="Fiction"
                onClick={handleClick}
                to="/books/fiction"
              >Fiction
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Mystery"
                onClick={handleClick}
                to="/books/mystery"
              >Mystery
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Romance"
                onClick={handleClick}
                to="/books/romance"
              >Romance
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Sci-Fiction"
                onClick={handleClick}
                to="/books/Sci-fiction"
              >Sci-Fiction
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Adventure"
                onClick={handleClick}
                to="/books/adventure"
              >Adventure
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Action"
                onClick={handleClick}
                to="/books/action"
              >Action
              </Link>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <Link
                className="heada"
                onClick={handleCollapse}
              ><b>STYLE AND ART</b>
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Arts"
                onClick={handleClick}
                to="/books/arts"
              >Arts
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Languages"
                onClick={handleClick}
                to="/books/languages"
              >Languages
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Fashion"
                onClick={handleClick}
                to="/books/fashion"
              >Fashion
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Food"
                onClick={handleClick}
                to="/books/food"
              >Food
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Games"
                onClick={handleClick}
                to="/books/games"
              >Games
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Music"
                onClick={handleClick}
                to="/books/music"
              >Music
              </Link>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <Link
                className="heada"
                onClick={handleCollapse}
              ><b>CAREER & MONEY</b>
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Management"
                onClick={handleClick}
                to="/books/management"
              >Management
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Accounting"
                onClick={handleClick}
                to="/books/accounting"
              >Accounting
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Entrepreneurship"
                onClick={handleClick}
                to="/books/entrepreneurship"
              >Entrepreneurship
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Leadership"
                onClick={handleClick}
                to="/books/leadership"
              >Leadership
              </Link>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <Link
                className="heada"
                onClick={handleCollapse}
              ><b>PERSONAL GROWTH</b>
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Psychology"
                onClick={handleClick}
                to="/books/psychology"
              >Psychology
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Relationships"
                onClick={handleClick}
                to="/books/relationship"
              >Relationships
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Self-Improvement"
                onClick={handleClick}
                to="/books/link"
              >Self-Improvement
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Religion"
                onClick={handleClick}
                to="/books/religion"
              >Religion
              </Link>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <Link
                className="heada"
                onClick={handleCollapse}
              ><b>HEALTH & FITNESS</b>
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Fitness"
                onClick={handleClick}
                to="/books/fitness"
              >Fitness
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Nutrition"
                onClick={handleClick}
                to="/books/nutrition"
              >Nutrition
              </Link>
            </div>
            <div className="collapsible-body">
              <Link
                className="boda"
                name="Sports"
                onClick={handleClick}
                to="/books/sports"
              >Sports
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div >
  );
};
SideBar.propTypes = {
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  showbooksByCategory: PropTypes.func.isRequired,
};
export default SideBar;

