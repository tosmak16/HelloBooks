import React from 'react';

class DetailsForm extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m10 offset-m2  col l10 offset-l2 col s10 offset-s2 ">
            <div className="placeholders  ">
              <div className=" col s2 col m2 col l2 placeholder" id="photo">
                <img src="img/blank.png" width="200" height="300" alt="Generic placeholder thumbnail" />
                <h4>Title:</h4>
                <span className="text-muted">Author:</span>
              </div>
            </div>

            <div className=" col s8 col m8 col l8">
              <h4 className="page-header">Title</h4>
              <hr />
              <h5>Summary</h5>
              <span id="sum" className="text-muted">The Time Traveller, a dreamer obsessed with traveling through time, builds himself a time machine and, much to his surprise, travels over 800,000 years into the future. He lands in the year 802701: the world has been transformed by a society living in apparent harmony and bliss, but as the Traveler stays in the future he discovers a hidden barbaric and depraved subterranean class. Wells's transparent commentary on the capitalist society was an instant bestseller and launched the time-travel genre.</span>
              <div className="">
                <p className="bookinfo">Category: Fiction </p>
                <p className="bookinfo">ISBN: 12348-283849-839 </p>
                <p className="bookinfo">Number in Stock: 5 </p>
              </div>
              <div className="form-inline">
                <button id="wishbtn" type="button" className="btn-sm btn-warning shop">Wishlist</button>
                <button id="borrowbtn" type="submit" className="btn-sm btn-success shop">Borrow</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default DetailsForm;
