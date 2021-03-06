import React from 'react';
import { Link } from 'react-router';

/**
 * @description This component contains footer
 * 
 * @function Footer
 *
 *@returns {views} footer
 */
export const Footer = () => (
  <footer className="footer-distributed ">
    <div className="row">
      <div className=" col l12 col m12 col s12">
        <div className="footer-left col l4 col m4 col s12">
          <h3>Hello<span>Books</span></h3>
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
            <p><Link href="tosmak16@gmail.com">tosmak16@gmail.com</Link></p>
          </div>

        </div>

        <div className="footer-right col l4 col m14 col s12">

          <div className="footer-company-about">
            <span>
              About Hello Book
            </span>
            <p>
              it is a simple application that helps manage a library and
                  its processes like stocking,tracking and renting books
            </p>
          </div>
          <div className="footer-icons">
            <Link to={'http//:'}><i className="fa fa-facebook" /></Link>
            <Link to={'http//:'}><i className="fa fa-twitter" /></Link>
            <Link to={'http//:'}><i className="fa fa-linkedin" /></Link>
            <Link to={'http//:'}><i className="fa fa-github" /></Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
