import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BooksPhoto from './BooksPhoto';
import '../../../public/scss/materialize.scss';
import SideBar from '../SideBar';
import SearchBar from '../SearchBar';
import getbooks from '../../actions/getBooks';
import BooksCollection from './BooksCollection';


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
            {this.props.isFetched && <BooksPhoto data={ this.props.data } />}
            {this.props.isFetched && <SearchBar />}
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
