import React from 'react';
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

export default App;
