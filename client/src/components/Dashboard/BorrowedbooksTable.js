import React from 'react';

class BorrowedbooksTable extends React.Component {
  render() {
    return (
      <div id="bb_table" className="row">
        <div className="  col l10 offset-l2 col m10 offset-m2 col s12">
          <h4 className="sub-header"> Borrowed books</h4>
          <div className="responsive-table">
            <table className="table responsive-table bordered highlight striped">
              <thead>
                <tr>
                  <th><span className="glyphicon glyphicon-education" /></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>ISBN</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Rise of the fallen</td>
                  <td>Breanna Ashacraft</td>
                  <td>Fantasy</td>
                  <td>1234-4573-179-3</td>
                  <td><button type="button" className="btn-sm btn-success btn-sm returnbtn">Return</button></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Borrowing brillance</td>
                  <td>David Kord Murry</td>
                  <td>Educational</td>
                  <td>8834-3573-179-3</td>
                  <td><button type="button" className="btn-sm btn-success btn-sm returnbtn">Return</button></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Learn and master guitar</td>
                  <td>Steve Krenz</td>
                  <td>Art and music</td>
                  <td>2234-4573-19-17</td>
                  <td><button type="button" className="btn-sm btn-success btn-sm returnbtn">Return</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default BorrowedbooksTable;
