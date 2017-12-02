import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DesktopIcon from './components/DesktopIcon';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DesktopIcon icon="📁"/>
        <DesktopIcon icon="📃"/>
      </div>
    );
  }
}

export default App;
