import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import getUserdetails from '../../actions/getUserDetails';
import DashboardSidebar from './DashboardSidebar';
import BorrowedbooksTable from './BorrowedbooksTable';
import BookHistoryTable from './BookHistoryTable';
import UserProfile from './UserProfile';
import ChangePasswordPage from './ChangePasswordPage';
import refreshPage from '../../actions/refreshPage';


class DashboardPage extends React.Component {
  componentWillMount() {
    if (isEmpty(this.props.userData)) {
      this.props.getUserdetails();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.isRefreshed) {
      this.props.refreshPage(false);
      this.props.getUserdetails();
    }
  }
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <DashboardSidebar />
            <BorrowedbooksTable />
            <UserProfile data={ this.props.userData } error={ this.props.userDataError } />
            <BookHistoryTable />
            <ChangePasswordPage />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.UserDetails[0].data,
    userDataError: state.UserDetails[0].error,
    isRefreshed: state.refreshPage[0].isRefreshed,
    image: state.userProfileImage[0].response
  };
}

export default connect(mapStateToProps, { getUserdetails, refreshPage })(DashboardPage);
