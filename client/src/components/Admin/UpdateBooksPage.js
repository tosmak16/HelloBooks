import React from 'react';

class UpdateBooksPage extends React.Component {
  render() {
    return (
      <div id="bh_table" className="row">
        <form onSubmit={ this.handleSubmit } className="form-signin col l10 offset-l1 col m11 offset-m2 col s12" action="" encType="multipart/form-data">

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

          <div className="form-group input-field">
            <label htmlFor="ebookSummary" />
            <textarea
              type="textarea" name="summary"
              className="form-control validate"
              id="ebookSummary" placeholder="Summary"
              required
              onChange={ this.handleChange }
            />
          </div>
          <div className="file-field input-field">
            <div id="filebtn" className="btn">
              <span>File</span>
              <input type="file" />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Upload cover" />
            </div>
          </div>

          <div className="form-inline">
            <button id="updatebtn" type="button" className="btn-sm pbtn">Update</button>
          </div>
        </form>
      </div>

    );
  }
}


export default UpdateBooksPage;
