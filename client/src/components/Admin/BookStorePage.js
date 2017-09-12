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


let pointer = false;
class BookStorePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.state = {
      bookId: '',
    };
  }
  handleExit(e) {
    e.preventDefault();

    document.getElementById('modal2').style.display = 'none';
    document.getElementById('modal3').style.display = 'none';

    setTimeout(() => { this.props.refreshPage(true); }, 3000);

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
    document.getElementById('modal1').style.display = 'none';
    pointer = true;
  }
  handleNo(e) {
    e.preventDefault();
    document.getElementById('modal1').style.display = 'none';
  }

  componentWillReceiveProps(nextProps) {
    if (!lodash.isEmpty(nextProps.error && pointer)) {
      document.getElementById('modal2').style.display = 'block';
      pointer = false;
    }
    if (!lodash.isEmpty(nextProps.message.toString()) && pointer) {
      document.getElementById('modal3').style.display = 'block';
      pointer = false;
    }
    if (nextProps.isRefreshed) {
      this.props.refreshPage(false);
      this.props.getbooks(true);
    }
  }
  render() {
    const { data } = this.props;

    const tablerow = data.map(row =>
      (<TableRow
        key={ row.id }
        row={ row }
        value={ row.id }
        onDelete={ this.handleDelete }
      />)
    );
    return (
      <div id="bb_table" className="row">
        <div className=" col l10 offset-l2 col m10 offset-m2 col s12">
          <h4 className="sub-header">Available Books</h4>
          <div className="table-responsive">
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
          </div>
          <SingleActionModal
            id={ 'modal3' } heading={ 'Done!' }
            message={ this.props.message.toString() }
            onHandleExit={ this.handleExit }
          />
          <SingleActionModal
            id={ 'modal2' } heading={ 'Oh!' }
            message={ this.props.error }
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
    error: state.deleteBooks.error,
    message: state.deleteBooks.response,
    isRefreshed: state.refreshPage.isRefreshed
  };
}
export default connect(mapStateToProps, { deleteBook, getbooks, refreshPage })(BookStorePage);

// <td><button type="button" className=" btn-danger btn-sm deletebtn">Delete</button></td>
