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


class BooksPage extends React.Component {
  componentWillMount() {
    if (!this.props.isFetched) {
      this.props.getbooks();
    }
  }


  render() {
    // const filterBy = 'bookTitle';
    // const searchText = 'The late'.toUpperCase();
    // const z = [];
    // data.forEach((element) => {
    //   z.push(element.bookTitle);
    // }, this);

    // const c = z;
    // const x = c.toString().search(searchText);
    // const y = c.toString().slice(x, -1).toString().search(',');
    // const k = c.toString().slice(x, x + y);
    // const sortedData = lodash.orderBy(data, 'createdAt', 'desc');

    // const s = lodash.filter(sortedData, [filterBy, k]);
    // console.log(s);
    return (
      <div>
        <div className="container-fluid ">
          <SideBar />
        </div>
        <div id="book_body" className="">
          <div className="row">
            {this.props.isFetched && <BooksPhoto data={ this.props.data } />}
            {this.props.isFetched && <BooksFilter data={ this.props.data } />}
            {this.props.isFetched && <BooksCollection data={ this.props.data } />}
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
