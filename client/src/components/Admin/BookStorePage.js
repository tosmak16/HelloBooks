import React from 'react';


class BookStorePage extends React.Component {
  render() {
    return (
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className=" col  l12 col m10 col s9">
              <h4 className="sub-header">Available Books</h4>
              <div className="table-responsive">
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
                      <td><button type="button" className=" btn-danger btn-sm deletebtn">Delete</button></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Borrowing brillance</td>
                      <td>David Kord Murry</td>
                      <td>Educational</td>
                      <td>8834-3573-179-3</td>
                      <td><button type="button" className="btn-danger btn-sm deletebtn">Delete</button></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Learn and master guitar</td>
                      <td>Steve Krenz</td>
                      <td>Art and music</td>
                      <td>2234-4573-19-17</td>
                      <td><button type="button" className=" btn-danger btn-sm deletebtn">Delete</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default BookStorePage;
