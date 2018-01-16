import React from 'react';
import { Link } from 'react-router';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  document.title = 'Home Page';
  return (
    <div>
      <div className="con">
        <div className="row">
          <div className="col-lg-12">
            <div className="content">
              <h1>Hello Books</h1>
              <h3>“A mind needs books as a sword needs a whetstone.” </h3>
              <hr className="hr-landing" />
              <Link to="/signup" className="btn btn-default btn-lg landing-button">
                Sign up</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-set">
        <Footer />
      </div>
    </div>
  );
};
export default LandingPage;
