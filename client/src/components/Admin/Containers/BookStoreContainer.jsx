import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import _ from 'lodash';
import BookStorePage from '../BookStorePage';
import AdminSidebar from '../AdminSidebar';
import getbooks from '../../../actions/getBooks';
import { deleteBook } from '../../../actions/deleteBooks';
import refreshPage from '../../../actions/refreshPage';
import searchbooks from '../../../actions/searchbooks';
import { getbooksReponse } from '../../../../actions/getBooks';
import store from '../../../../index';
import { logout } from '../../../actions/logoutAction';


/**
 * @class BookStoreContainer
 * @extends {React.Component}
 */
class BookStoreContainer extends React.Component {
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
      displayPreloader: 'none',
      filterBookLoaded: false,
      bookData: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelected = this.handleChange.bind(this);
  }
  /**
   * @memberof BookStoreContainer
   * @returns {void}
   */
  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.getbooks(true);
    }
    $(document).ready(() => {
      $('.modal').modal();
    });
  }
  /**
   * @param {object} nextProps
   * @memberof BookStorePage
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.isFetched) {
      this.setState({
        bookData: nextProps.bookData
      });
    }
    const sortedData = nextProps.deleteBookResponse[0];
    if (this.state.serverResponded) {
      if (!_.isEmpty(sortedData.error) && this.state.serverResponded) {
        $('#modal2').modal('open');
        this.setState({
          serverResponded: false,
          errors: sortedData.error,
        });
      } else if (!_.isEmpty(sortedData.response) && this.state.serverResponded) {
        const bookIndex = _.findIndex(this.state.bookData, ['id', Number(this.state.bookId)]);
        const newBookData = this.state.bookData;
        this.state.bookData = [...newBookData.slice(0, bookIndex),
          ...newBookData.slice(bookIndex + 1)];
        store.dispatch(getbooksReponse(this.state.bookData));
        $('#modal3').modal('open');
        this.setState({
          serverResponded: false,
          message: sortedData.response,
        });
      }
    }
    if (nextProps.isRefreshed) {
      this.props.refreshPage(false);
      this.setState({
        displayPreloader: 'block'
      });
      this.props.searchbooks('bookTitle', '', []);
    } this.setState({
      displayPreloader: 'none'
    });
  }
  /**
 * @param {object} event
 * @memberof BookStorePage
 * @returns {void}
 */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value.length > 3 && this.state.filterBy !== '') {
      this.setState({
        error: '',
        filterBookLoaded: true
      });
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
    this.setState({
      bookId: event.target.name
    });
    $('#modal1').modal('open');
  }

  /**
   * @param {object} event
   * @memberof BookStorePage
   * @returns {void}
   */
  handleYes(event) {
    event.preventDefault();
    this.props.deleteBook(this.state.bookId, localStorage.jwtToken);
    this.setState({
      serverResponded: true,
      displayPreloader: 'block'
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
   * @returns {void}
   * @memberof BookStoreContainer
   */
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <AdminSidebar
              logout={this.props.logout}
            />
            <BookStorePage
              filteredData={this.props.filteredData}
              handleChange={this.handleChange}
              handleDelete={this.handleDelete}
              handleExit={this.handleExit}
              handleNo={this.handleNo}
              handleSelected={this.handleSelected}
              handleYes={this.handleYes}
              state={this.state}
            />
          </div>
        </div>
      </div>
    );
  }
}

BookStoreContainer.propTypes = {
  bookData: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteBook: PropTypes.func.isRequired,
  filteredData: PropTypes.arrayOf(PropTypes.any).isRequired,
  getbooks: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  deleteBookResponse: PropTypes.arrayOf(PropTypes.any).isRequired,
  refreshPage: PropTypes.func.isRequired,
  searchbooks: PropTypes.func.isRequired,
};

/**
 * @param {arrayOfObject} state
 * @returns {object} of some redux state
 */
const mapStateToProps = function mapStateToProps(state) {
  return {
    bookData: state.books[0].data,
    filteredData: state.getFilteredBooks[0].filteredData,
    isRefreshed: state.refreshPage[0].isRefreshed,
    deleteBookResponse: state.deleteBooks,
    isFetched: state.books[0].isFetched,
  };
};

export default connect(mapStateToProps, {
  getbooks,
  deleteBook,
  refreshPage,
  searchbooks,
  logout,
})(BookStoreContainer);
