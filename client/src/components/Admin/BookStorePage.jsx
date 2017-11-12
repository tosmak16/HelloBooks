import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import $ from 'jquery';

import TableRow from './TableRow';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import CategorySelect from '../select/CategorySelect';
import SearchBar from '../SearchBar';
import ActivityLoader from '../preloader/ActivityLoader';


let tablerow = '';
let tableholder = '';
let sortedData = '';
let filterBookLoaded = false;
let displayPreloader = 'none';

/**
 * @class BookStorePage
 * @extends {React.Component}
 */
class BookStorePage extends React.Component {
  /**
   * Creates an instance of BookStorePage.
   * @param {object} props
   * @memberof BookStorePage
   */
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.state = {
      bookId: '',
      filterBy: '',
      searchText: '',
      error: '',
      serverResponded: false,
      errors: '',
      message: '',
      errorFix: true,
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleSelected = this.handleChange.bind(this);
  }

  /**
   * @memberof BookStorePage
   * @returns {void}
   */
  componentWillMount() {
    filterBookLoaded = false;
  }

  /**
   * @param {object} nextProps
   * @memberof BookStorePage
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    sortedData = nextProps.deleteBookResponse[0];
    if (this.state.serverResponded) {
      if (!lodash.isEmpty(sortedData.error) && this.state.serverResponded) {
        $('#modal2').modal('open');
        this.setState({
          serverResponded: false,
          errors: sortedData.error,
        });
      } else if (!lodash.isEmpty(sortedData.response) && this.state.serverResponded) {
        $('#modal3').modal('open');
        this.setState({
          serverResponded: false,
          message: sortedData.response,
        });
      }
    }
    if (nextProps.isRefreshed) {
      this.props.refreshPage(false);
      displayPreloader = 'block';
      this.props.searchbooks('bookTitle', '', []);
      this.props.getbooks(true);
    }
    displayPreloader = 'none';
  }
  /**
   * @param {object} event
   * @memberof BookStorePage
   * @returns {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value.length > 3 && this.state.filterBy !== '') {
      this.setState({ error: '' });
      filterBookLoaded = true;
      this.props.searchbooks(this.state.filterBy, this.state.searchText, this.props.bookData
      );
    }
  }
  /**
   * @param {object} event
   * @memberof BookStorePage
   * @returns {void}
   */
  handleSelected(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param {object} event
   * @memberof BookStorePage
   * @returns {void}
   */
  handleExit(event) {
    event.preventDefault();
    $('#modal2').modal('close');
    $('#modal3').modal('close');
    setTimeout(() => { this.props.refreshPage(true); }, 1000);
  }
  /**
   * @param {object} event
   * @memberof BookStorePage
   * @returns {void}
   */
  handleDelete(event) {
    filterBookLoaded = false;
    this.setState({
      bookId: event.target.name,
    });
    $('#modal1').modal('open');
  }

  /**
   * @param {object} event
   * @memberof BookStorePage
   * @returns {void}
   */
  handleYes(event) {
    displayPreloader = 'block';
    event.preventDefault();
    this.props.deleteBook(this.state.bookId, localStorage.jwtToken);
    this.setState({
      serverResponded: true,
    });
    $('#modal1').modal('close');
  }
  /**
   * @param {object} event
   * @memberof BookStorePage
   * @returns {void}
   */
  handleNo(event) {
    event.preventDefault();
    $('#modal1').modal('close');
    this.setState({
      errorFix: true,
    });
  }
  /**
   * @returns
   * @memberof BookStorePage
   * @returns {void}
   */
  render() {
    if (this.props.filteredData && filterBookLoaded) {
      const { filteredData } = this.props;
      tablerow = filteredData.map(book =>
        (<TableRow
          key={book.id}
          book={book}
          value={book.id}
          onDelete={this.handleDelete}
        />)
      );
      tableholder = (<div className="table-responsive">
        <table className="table responsive-table bordered highlight striped">
          <thead>
            <tr>
              <th><span className="glyphicon glyphicon-education" /></th>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>No in Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tablerow}
          </tbody>
        </table>
      </div>);
    }
    return (
      <div id="bb_table" className="row">
        <div className=" col l10 offset-l2 col m10 offset-m2 col s12">
          <div className="row">
            <div className="col l3  col m3 col s12 ">
              <CategorySelect
                onHandleSelected={this.handleSelected}
                value={this.state.filterBy}
              />
            </div>
            <div className="col l6 col m6 col s12 ">
              <SearchBar
                onChange={this.handleChange}
                name="searchText"
                value={this.state.searchText}
              />
            </div>
          </div >

          {this.props.filteredData.length !== 0 && filterBookLoaded ?
            <h4 className="sub-header">Search result</h4> : <p>.</p>}

          {this.props.filteredData.length !== 0 && filterBookLoaded && tableholder}

          <SingleActionModal
            id={'modal3'}
            heading={'Done!'}
            message={this.state.message ? this.state.message : ''}
            onHandleExit={this.handleExit}
          />
          <SingleActionModal
            id={'modal2'}
            heading={'Oh!'}
            message={this.state.errors ? this.state.errors : ''}
            onHandleExit={this.handleExit}
          />
          <DoubleActionModal
            id={'modal1'}
            onHandleClick={this.handleYes}
            onHandleClose={this.handleNo}
            bookTitle={''}
            heading={'Do you want to remove this book from store?'}
          />
          <div
            style={{ display: displayPreloader.toString() }}
            id="activity-loader-id"
            className="activity"
          >
            <ActivityLoader />
          </div>
        </div>
      </div>
    );
  }
}

BookStorePage.propTypes = {
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteBook: PropTypes.func.isRequired,
  filteredData: PropTypes.arrayOf(PropTypes.any).isRequired,
  getbooks: PropTypes.func.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  deleteBookResponse: PropTypes.arrayOf(PropTypes.any).isRequired,
  refreshPage: PropTypes.func.isRequired,
  searchbooks: PropTypes.func.isRequired,
};

export default BookStorePage;
