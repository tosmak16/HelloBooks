import React from 'react';
import { Link } from 'react-router';


class LandingPage extends React.Component {
  render() {
    return (
      <div className="welcome">
        <span id="splash-overlay" className="splash" />
        <span id="welcome" className="z-depth-4" />
        <main className="valign-wrapper">
          <span className="container grey-text text-lighten-1 ">

            <p style={{ fontSize: '35px', color: '#3e1111' }} className="flow-text">Welcome to</p>
            <h1 style={{ color: 'rgba(142, 15, 15, 0.74)' }} className="title text-lighten-3">Hello Books</h1>

            <blockquote style={{ color: 'rgba(142, 15, 15, 0.74)' }} className="flow-text">it's a simple application that helps manage a library and its processes like stocking,  tracking and renting books</blockquote>

            <div style={{ boxShadow: '1px 1px 50px 20px rgba(70, 34, 9, 0.35)' }} className="center-align">

              <Link
                className="btn"
                to={ '/login' }
                data-activates="exams"
                style={{ backgroundColor: '#3e1111' }}
              >Sign In</Link>

              <Link
                style={{ backgroundColor: '#93776d' }}
                className="btn"
                to={ '/signup' }
                data-activates="study"
              >Sign Up</Link>
            </div>

          </span>
        </main>
      </div>
    );
  }
}


export default LandingPage;
