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

  componentDidMount() {
    this.createNewDesktopIcon(this.iconTypes.folder, {x: 200, y: 150});
  }

  findDesktopIconIndexById = (id) => {
    return this.state.desktopIcons.findIndex((value) => {
      return id === value.id
    });
  }

  lookUpDesktopIconPositionById = (id) => {
    const index = this.findDesktopIconIndexById(id);
    if (index === -1) return; //why are icons with ids not in state being asked to updateposition?    
    return this.state.desktopIcons[index].position;
  }

  createNewDesktopIcon = (icon, position) => {
    if (!position) console.log(position);
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
    console.log(icon);
    const consumableDesktopIcons = this.state.desktopIcons.filter((desktopIcon) => {
      console.log({a: desktopIcon.icon, b: icon})
      return desktopIcon.icon === icon;
    });

    if (consumableDesktopIcons.length === 0) return; // no icons to consume

    const nearestDesktopIconIndex = consumableDesktopIcons.reduce((closestIconIndex, currentIcon, currentIndex, consumables) => {
      return findEuclideanDistance(currentIcon.position, position) < findEuclideanDistance(
        consumables[closestIconIndex].position, position
      )
        ? currentIndex
        : closestIconIndex
    }, 0);

    const nearestDesktopIcon = consumableDesktopIcons[nearestDesktopIconIndex];   

    if (findEuclideanDistance(nearestDesktopIcon.position, position) <= range) {
      const desktopIconStateIndex = this.findDesktopIconIndexById(nearestDesktopIcon.id);
      this.setState({
        desktopIcons: [
          ...this.state.desktopIcons.slice(0, desktopIconStateIndex),
          ...this.state.desktopIcons.slice(desktopIconStateIndex + 1)
        ],
        money: this.state.money + 1
      });
    }
  }

  updateDesktopIconPosition = (id, position) => {
    const index = this.findDesktopIconIndexById(id);
    if (index === -1) return; //why are icons with ids not in state being asked to updateposition?
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
      let icon;
      switch (desktopIcon.icon) {
        case this.iconTypes.file:
          icon = <DesktopIcon 
            icon={desktopIcon.icon} 
            initialPosition={desktopIcon.initialPosition}
            onDrag={this.updateDesktopIconPosition}
            key={desktopIcon.id} 
            id={desktopIcon.id}
          />
          break;
        case this.iconTypes.folder:
          icon = <Emitter 
            icon={this.iconTypes.folder} 
            findPosition={() => this.lookUpDesktopIconPositionById(desktopIcon.id)}
            spawnCallback={this.createNewDesktopIcon} 
            spawnedIcon={this.iconTypes.file}
            initialPosition={desktopIcon.initialPosition}
            onDrag={this.updateDesktopIconPosition}
            id={desktopIcon.id}
          />
          break;
        case this.iconTypes.appStore:
          icon = <Consumer 
            icon={this.iconTypes.appStore}
            initialPosition={desktopIcon.initialPosition}
            consumedIcon={this.iconTypes.file}
            consumeCallback={this.consumeDesktopIcon}
            range={100}
          />
          break;
        default:
          console.warn(desktopIcon.icon + " is not implemented for rendering");
          break;
      }
      return icon;
    });

    return (
      <div className="App">
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
