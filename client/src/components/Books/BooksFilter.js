import React from 'react';
import PropTypes from 'prop-types';


import SearchBar from '../SearchBar';
import BooksCollection from './BooksCollection';
import MembershipSelect from '../select/MembershipSelect';

let actuator = false;

/**
 * 
 * 
 * @class BooksFilter
 * @extends {React.Component}
 */
class BooksFilter extends React.Component {
  /**
   * Creates an instance of BooksFilter.
   * @param {any} props 
   * @memberof BooksFilter
   */
  constructor(props) {
    super(props);
    this.state = {
      filterBy: '',
      searchText: '',
      error: '',
      pointer: false
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleSelected = this.handleChange.bind(this);
  }

  /**
   * 
   * 
   * @memberof BooksFilter
   */
  componentWillMount() {
    actuator = false;
  }

  /**
   * 
   * 
   * @param {any} e 
   * @memberof BooksFilter
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.value.length > 3 && this.state.filterBy !== '') {
      actuator = true;
      this.setState({ error: '' });
      if (this.state.filterBy && this.state.searchText && this.props.data) {
        this.props.searchbooks(this.state.filterBy, this.state.searchText, this.props.data);
        this.setState({ pointer: true });
      }
    }
  }

  /**
   * 
   * 
   * @param {any} e 
   * @memberof BooksFilter
   */
  handleSelected(e) {
    actuator = false;
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * 
   * 
   * @returns 
   * @memberof BooksFilter
   */
  render() {
    if (this.props.filteredData.length === 0) {
      actuator = false;
    }
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
            <SearchBar
              onChange={ this.handleChange }
              name="searchText" value={ this.state.searchText }
            />
          </div>
        </div >
        <div className="row">
          {this.props.filteredData.length !== 0 && actuator && <BooksCollection checkBookDetails={ this.props.checkBookDetails } heading={ 'Search results' } data={ this.props.filteredData } />}
          {this.props.filteredData.length === 0 && actuator === false && this.state.pointer && <BooksCollection heading={ 'No search results' } data={ this.props.filteredData } />}
        </div>
      </div >
    );
  }
}

BooksFilter.propTypes = {
  checkBookDetails: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  filteredData: PropTypes.array.isRequired,
  searchbooks: PropTypes.func.isRequired,

};


export default BooksFilter;

