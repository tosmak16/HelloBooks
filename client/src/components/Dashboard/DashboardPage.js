import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import BorrowedbooksTable from './BorrowedbooksTable';
import BookHistoryTable from './BookHistoryTable';
import UserProfile from './UserProfile';
import ChangePasswordPage from './ChangePasswordPage';

class DashboardPage extends React.Component {
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <DashboardSidebar />
            <BorrowedbooksTable />
            <UserProfile />
            <BookHistoryTable />
            <ChangePasswordPage />
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
