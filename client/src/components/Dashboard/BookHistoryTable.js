import React from 'react';
import isEmpty from 'lodash/isEmpty';

import TableRow from '../Books/TableRow';


class BorrowHistoryTable extends React.Component {
  render() {
    return (
      <div id="bh_table" className="row">
        <div className=" col l10 offset-l2 col m10 offset-m2 col s12">
          <h4 className="sub-header">Borrow History</h4>
          <div className="table-responsive">
            <table className="table responsive-table bordered highlight striped">
              <thead>
                <tr>
                  <th><span className="glyphicon glyphicon-education" /></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Borrowed Date</th>
                  <th>Returned Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Rise of the fallen</td>
                  <td>Breanna Ashacraft</td>
                  <td>12-10-1998</td>
                  <td>14-10-1998</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default BorrowHistoryTable;
