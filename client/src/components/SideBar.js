import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';

class SideBar extends React.Component {
  render() {
    return (
      <div className="row">
        <div id="sidenava" className="col s12 col m2 col l2 sidebar ">
          <Collapsible accordion>
            <CollapsibleItem header={ <li><a className="heada" href="#"><b>SCIENCE&TECH</b></a></li> } >
              <li><a className="boda" href="#">Science</a></li>
              <hr />
              <li><a className="boda" href="#">Tech</a></li>
              <hr />
              <li><a className="boda" href="#">Computer</a></li>
            </CollapsibleItem>
            <hr />
            <CollapsibleItem header={ <li><a className="heada" href="#"><b>LITERATURE</b></a></li> } >
              <li><a className="boda" href="">Fiction</a></li>
              <hr />
              <li><a className="boda" href="">Mystery</a></li>
              <hr />
              <li><a className="boda" href="">Romance</a></li>
              <hr />
              <li><a className="boda" href="">Science Fiction</a></li>
              <hr />
              <li><a className="boda" href="">Adventure</a></li>
              <hr />
              <li><a className="boda" href="">Action</a></li>
            </CollapsibleItem>
            <hr />
            <CollapsibleItem header={ <li><a className="heada" href="#"><b>LIFE STYLE</b></a></li> } >
              <li><a className="boda" href="">Arts and Languages</a></li>
              <hr />
              <li><a className="boda" href="">Fashion and beauty</a></li>
              <hr />
              <li><a className="boda" href="">Food</a></li>
              <hr />
              <li><a className="boda" href="">Games</a></li>
            </CollapsibleItem>
            <hr />
            <CollapsibleItem header={ <li><a className="heada" href="#"><b>CAREER & MONEY</b></a></li> } >
              <li><a className="boda" href="">Management</a></li>
              <hr />
              <li><a className="boda" href="">Accounting</a></li>
              <hr />
              <li><a className="boda" href="">Entrepreneurship</a></li>
              <hr />
              <li><a className="boda" href="">Leadership</a></li>
            </CollapsibleItem>
            <hr />
            <CollapsibleItem header={ <li><a className="heada" href="#"><b>PERSONAL GROWTH</b></a></li> } >
              <li><a className="boda" href="">Psychology</a></li>
              <hr />
              <li><a className="boda" href="">Relationships</a></li>
              <hr />
              <li><a className="boda" href="">Self-Improvement</a></li>
              <hr />
              <li><a className="boda" href="">Religion</a></li>
            </CollapsibleItem>
            <hr />
            <CollapsibleItem header={ <li><a className="heada" href="#"><b>HEALTH & FITNESS</b></a></li> } >
              <li><a className="boda" href="">Fitness</a></li>
              <hr />
              <li><a className="boda" href="">Nutrition</a></li>
              <hr />
              <li><a className="boda" href="">Sports</a></li>
            </CollapsibleItem>
            <hr />

          </Collapsible>

        </div>
      </div >
    );
  }
}

export default SideBar;
