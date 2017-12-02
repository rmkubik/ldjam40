import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DesktopIcon from './components/DesktopIcon';
import Emitter from './components/Emitter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Emitter icon="📁"/>
        <DesktopIcon icon="📃"/>
      </div>
    );
  }
}

export default App;
