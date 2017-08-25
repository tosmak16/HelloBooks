import React from 'react';

class UpdateBooksPage extends React.Component {
  render() {
    return (
      <div id="editbook">
        <div className="container-fluid">
          <div className="row">
            <div className=" col l12 col m10 col s6">
              <form className="form-signin" action="">
                <h4 className="sub-header"> Edit book</h4>
                <div className="form-group input-field">
                  <label htmlFor="ebookTitle">Title</label>
                  <input
                    type="text" className="form-control validate" id="ebookTitle" placeholder="Book Title" required
                  />
                </div>
                <div className="form-group input-field">
                  <label htmlFor="ebookAuthor">Author</label>
                  <input
                    type="text" className="form-control validate" id="ebookAuthor" placeholder="Author" required
                  />
                </div>
                <div className="form-group input-field">
                  <label htmlFor="ebookCat">Category</label>
                  <input
                    type="text" className="form-control validate" id="ebookCat" placeholder="Category" required
                  />
                </div>
                <div className="form-group input-field">
                  <label htmlFor="eISBN">ISBN</label>
                  <input
                    type="text" className="form-control validate" id="eISBN" placeholder="ISBN" required
                  />
                </div>
                <div className="form-group input-field">
                  <label htmlFor="estock">Number in stock</label>
                  <input
                    type="number" className="form-control validate" id="estock" placeholder="Number in stock" required
                  />
                </div>
                <div className="file-field input-field">
                  <div id="filebtn" className="btn-small">
                    <span>Image</span>
                    <input type="file" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload cover image" />
                  </div>
                </div>
                <div className="form-inline">
                  <button id="updatebtn" type="button" className="btn-sm pbtn">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default UpdateBooksPage;
