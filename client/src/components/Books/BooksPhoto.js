import React from 'react';

class BooksPhoto extends React.Component {
  render() {
    return (
      <div className="col m10 offset-m2 col l10 offset-l2 col s12 main">
        <h4 className="page-header">Latest Books</h4>
        <hr />
        <div className="row placeholders">
          <div className="col m5 col l3 col s12 placeholder ">
            <a href="detail.html"> <img className="materialboxed" src="/img/l1.jpg" width="150" height="200" alt="Generic placeholder thumbnail" /></a>
            <h5>Abraham Lincoln</h5>
            <span className="text-muted">By Carl Sandburg</span>
          </div>
          <div className="col m5 col l3 col s12 placeholder">
            <a href="detail.html"> <img className="materialboxed" src="img/l2.jpg" width="150" height="200" alt="Generic placeholder thumbnail" /></a>
            <h5>The Time Machine</h5>
            <span className="text-muted">By H. G. Wells</span>
          </div>
          <div className="col m5 col l3 col s12 placeholder">
            <a href="detail.html"> <img className="materialboxed" src="img/l3.jpg" width="150" height="200" alt="Generic placeholder thumbnail" /></a>
            <h5>Little Boy Lost</h5>
            <span className="text-muted">By J.D Trafford</span>
          </div>
          <div className="col m5 col l3  col s12 placeholder">
            <a href="detail.html"> <img className="materialboxed" src="img/l4.jpg" width="150" height="200" alt="Generic placeholder thumbnail" /></a>
            <h5>Undercover</h5>
            <span className="text-muted">By Danielle Steel</span>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksPhoto;
