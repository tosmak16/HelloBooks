import React from 'react';
import PropTypes from 'prop-types';

import NavigationBar from './NavigationBar';


/**
 * 
 * 
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   * 
   * 
   * @returns 
   * @memberof App
   */
  render() {
    return (

      <div>

        <NavigationBar />
        {this.props.children}

      </div>


    );
  }
}

App.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,

};

export default App;
