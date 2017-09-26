import React from 'react';
import SideBar from '../SideBar';
import DetailsForm from './DetailsForm';

class BookDetailsPage extends React.Component {
  render() {
    return (
      <div>
        <SideBar />
        <DetailsForm />
      </div>
    );
  }
}

export default BookDetailsPage;
