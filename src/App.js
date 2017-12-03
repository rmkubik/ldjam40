import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import DesktopIcon from './components/DesktopIcon';
import Emitter from './components/Emitter';
import Consumer from './components/Consumer';

import findEuclideanDistance from './Helpers';

class App extends Component {
  state = {
    desktopIcons: []
  }

  createNewDesktopIcon = (icon, position) => {
    this.setState({
      desktopIcons: [
        ...this.state.desktopIcons,
        { icon, position, initialPosition: position }
      ]
    })
  }

  consumeDesktopIcon = (icon, position, range) => {
    // find nearest desktop icon of correct type
    const nearestDesktopIcon = this.state.desktopIcons.reduce((closestIcon, currentIcon) => {
      return findEuclideanDistance(currentIcon.position, position) < findEuclideanDistance(closestIcon.position, position)
        ? currentIcon
        : closestIcon
    });
    // is it in range?
    if (findEuclideanDistance(nearestDesktopIcon.position, position) <= range) {
      console.log("close enough!");
    }
    // remove it from the state
  }

  updateDesktopIconPosition = (index, position) => {
    const desktopIcon = {...this.state.desktopIcons[index]};
    desktopIcon.position = {
      x: desktopIcon.initialPosition.x + position.x,
      y: desktopIcon.initialPosition.y + position.y
    };
    
    this.setState({
      desktopIcons: [
        ...this.state.desktopIcons.slice(0, index),
        desktopIcon,
        ...this.state.desktopIcons.slice(index + 1)
      ]
    })
  }

  render() {
    const desktopIcons = this.state.desktopIcons.map((desktopIcon, index) => {
      return <DesktopIcon 
        icon={desktopIcon.icon} 
        initialPosition={desktopIcon.initialPosition}
        onDrag={this.updateDesktopIconPosition}
        key={index} 
        index={index}
      />
    });

    return (
      <div className="App">
        <Emitter 
          icon="📁" 
          spawnCallback={this.createNewDesktopIcon} 
          spawnedIcon="📃"
          initialPosition={{x: 200, y: 150}}
        />
        <Consumer 
          icon="🖥️" 
          initialPosition={{x: 350, y: 150}}
          consumedIcon="📃"
          consumeCallback={this.consumeDesktopIcon}
          range={100}
        />
        <ReactCSSTransitionGroup                     
          transitionName={"spawn"}
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {desktopIcons}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
