import React from 'react';

class DashboardSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickBookShelf = this.handleClickBookShelf.bind(this);
    this.handleClickAccount = this.handleClickAccount.bind(this);
    this.handleClickHistory = this.handleClickHistory.bind(this);
  }
  handleClickBookShelf(e) {
    e.preventDefault();
    document.getElementById('bb_table').style.display = 'block';
    document.getElementById('b_page').style.display = 'none';
    document.getElementById('bh_table').style.display = 'none';
  }
  handleClickAccount(e) {
    e.preventDefault();
    document.getElementById('b_page').style.display = 'block';
    document.getElementById('bb_table').style.display = 'none';
    document.getElementById('bh_table').style.display = 'none';
  }
  handleClickHistory(e) {
    e.preventDefault();
    document.getElementById('bh_table').style.display = 'block';
    document.getElementById('bb_table').style.display = 'none';
    document.getElementById('b_page').style.display = 'none';
  }
  render() {
    return (
      <div className="row">
        <div className="col s12 col m2 col l2">
          <div id="sidebar-wrapper" >
            <ul className="sidebar-nav" style={{ marginTop: '10px' }} >
              <li>
                <div id="imageborder">
                  <img id="userimg" src={ require('../../../public/img/userimg.jpg') } width="120" height="120" alt="images" />
                </div>
              </li>
              <li>
                <a id="dash" onClick={ this.handleClickBookShelf } href="#">
                  <i className="material-icons left">local_library</i> Books Shelf
                </a>
              </li>
              <li>
                <a id="myP" onClick={ this.handleClickAccount } href="#"><i className="material-icons left">dashboard</i>Account</a>
              </li>
              <li>
                <a id="bor" onClick={ this.handleClickHistory } href="#"><i className="material-icons left">data_usage</i>History</a>
              </li>
              <li>
                <a href="#"><i className="material-icons left">lock</i>Change Password</a>
              </li>
              <li>
                <a href="index.html"><i className="material-icons left">exit_to_app</i>Logout</a>
              </li>

            </ul>
          </div >
        </div >
      </div >
    );
  }
}

export default DashboardSidebar;
