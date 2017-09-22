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

let tablerow = '';
let co = '';
class BorrowedbooksTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: '',
      bookId: '',
      error: '',
      pointer: false,
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

    setTimeout(() => { this.props.refreshPage(true); }, 2000);

    // this.props.refreshPage(true);
  }

  handleYes(e) {
    e.preventDefault();
    this.props.returnbook(this.state);
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
      this.props.getunreturnedBooks();
    }

    if (isEmpty(this.props.bookData)) {
      this.props.getbooks(true);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.errors) && this.state.pointer) {
      document.getElementById('modal2').style.display = 'block';
      this.setState({
        pointer: false,
      });
    } else if (!isEmpty(nextProps.message) && this.state.pointer) {
      document.getElementById('modal3').style.display = 'block';
      this.setState({
        pointer: false,
      });
    }
    if (nextProps.isRefreshed) {
      this.props.refreshPage(false);
      this.props.getunreturnedBooks();
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
            message={ this.props.message ? this.props.message : '' }
            onHandleExit={ this.handleExit }
          />
          <SingleActionModal
            id={ 'modal2' } heading={ 'Oh!' }
            message={ this.props.errors ? this.props.errors : '' }
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
  getbooks: PropTypes.func.isRequired,
  getunreturnedBooks: PropTypes.func.isRequired,
  refreshPage: PropTypes.func.isRequired,
  returnbook: PropTypes.func.isRequired,

};

function mapStateToProps(state) {
  return {
    error: state.getunreturnedBooks.error,
    data: state.getunreturnedBooks.data,
    bookData: state.books.data,
    errors: state.returnBooks.error,
    message: state.returnBooks.response,
    isRefreshed: state.refreshPage.isRefreshed
  };
}

export default connect(mapStateToProps, { getunreturnedBooks, getbooks, returnbook, refreshPage })(BorrowedbooksTable);
