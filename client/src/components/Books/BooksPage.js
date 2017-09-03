import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BooksPhoto from './BooksPhoto';
import '../../../public/scss/materialize.scss';
import SideBar from '../SideBar';
import SearchBar from '../SearchBar';
import BooksFilter from './BooksFilter';
import getbooks from '../../actions/getBooks';
import BooksCollection from './BooksCollection';
import BooksCategory from './BooksCategory';


class BooksPage extends React.Component {
  componentWillMount() {
    if (!this.props.isFetched) {
      this.props.getbooks();
    }
  }


  render() {
    return (
      <div className="">
        <div className="row">
          <div className="">
            <SideBar />
          </div>
          <div id="book_body" className="">
            <div className="row">
              {this.props.isFetched && <BooksPhoto data={ this.props.data } />}
              {this.props.isFetched && <BooksCategory />}
              {this.props.isFetched && <BooksFilter data={ this.props.data } />}
              {this.props.isFetched && <BooksCollection heading={ 'Available books' } data={ this.props.data } />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BooksPage.propTypes = {
  getbooks: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired,


};


function mapStateToProps(state) {
  return {
    isFetched: state.books.isFetched,
    data: state.books.data
  };
}

export default connect(mapStateToProps, { getbooks })(BooksPage);
