import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import $ from 'jquery';

import getUserdetails from '../../../actions/getUserDetails';
import DashboardSidebar from '../DashboardSidebar';
import BorrowedbooksTable from '../BorrowedbooksTable';
import refreshPage from '../../../actions/refreshPage';
import getborrowedBooks from '../../../actions/getborrowedBooks';
import getbooks from '../../../actions/getBooks';
import returnbook from '../../../actions/returnBooks';
import getunreturnedBooks from '../../../actions/getunreturnedBooks';
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
            <BorrowedbooksTable
              bookData={ this.props.bookData } data={ this.props.bbData }
              getbooks={ this.props.getbooks } getborrowedBooks={ this.props.getborrowedBooks }
              isRefreshed={ this.props.isRefreshed } refreshPage={ this.props.refreshPage }
              returnbook={ this.props.returnbook }
              getunreturnedBooks={ this.props.getunreturnedBooks }
              item={ this.props.item }
            />
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  bbData: PropTypes.array.isRequired,
  bookData: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  getbooks: PropTypes.func.isRequired,
  getborrowedBooks: PropTypes.func.isRequired,
  getunreturnedBooks: PropTypes.func.isRequired,
  getUserdetails: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isRefreshed: PropTypes.bool.isRequired,
  item: PropTypes.array.isRequired,
  logout: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  refreshPage: PropTypes.func.isRequired,
  returnbook: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  userData: PropTypes.array.isRequired,


};

/**
 * 
 * 
 * @param {any} state 
 * @returns 
 */
function mapStateToProps(state) {
  return {
    userData: state.UserDetails[0].data,
    isRefreshed: state.refreshPage[0].isRefreshed,
    bookData: state.books[0].data,
    item: state.returnBooks,
    bbData: state.getunreturnedBooks[0].data,
    imageUrl: state.userProfileImage[0].response,
    error: state.updateUser[0].error.toString(),
    message: state.updateUser[0].data.toString(),

  };
}

export default connect(mapStateToProps, {
  getunreturnedBooks,
  returnbook,
  getborrowedBooks,
  getbooks,
  getUserdetails,
  refreshPage,
  updateUser,
  uploadAvatar,
  logout
})(DashboardPage);
