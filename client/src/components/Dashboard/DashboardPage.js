import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import BorrowedbooksTable from './BorrowedbooksTable';
import BookHistoryTable from './BookHistoryTable';
import UserProfile from './UserProfile';


class DashboardPage extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <DashboardSidebar />
        <BorrowedbooksTable />
        <UserProfile />
        <BookHistoryTable />
      </div>
    );
  }
}

export default DashboardPage;
