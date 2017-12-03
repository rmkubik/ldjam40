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
    desktopIcons: [],
    nextIconId: 0,
    money: 0
  }

  iconTypes = {
    file: "📃",
    folder: "📁",
    appStore: "🏦"
  }

  createNewDesktopIcon = (icon, position) => {
    this.setState({
      desktopIcons: [
        ...this.state.desktopIcons,
        { 
          icon, 
          position, 
          initialPosition: position, 
          id: this.state.nextIconId 
        }
      ],
      nextIconId: this.state.nextIconId + 1
    })
  }

  consumeDesktopIcon = (icon, position, range) => {
    const nearestDesktopIconIndex = this.state.desktopIcons.reduce((closestIconIndex, currentIcon, currentIndex) => {
      return findEuclideanDistance(currentIcon.position, position) < findEuclideanDistance(
        this.state.desktopIcons[closestIconIndex].position, position
      )
        ? currentIndex
        : closestIconIndex
    }, 0);
    const nearestDesktopIcon = this.state.desktopIcons[nearestDesktopIconIndex];   

    if (findEuclideanDistance(nearestDesktopIcon.position, position) <= range) {
      this.setState({
        desktopIcons: [
          ...this.state.desktopIcons.slice(0, nearestDesktopIconIndex),
          ...this.state.desktopIcons.slice(nearestDesktopIconIndex + 1)
        ],
        money: this.state.money + 1
      });
    }
  }

  updateDesktopIconPosition = (id, position) => {
    const index = this.findDesktopIconIndexById(id);
    if (index === -1) return; //why are icons with ids not in state being asked to updateposition?
    const desktopIcon = {...this.state.desktopIcons[index]};
    console.log({index, list: this.state.desktopIcons, desktopIcon});
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

  findDesktopIconIndexById = (id) => {
    return this.state.desktopIcons.findIndex((value) => {
      return id === value.id
    });
  }

  render() {
    const desktopIcons = this.state.desktopIcons.map((desktopIcon, index) => {
      return <DesktopIcon 
        icon={desktopIcon.icon} 
        initialPosition={desktopIcon.initialPosition}
        onDrag={this.updateDesktopIconPosition}
        key={desktopIcon.id} 
        index={desktopIcon.id}
      />
    });

    return (
      <div className="App">
        <Emitter 
          icon={this.iconTypes.folder} 
          spawnCallback={this.createNewDesktopIcon} 
          spawnedIcon={this.iconTypes.file}
          initialPosition={{x: 200, y: 150}}
        />
        <Consumer 
          icon={this.iconTypes.appStore}
          initialPosition={{x: 350, y: 150}}
          consumedIcon={this.iconTypes.file}
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
        <p style={{display:"inline-block", paddingLeft: "10px", paddingRight: "10px"}}>$: {this.state.money}</p>
        <button style={{display:"inline-block"}}>New: {this.iconTypes.folder}</button>
        <button style={{display:"inline-block"}}>New: {this.iconTypes.appStore}</button>
      </div>
    );
  }
}

export default App;
