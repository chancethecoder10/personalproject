import React, { Component } from 'react';
import '../src/styles/App.css';
import routes from './routing/routes'
import Navigation from './components/Navigation'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        {routes}
      </div>
    );
  }
}

export default App;
