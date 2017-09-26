import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchBar from '../SearchBar';
import searchbooks from '../../actions/searchbooks';
import BooksCollection from './BooksCollection';
import MembershipSelect from '../select/MembershipSelect';

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
      this.props.searchbooks(this.state.filterBy, this.state.searchText, this.props.data);
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
            <MembershipSelect
              onHandleSelected={ this.handleSelected }
              value={ this.state.filterBy }
            />
          </div>
          <div className="col l6 col m6 col s12 ">
            <SearchBar onChange={ this.handleChange } name="searchText" value={ this.state.searchText } />
          </div>
        </div >
        <div className="row">
          {this.props.filteredData && <BooksCollection heading={ 'Search results' } data={ this.props.filteredData } />}
        </div>
      </div >
    );
  }
}

BooksFilter.propTypes = {


};

function mapStateToProps(state) {
  return {
    filteredData: state.getFilteredBooks[0].filteredData
  };
}


export default connect(mapStateToProps, { searchbooks })(BooksFilter);


// name="membershipType"
// id="inputSignUpselect"
// onChange={this.handleChange}
// value={ this.state.membershipType }
