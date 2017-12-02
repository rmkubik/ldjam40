import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import DesktopIcon from './components/DesktopIcon';
import Emitter from './components/Emitter';

class App extends Component {
  state = {
    desktopIcons: []
  }

  createNewDesktopIcon = (icon, position) => {
    const desktopIcon = <DesktopIcon icon={icon} position={position} key={this.state.desktopIcons.length}/>;
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
        <DesktopIcon icon="🖥️" position={{x: 250, y: 150}} />
        <ReactCSSTransitionGroup                     
          transitionName={"spawn"}
          transitionEnterTimeout={150}
        >
          {this.state.desktopIcons}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
