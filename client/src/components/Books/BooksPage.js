import React from 'react';
import BooksPhoto from './BooksPhoto';
// import '../../../public/scss/books.scss';
import '../../../public/scss/materialize.scss';
import SideBar from '../SideBar';
import SearchBar from '../SearchBar';
import BooksList from './BooksList';

class BooksPage extends React.Component {
  render() {
    return (
      <div>
        <div className="container-fluid ">
          <SideBar />
        </div>
        <div className="container">
          <div className="row">
            <BooksPhoto />
            <SearchBar />
            <BooksList />
          </div>
        </div>
      </div>
    );
  }
}

export default BooksPage;
