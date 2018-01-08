import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar from './NavigationBar';

/**
 * @function App
 * 
 * @param {object} props
 * 
 * @returns {views} containing Nav bar and some other component properties
 */
const App = props =>
  /**
   * @returns
   * 
   * @memberof App
   */
  (
    <div>
      <NavigationBar />
      {props.children}
    </div>
  )
  ;
App.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default App;
