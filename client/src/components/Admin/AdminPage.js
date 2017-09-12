import React from 'react';
import { connect } from 'react-redux';

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
            <UpdateBooksPage />
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    isFetched: state.books.isFetched,
    data: state.books.data,
  };
}

export default connect(mapStateToProps, { getbooks })(AdminPage);
