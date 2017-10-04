import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BookStorePage from './BookStorePage';
import AdminSidebar from './AdminSidebar';
import UploadBooksPage from './UploadBooksPage';
import UpdateBooksPage from './UpdateBooksPage';
import getbooks from '../../actions/getBooks';

class AdminPage extends React.Component {
  componentWillMount() {
    if (!this.props.isFetched) {
      this.props.getbooks(true);
    }
  }
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <AdminSidebar />
            <BookStorePage data={ this.props.data } />
            <UploadBooksPage />
            <UpdateBooksPage data={ this.props.data } />
          </div>
        </div>
      </div>
    );
  }
}

AdminPage.propTypes = {
  data: PropTypes.array.isRequired,
  getbooks: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired
};


function mapStateToProps(state) {
  return {
    isFetched: state.books[0].isFetched,
    data: state.books[0].data,
  };
}

export default connect(mapStateToProps, { getbooks })(AdminPage);
