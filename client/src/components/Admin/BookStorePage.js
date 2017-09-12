import React from 'react';
import TableRow from './TableRow';


class BookStorePage extends React.Component {
  render() {
    const { data } = this.props;

    const tablerow = data.map(row =>
      (<TableRow
        key={ row.id }
        row={ row }
        value={ row.id }
      />)
    );
    return (
      <div id="bb_table" className="row">
        <div className=" col l10 offset-l2 col m10 offset-m2 col s12">
          <h4 className="sub-header">Available Books</h4>
          <div className="table-responsive">
            <table className="table responsive-table bordered highlight striped">
              <thead>
                <tr>
                  <th><span className="glyphicon glyphicon-education" /></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>No in Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tablerow}
              </tbody>
            </table>
          </div>


        </div>
      </div>
    );
  }
}


export default BookStorePage;

// <td><button type="button" className=" btn-danger btn-sm deletebtn">Delete</button></td>
