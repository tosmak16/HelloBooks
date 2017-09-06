import React from 'react';

class BorrowHistoryTable extends React.Component {
  render() {
    return (
      <div id="bh_table" className="row">
        <div className=" col l7 offset-l3 col m7 offset-m3 col s12">
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
                <tr>
                  <td>2</td>
                  <td>Borrowing brillance</td>
                  <td>David Kord Murry</td>
                  <td>1-1-1999</td>
                  <td>5-1-1999</td>
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
