import React from 'react';

class UploadBooksPage extends React.Component {
  render() {
    return (
      <div id="uploadbook">
        <div className="container-fluid">
          <div className="row">
            <div className=" col l12 col m10 col s6">
              <form className="form-signin" action="">
                <h4 className="sub-header"> Upload Book</h4>
                <div className="form-group input-field">
                  <label htmlFor="ubookTitle" />
                  <input
                    type="text" className="form-control validate" id="ubookTitle" placeholder="Book Title" required
                  />
                </div>
                <div className="form-group input-field">
                  <label htmlFor="ubookAuthor">Author</label>
                  <input
                    type="text" className="form-control validate" id="ubookAuthor" placeholder="Author" required
                  />
                </div>
                <div className="form-group input-field">
                  <label htmlFor="ubookCat">Category</label>
                  <input
                    type="text" className="form-control validate" id="ubookCat" placeholder="Category" required
                  />
                </div>
                <div className="form-group input-field">
                  <label htmlFor="uISBN">ISBN</label>
                  <input
                    type="text" className="form-control validate" id="uISBN" placeholder="ISBN" required
                  />
                </div>
                <div className="form-group input-field">
                  <label htmlFor="ustock">Number in stock</label>
                  <input
                    type="number" className="form-control validate" id="ustock" placeholder="Number in stock" required
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
                  <button id="uploadbtn" type="button" className="btn-sm pbtn">Upload</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default UploadBooksPage;
