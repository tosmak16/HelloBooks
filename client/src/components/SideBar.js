import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapsible, CollapsibleItem } from 'react-materialize';

import showbooksByCategory from '../actions/showbooksByCategory';

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.showbooksByCategory(e.target.name, this.props.data);
  }
  render() {
    return (
      <div className="row">
        <div id="sidenava" className="col s12 col m2 col l2 sidebar ">
          <Collapsible accordion>
            <CollapsibleItem header={ <a className="heada" href="#"><b>SCIENCE&TECH</b></a> } >
              <a className="boda" name="Science" onClick={ this.handleClick } href="#">Science</a>
              <hr />
              <a className="boda" name="Technology" onClick={ this.handleClick } href="#">Technology</a>
              <hr />
              <a className="boda" name="Computer" onClick={ this.handleClick } href="#">Computer</a>
            </CollapsibleItem>
            <hr />
            <CollapsibleItem header={ <a className="heada" href="#"><b>LITERATURE</b></a> } >
              <a className="boda" name="Fiction" onClick={ this.handleClick } href="#">Fiction</a>
              <hr />
              <a className="boda" name="Mystery" onClick={ this.handleClick } href="#">Mystery</a>
              <hr />
              <a className="boda" name="Romance" onClick={ this.handleClick } href="#">Romance</a>
              <hr />
              <a className="boda" name="Sci-Fiction" onClick={ this.handleClick } href="#">Sci-Fiction</a>
              <hr />
              <a className="boda" name="Adventure" onClick={ this.handleClick } href="#">Adventure</a>
              <hr />
              <a className="boda" name="Action" onClick={ this.handleClick } href="#">Action</a>
            </CollapsibleItem>
            <hr />
            <CollapsibleItem header={ <a className="heada" href="#"><b>STYLE AND ART</b></a> } >
              <a className="boda" name="Arts" onClick={ this.handleClick } href="#">Arts</a>
              <hr />
              <a className="boda" name="Languages" onClick={ this.handleClick } href="#">Languages</a>
              <hr />
              <a className="boda" name="Fashion" onClick={ this.handleClick } href="#">Fashion</a>
              <hr />
              <a className="boda" name="Food" onClick={ this.handleClick } href="#">Food</a>
              <hr />
              <a className="boda" name="Games" onClick={ this.handleClick } href="#">Games</a>
              <hr />
              <a className="boda" name="Music" onClick={ this.handleClick } href="#">Music</a>
            </CollapsibleItem>
            <hr />
            <CollapsibleItem header={ <a className="heada" href="#"><b>CAREER & MONEY</b></a> } >
              <a className="boda" name="Management" onClick={ this.handleClick } href="#">Management</a>
              <hr />
              <a className="boda" name="Accounting" onClick={ this.handleClick } href="#">Accounting</a>
              <hr />
              <a className="boda" name="Entrepreneurship" onClick={ this.handleClick } href="#">Entrepreneurship</a>
              <hr />
              <a className="boda" name="Leadership" onClick={ this.handleClick } href="#">Leadership</a>
            </CollapsibleItem>
            <hr />
            <CollapsibleItem header={ <a className="heada" href="#"><b>PERSONAL GROWTH</b></a> } >
              <a className="boda" name="Psychology" onClick={ this.handleClick } href="#">Psychology</a>
              <hr />
              <a className="boda" name="Relationships" onClick={ this.handleClick } href="#">Relationships</a>
              <hr />
              <a className="boda" name="Self-Improvement" onClick={ this.handleClick } href="#">Self-Improvement</a>
              <hr />
              <a className="boda" name="Religion" onClick={ this.handleClick } href="#">Religion</a>
            </CollapsibleItem>
            <hr />
            <CollapsibleItem header={ <a className="heada" href="#"><b>HEALTH & FITNESS</b></a> } >
              <a className="boda" name="Fitness" onClick={ this.handleClick } href="#">Fitness</a>
              <hr />
              <a className="boda" name="Nutrition" onClick={ this.handleClick } href="#">Nutrition</a>
              <hr />
              <a className="boda" name="Sports" onClick={ this.handleClick } href="#">Sports</a>
            </CollapsibleItem>
            <hr />

          </Collapsible>

        </div>
      </div >
    );
  }
}

SideBar.propTypes = {
  showbooksByCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.books.data
});
export default connect(mapStateToProps, { showbooksByCategory })(SideBar);
