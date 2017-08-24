import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <div id="booksearchbar" className="container-fluid">
        <div className="row">
          <div className="col l8  offset-l2  col m8  offset-m2  col s12 ">
            <form>
              <div className="input-field">
                <input id="search" type="search" required />
                <label className="label-icon" htmlFor="search">
                  <i className="material-icons">search</i></label>
              </div>
            </form>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}


export default SearchBar;
