import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-distributed ">

        <div className="row">
          <div className=" col l12 col m12 col s12">

            <div className="footer-left col l4 col m4 col s12">

              <h3>Hello<span>Books</span></h3>

              <p className="footer-links">
                <a href="#">Home</a> ·
                <a href="#">Blog</a> ·
                <a href="#">Pricing</a> ·
                <a href="#">About</a> ·
                <a href="#">Faq</a> ·
                <a href="#">Contact</a>
              </p>

              <p className="footer-company-name">Tosmak &copy; 2017</p>
            </div>

            <div className="footer-center col l4 col m4 col s12">

              <div>
                <i className="fa fa-map-marker" />
                <p><span>21 Ori-oke Street</span> Lagos, Nigeria</p>
              </div>

              <div>
                <i className="fa fa-phone" />
                <p>08127112053</p>
              </div>

              <div>
                <i className="fa fa-envelope" />
                <p><a href="tosmak16@gmail.com">tosmak16@gmail.com</a></p>
              </div>

            </div>

            <div className="footer-right col l4 col m4 col s12">

              <p className="footer-company-about">
                <span>About Hello Book</span>  it's a simple application that helps manage  a libraryand its processes like stocking,
                tracking and renting books
              </p>

              <div className="footer-icons">

                <a href="#"><i className="fa fa-facebook" /></a>
                <a href="#"><i className="fa fa-twitter" /></a>
                <a href="#"><i className="fa fa-linkedin" /></a>
                <a href="#"><i className="fa fa-github" /></a>

              </div>

            </div>
          </div>
        </div>

      </footer>
    );
  }
}

export default Footer;
