import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import $ from 'jquery';

import TableRow from './TableRow';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import MembershipSelect from '../select/MembershipSelect';
import SearchBar from '../SearchBar';


let tablerow = '';
let tableholder = '';
let sortedData = '';

class BookStorePage extends React.Component {
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
      pointer: false,
      errors: '',
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleSelected = this.handleChange.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    sortedData = nextProps.item[0];
    if (this.state.pointer) {
      if (!lodash.isEmpty(sortedData.error) && this.state.pointer) {
        $('#modal2').show();
        this.setState({
          pointer: false,
          errors: sortedData.error,
        });
      } else if (!lodash.isEmpty(sortedData.response) && this.state.pointer) {
        $('#modal3').show();
        this.setState({
          pointer: false,
          message: sortedData.response,
        });
      }
    }
    if (nextProps.isRefreshed) {
      console.log(this.props.data);
      this.props.refreshPage(false);
      this.props.searchbooks('bookTitle', '', []);
      this.props.getbooks(true);
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length > 3 && this.state.filterBy !== '') {
      this.setState({ error: '' });
      this.props.searchbooks(this.state.filterBy, this.state.searchText, this.props.data);
    }
  }

  handleSelected(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleExit(e) {
    e.preventDefault();

    $('#modal2').hide();
    $('#modal3').hide();

    setTimeout(() => { this.props.refreshPage(true); }, 1000);
  }
  handleDelete(e) {
    this.setState({
      bookId: e.target.name,
    });
    $('#modal1').show();
  }

  handleYes(e) {
    e.preventDefault();
    this.props.deleteBook(this.state.bookId, localStorage.jwtToken);
    this.setState({
      pointer: true,
    });
    $('#modal1').hide();
  }
  handleNo(e) {
    e.preventDefault();
    $('#modal1').hide();
  }

  render() {
    if (this.props.filteredData) {
      const { filteredData } = this.props;
      tablerow = filteredData.map(row =>
        (<TableRow
          key={ row.id }
          row={ row }
          value={ row.id }
          onDelete={ this.handleDelete }
        />)
      );

      tableholder = (<div className="table-responsive">
        <table className="table responsive-table bordered highlight striped">
          <thead>
            <tr>
              <th><span className="glyphicon glyphicon-education" /></th>
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
              <MembershipSelect
                onHandleSelected={ this.handleSelected }
                value={ this.state.filterBy }
              />
            </div>
            <div className="col l6 col m6 col s12 ">
              <SearchBar onChange={ this.handleChange } name="searchText" value={ this.state.searchText } />
            </div>
          </div >
          {!this.props.filteredData ? <p>.</p> : <h4 className="sub-header">Search result</h4>}

          {this.props.filteredData && tableholder}

          <SingleActionModal
            id={ 'modal3' } heading={ 'Done!' }
            message={ this.state.message ? this.state.message : '' }
            onHandleExit={ this.handleExit }
          />
          <SingleActionModal
            id={ 'modal2' } heading={ 'Oh!' }
            message={ this.state.errors ? this.state.errors : '' }
            onHandleExit={ this.handleExit }
          />


          <DoubleActionModal
            id={ 'modal1' }
            onHandleClick={ this.handleYes }
            onHandleClose={ this.handleNo }
            bookTitle={ '' }
            heading={ 'Do you want to remove this book from store?' }
          />
        </div>
      </div>
    );
  }
}

BookStorePage.propTypes = {
  data: PropTypes.array.isRequired,
  deleteBook: PropTypes.func.isRequired,
  filteredData: PropTypes.array.isRequired,
  getbooks: PropTypes.func.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  item: PropTypes.array.isRequired,
  refreshPage: PropTypes.func.isRequired,
  searchbooks: PropTypes.func.isRequired,
};

export default BookStorePage;
