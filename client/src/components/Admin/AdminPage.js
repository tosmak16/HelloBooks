import React from 'react';
import BookStorePage from './BookStorePage';
import AdminSidebar from './AdminSidebar';
import UploadBooksPage from './UploadBooksPage';
import UpdateBooksPage from './UpdateBooksPage';


class AdminPage extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <AdminSidebar />
        <BookStorePage />
        <UploadBooksPage />
        <UpdateBooksPage />
      </div>
    );
  }
}


export default AdminPage;
