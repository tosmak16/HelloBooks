import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';


// export default () => (<h1>hello world from react</h1>);

class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        {this.props.children}
        <Footer />
      </div>

    );
  }
}

export default App;
