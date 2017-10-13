import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';

import getUserdetails from '../../../actions/getUserDetails';
import DashboardSidebar from '../DashboardSidebar';
import BookHistoryTable from '../BookHistoryTable';
import refreshPage from '../../../actions/refreshPage';
import getborrowedBooks from '../../../actions/getborrowedBooks';
import getbooks from '../../../actions/getBooks';
import updateUser from '../../../actions/updateuserDetails';
import { uploadAvatar } from '../../../actions/uploadUserAvatar';
import logout from '../../../actions/logoutAction';


/**
 * 
 * 
 * @export
 * @class DashboardPage
 * @extends {React.Component}
 */
export class DashboardPage extends React.Component {
  /**
   * 
   * @function compenentWillReceiveProps
   * @memberof DashboardPage
   */
  componentWillMount() {
    if (isEmpty(this.props.userData)) {
      this.props.getUserdetails(localStorage.jwtToken);
    }
    $(document).ready(() => {
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });
  }
  /**
   * 
   * @function render
   * @returns 
   * @memberof DashboardPage
   */
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s12 col m12 col l12">
            <DashboardSidebar
              logout={ this.props.logout }
              error={ this.props.error } imageUrl={ this.props.imageUrl }
              data={ this.props.userData } message={ this.props.message }
              updateUser={ this.props.updateUser } uploadAvatar={ this.props.uploadAvatar }
            />
            <BookHistoryTable
              bookData={ this.props.bookData } data={ this.props.bhData }
              getbooks={ this.props.getbooks } getborrowedBooks={ this.props.getborrowedBooks }
              isRefreshed={ this.props.isRefreshed } refreshPage={ this.props.refreshPage }
            />
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  bhData: PropTypes.array.isRequired,
  bookData: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  getbooks: PropTypes.func.isRequired,
  getborrowedBooks: PropTypes.func.isRequired,
  getUserdetails: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  refreshPage: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  userData: PropTypes.array.isRequired,


};

function mapStateToProps(state) {
  return {
    userData: state.UserDetails[0].data,
    isRefreshed: state.refreshPage[0].isRefreshed,
    bhData: state.getborrowedBooks[0].data,
    bookData: state.books[0].data,
    imageUrl: state.userProfileImage[0].response,
    error: state.updateUser[0].error.toString(),
    message: state.updateUser[0].data.toString(),

  };
}

export default connect(mapStateToProps, {
  getborrowedBooks,
  getbooks,
  getUserdetails,
  refreshPage,
  updateUser,
  uploadAvatar,
  logout
})(DashboardPage);
