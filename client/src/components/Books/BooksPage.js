import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BooksPhoto from './BooksPhoto';
import '../../../public/scss/materialize.scss';
import SideBar from '../SideBar';
import BooksFilter from './BooksFilter';
import getbooks from '../../actions/getBooks';
import BooksCollection from './BooksCollection';
import BooksCategory from './BooksCategory';


class BooksPage extends React.Component {
  componentWillMount() {
    if (!this.props.isFetched) {
      this.props.getbooks(false);
    }

    localStorage.removeItem('bookId');
    localStorage.removeItem('id');

    localStorage.removeItem('category');
    localStorage.removeItem('isbn');
    localStorage.removeItem('stocknumber');
    localStorage.removeItem('author');
    localStorage.removeItem('summary');
    localStorage.removeItem('bookTitle');
    localStorage.removeItem('image');
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
              {this.props.isFetched && <BooksFilter data={ this.props.data } />}
              {this.props.isFetched && <BooksCategory data={ this.props.categoryData } />}
              {this.props.isFetched && <BooksPhoto data={ this.props.data } />}
              {this.props.isFetched && <BooksCollection heading={ 'Available books' } data={ this.props.data } />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BooksPage.propTypes = {


};


function mapStateToProps(state) {
  return {
    isFetched: state.books[0].isFetched,
    data: state.books[0].data,
    categoryData: state.category,
  };
}

export default connect(mapStateToProps, { getbooks })(BooksPage);
