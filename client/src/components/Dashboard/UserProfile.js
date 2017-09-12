import React from 'react';

class Userprofile extends React.Component {
  render() {
    return (

      <div id="b_page" className="row">
        <div className=" col col l10 offset-l1 col m11 offset-m2 col s12">
          <form className="form-signin" action="">
            <h4 className="sub-header form-signin-heading"> Personal Info</h4>
            <div className="input-field">
              <label htmlFor="firstname" className="sr-only">First Name</label>
              <input
                type="text" id="firstname" className="form-control validate" placeholder="First Name" required
                autoFocus
              />
            </div>
            <div className="input-field">
              <label htmlFor="lastname" className="sr-only">Last Name</label>
              <input
                type="text" id="lastname" className="form-control validate" placeholder="Last Name" required
                autoFocus
              />
            </div>
            <div className="input-field">
              <label htmlFor="inputSignUpEmail" className="sr-only">Email address</label>
              <input
                type="email" id="inputSignUpEmail" className="form-control validate" placeholder="Email address" required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label className="sr-only" htmlFor="inputPhoneNumber">Phone number</label>
              <input
                type="number" id="inputPhoneNumber" className="form-control validate" placeholder="phone number" required
                autoFocus
              />
            </div>

            <select className="browser-default" >
              <option defaultValue="Basic" disabled>Membership Type</option>
              <option value="Basic">Basic</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
            </select>
            <div className="file-field input-field">
              <div id="filebtn" className="btn">
                <span>File</span>
                <input type="file" />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Upload your picture" />
              </div>
            </div>

            <div className="input-field inline">
              <button id="editbtn" type="button" className="btn btn-primary pbtn">Edit</button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default Userprofile;
