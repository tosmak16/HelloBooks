import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar';
import searchbooks from '../../actions/searchbooks';

class BooksFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: '',
      searchText: '',
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleSelected = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length > 3 && this.state.filterBy !== '') {
      this.setState({ error: '' });
      searchbooks(this.state.filterBy, this.state.searchText, this.props.data);
    }
  }

  handleSelected(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    return (
      <div id="booksearchbar" className="container-fluid">
        <div className="row">
          <div className="col l3  offset-l2  col m3  offset-m2  col s12 ">
            <select
              className="browser-default input-field"
              name="filterBy"
              onChange={ this.handleSelected }
              value={ this.state.filterBy }
            >
              <option defaultValue="" disabled>Search by</option>
              <option value="bookTitle">Title</option>
              <option value="author">Author</option>
              <option value="category">Category</option>
              <option value="isbn">ISBN</option>
            </select>
          </div>
          <div className="col l6 col m6 col s12 ">
            <SearchBar onChange={ this.handleChange } name="searchText" value={ this.state.searchText } />
          </div>
        </div >
      </div >
    );
  }
}

BooksFilter.propTypes = {

};

export default BooksFilter;


// name="membershipType"
// id="inputSignUpselect"
// onChange={this.handleChange}
// value={ this.state.membershipType }
