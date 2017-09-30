import React from 'react';
import isEmpty from 'lodash/isEmpty';
import filterBy from 'lodash/filter';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import getunreturnedBooks from '../../actions/getunreturnedBooks';
import getbooks from '../../actions/getBooks';
import BbTableRow from './BbTableRow';
import DoubleActionModal from '../modal/DoubleActionModal';
import SingleActionModal from '../modal/SingleActionModal';
import returnbook from '../../actions/returnBooks';
import refreshPage from '../../actions/refreshPage';
import getborrowedBooks from '../../actions/getborrowedBooks';


let tablerow = '';
let co = '';

let sortedData = '';
class BorrowedbooksTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: '',
      bookId: '',
      error: '',
      pointer: false,
      errors: '',
      message: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }
  handleClick(e) {
    e.preventDefault();

    co = e.target.name;
    const Id = co.slice(0, co.search(','));
    const bookId = co.slice(-1);
    this.setState({
      bookId,
      Id
    });
    document.getElementById('modal1').style.display = 'block';
  }

  handleExit(e) {
    e.preventDefault();

    document.getElementById('modal2').style.display = 'none';
    document.getElementById('modal3').style.display = 'none';

    // setTimeout(() => { this.props.refreshPage(true); }, 2000);

    this.props.refreshPage(true);
  }

  handleYes(e) {
    e.preventDefault();
    this.props.returnbook(this.state, localStorage.jwtToken);
    this.setState({
      pointer: true,
    });
    document.getElementById('modal1').style.display = 'none';
  }
  handleNo(e) {
    e.preventDefault();
    document.getElementById('modal1').style.display = 'none';
  }
  componentWillMount() {
    if (isEmpty(this.props.data)) {
      this.props.getunreturnedBooks(localStorage.jwtToken);
    }

    if (isEmpty(this.props.bookData)) {
      this.props.getbooks(true);
    }
  }
  componentWillReceiveProps(nextProps) {
    sortedData = nextProps.item[0];
    if (this.state.pointer) {
      if (!isEmpty(sortedData.error) && this.state.pointer) {
        document.getElementById('modal2').style.display = 'block';
        this.setState({
          pointer: false,
          errors: sortedData.error,
        });
      } else if (!isEmpty(sortedData.response) && this.state.pointer) {
        document.getElementById('modal3').style.display = 'block';
        this.setState({
          pointer: false,
          message: sortedData.response,
        });
      }
    }
    if (nextProps.isRefreshed) {
      this.props.refreshPage(false);
      this.props.getunreturnedBooks(localStorage.jwtToken);
      this.props.getborrowedBooks(localStorage.jwtToken);
      // this.props.getbooks(true);
    }
  }
  render() {
    if (this.props.data) {
      const { data } = this.props;
      tablerow = data.map(row =>
        (<BbTableRow
          key={ row.id }
          row={ row }
          value={ row.id }
          bookItem={ filterBy(this.props.bookData, ['id', row.bookId]) }
          onHandleClick={ this.handleClick }
        />)
      );
    }
    return (
      <div id="bb_table" className="row">
        <div className="  col l10 offset-l2 col m10 offset-m2 col s12">
          <h4 className="sub-header"> Currently Reads</h4>
          <div className="responsive-table">
            <table className="table responsive-table bordered highlight striped">
              <thead>
                <tr>
                  <th><span className="glyphicon glyphicon-education" /></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>ISBN</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tablerow}
              </tbody>
            </table>
          </div>


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
            heading={ 'Do you want to return this book?' }
          />
        </div>
      </div>
    );
  }
}

BorrowedbooksTable.propTypes = {
  bookData: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  getbooks: PropTypes.func.isRequired,
  getborrowedBooks: PropTypes.func.isRequired,
  getunreturnedBooks: PropTypes.func.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  item: PropTypes.array.isRequired,
  refreshPage: PropTypes.func.isRequired,
  returnbook: PropTypes.func.isRequired,


};

function mapStateToProps(state) {
  return {
    data: state.getunreturnedBooks[0].data,
    bookData: state.books[0].data,
    isRefreshed: state.refreshPage[0].isRefreshed,
    item: state.returnBooks,
  };
}

export default connect(mapStateToProps, { getborrowedBooks, getunreturnedBooks, getbooks, returnbook, refreshPage })(BorrowedbooksTable);
