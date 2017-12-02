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
    const desktopIcon = <DesktopIcon icon={icon} position={position}/>;
    this.setState({
      desktopIcons: [
        ...this.state.desktopIcons,
        desktopIcon
      ]
    })
    console.log({icon, position})
  }

  render() {
    return (
      <div className="App">
        <Emitter 
          icon="📁" 
          spawnCallback={this.createNewDesktopIcon} 
          spawnedIcon="📃"
          position={{x: 200, y: 150}}
        />
        {this.state.desktopIcons}
      </div>
    );
  }
}

export default App;
