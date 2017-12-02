import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DesktopIcon from './components/DesktopIcon';
import Emitter from './components/Emitter';

class App extends Component {
  state = {
    desktopIcons: []
  }

  createNewDesktopIcon = (icon, position) => {
    this.state.desktopIcons += icon;
    console.log("creating new desktopicon")
  }

  render() {
    return (
      <div className="App">
        <Emitter icon="📁" spawnCallback={this.createNewDesktopIcon} position={{x: 100, y: 100}}/>
        <DesktopIcon icon="📃" position={{x: 100, y: 200}}/>
      </div>
    );
  }
}

export default App;
