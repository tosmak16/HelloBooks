import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { browserHistory } from 'react-router';

import TableRow from './TableRow';
import DoubleActionModal from '../modal/DoubleActionModal';
import { deleteBook } from '../../actions/deleteBooks';
import SingleActionModal from '../modal/SingleActionModal';
import getbooks from '../../actions/getBooks';
import refreshPage from '../../actions/refreshPage';
import MembershipSelect from '../select/MembershipSelect';
import SearchBar from '../SearchBar';
import searchbooks from '../../actions/searchbooks';


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

  handleExit(e) {
    e.preventDefault();

    document.getElementById('modal2').style.display = 'none';
    document.getElementById('modal3').style.display = 'none';

    setTimeout(() => { this.props.refreshPage(true); }, 2000);

    // this.props.refreshPage(true);
  }
  handleDelete(e) {
    e.preventDefault();
    this.setState({
      bookId: e.target.name,
    });
    document.getElementById('modal1').style.display = 'block';
  }

  handleYes(e) {
    e.preventDefault();
    this.props.deleteBook(this.state.bookId);
    this.setState({
      pointer: true,
    });
    document.getElementById('modal1').style.display = 'none';
  }
  handleNo(e) {
    e.preventDefault();
    document.getElementById('modal1').style.display = 'none';
  }

  componentWillReceiveProps(nextProps) {
    sortedData = nextProps.item[0];
    if (this.state.pointer) {
      if (!lodash.isEmpty(sortedData.error) && this.state.pointer) {
        document.getElementById('modal2').style.display = 'block';
        this.setState({
          pointer: false,
          errors: sortedData.error,
        });
      } else if (!lodash.isEmpty(sortedData.response) && this.state.pointer) {
        document.getElementById('modal3').style.display = 'block';
        this.setState({
          pointer: false,
          message: sortedData.response,
        });
      }
    }
    if (nextProps.isRefreshed) {
      this.props.refreshPage(false);
      this.props.getbooks(true);
    }
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

  deleteBook: PropTypes.func.isRequired,
  getbooks: PropTypes.func.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  refreshPage: PropTypes.func.isRequired,

};

function mapStateToProps(state) {
  return {
    filteredData: state.getFilteredBooks[0].filteredData,
    isRefreshed: state.refreshPage[0].isRefreshed,
    item: state.deleteBooks,
  };
}
export default connect(mapStateToProps, { deleteBook, getbooks, refreshPage, searchbooks })(BookStorePage);

// <td><button type="button" className=" btn-danger btn-sm deletebtn">Delete</button></td>
