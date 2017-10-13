import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import $ from 'jquery';

import TableRow from './TableRow';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import MembershipSelect from '../select/MembershipSelect';
import SearchBar from '../SearchBar';
import ActivityLoader from '../preloader/ActivityLoader';


let tablerow = '';
let tableholder = '';
let sortedData = '';
let actuator = false;
let display = 'none';

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
      actuator: false
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleSelected = this.handleChange.bind(this);
  }


  componentWillMount() {
    actuator = false;
  }


  componentWillReceiveProps(nextProps) {
    sortedData = nextProps.item[0];
    if (this.state.pointer) {
      if (!lodash.isEmpty(sortedData.error) && this.state.pointer) {
        $('#modal2').modal('open');
        this.setState({
          pointer: false,
          errors: sortedData.error,
        });
      } else if (!lodash.isEmpty(sortedData.response) && this.state.pointer) {
        $('#modal3').modal('open');
        this.setState({
          pointer: false,
          message: sortedData.response,
        });
      }
    }
    if (nextProps.isRefreshed) {
      this.props.refreshPage(false);

      display = 'block';

      this.props.searchbooks('bookTitle', '', []);


      this.props.getbooks(true);
    }
    display = 'none';
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length > 3 && this.state.filterBy !== '') {
      this.setState({ error: '', actuator: true });
      actuator = true;
      this.props.searchbooks(this.state.filterBy, this.state.searchText, this.props.data);
    }
  }

  handleSelected(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleExit(e) {
    e.preventDefault();

    $('#modal2').modal('close');
    $('#modal3').modal('close');

    setTimeout(() => { this.props.refreshPage(true); }, 1000);
  }
  handleDelete(e) {
    actuator = false;
    this.setState({
      bookId: e.target.name,
      actuator: false
    });
    $('#modal1').modal('open');
  }

  handleYes(e) {
    display = 'block';
    e.preventDefault();
    this.props.deleteBook(this.state.bookId, localStorage.jwtToken);
    this.setState({
      pointer: true,
    });
    $('#modal1').modal('close');
  }
  handleNo(e) {
    e.preventDefault();
    $('#modal1').modal('close');
  }

  render() {
    if (this.props.filteredData && actuator) {
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
              <MembershipSelect
                onHandleSelected={ this.handleSelected }
                value={ this.state.filterBy }
              />
            </div>
            <div className="col l6 col m6 col s12 ">
              <SearchBar onChange={ this.handleChange } name="searchText" value={ this.state.searchText } />
            </div>
          </div >
          {console.log(this.props.filteredData.length === 0)}
          {this.props.filteredData.length !== 0 && actuator ? <h4 className="sub-header">Search result</h4> : <p>.</p>}

          {this.props.filteredData.length !== 0 && actuator && tableholder}

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

          <div style={{ display: display.toString() }} id="activity-loader-id" className="activity">
            <ActivityLoader />
          </div>
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
