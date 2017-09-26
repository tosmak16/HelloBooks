import React from 'react';

class AdminSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickBookStore = this.handleClickBookStore.bind(this);
    this.handleClickUpload = this.handleClickUpload.bind(this);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
  }
  handleClickBookStore(e) {
    e.preventDefault();
    document.getElementById('bb_table').style.display = 'block';
    document.getElementById('b_page').style.display = 'none';
    document.getElementById('bh_table').style.display = 'none';
  }
  handleClickUpload(e) {
    e.preventDefault();
    document.getElementById('b_page').style.display = 'block';
    document.getElementById('bb_table').style.display = 'none';
    document.getElementById('bh_table').style.display = 'none';
  }
  handleClickUpdate(e) {
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
              <li >
                <a id="dash" onClick={ this.handleClickBookStore } href="#">
                  <i className="material-icons left">local_convenience_store</i> Book Store
                </a>
              </li>
              <li>
                <a id="myP" onClick={ this.handleClickUpload } href="#"> <i className="material-icons left">cloud_upload</i>Upload Book</a>
              </li>
              <li>
                <a id="bor" onClick={ this.handleClickUpdate } href="#"><i className="material-icons left">system_update</i>Update Book</a>
              </li>
              <li>
                <a href="#"><i className="material-icons left">lock</i>Change Password</a>
              </li>
              <li>
                <a href="index.html"><i className="material-icons left">exit_to_app</i>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminSidebar;
