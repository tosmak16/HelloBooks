import React from 'react';

class BooksList extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className=" col l9 offset-l2 col m9  offset-m2  col s9 offset-s2">
            <h4 className="sub-header">Available books</h4>
            <div className="responsive-table">
              <table className="table striped">
                <thead>
                  <tr>
                    <th><i className="material-icons ">search</i></th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>ISBN</th>
                    <th>Number in stock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td> <a href="detail.html"> Rise of the fallen</a></td>
                    <td>Breanna Ashacraft</td>
                    <td>Fantasy</td>
                    <td>1234-4573-179-3</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td> <a href="detail.html">Borrowing brillance</a> </td>
                    <td>David Kord Murry</td>
                    <td>Educational</td>
                    <td>8834-3573-179-3</td>
                    <td>7</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td> <a href="detail.html"> Learn and master guitar</a></td>
                    <td>Steve Krenz</td>
                    <td>Art and music</td>
                    <td>2234-4573-19-17</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td><a href="detail.html">Data-ism</a> </td>
                    <td>Steve Lohr</td>
                    <td>Tech</td>
                    <td>3324-473-129-33</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td> <a href="detail.html">Think and Grow Rich</a></td>
                    <td>Napoleon Hill</td>
                    <td>Business Success</td>
                    <td>1434-473-279-34</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default BooksList;
