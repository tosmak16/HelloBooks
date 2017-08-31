import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BooksPhoto from './BooksPhoto';
import '../../../public/scss/materialize.scss';
import SideBar from '../SideBar';
import SearchBar from '../SearchBar';
import BooksList from './BooksList';
import getbooks from '../../actions/getBooks';


class BooksPage extends React.Component {
  componentWillMount() {
    if (!this.props.isFetched) {
      this.props.getbooks();
    }
  }


  render() {
    return (
      <div>
        <div className="container-fluid ">
          <SideBar />
        </div>
        <div className="container">
          <div className="row">
            {this.props.isFetched && <BooksPhoto />}
            {this.props.isFetched && <SearchBar />}
            {this.props.isFetched && <BooksList products={ this.props.data } />}
          </div>
        </div>
      </div>
    );
  }
}

BooksPage.propTypes = {
  getbooks: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,

};


function mapStateToProps(state) {
  return {
    isFetched: state.books.isFetched,
    data: state.books.data
  };
}

export default connect(mapStateToProps, { getbooks })(BooksPage);
