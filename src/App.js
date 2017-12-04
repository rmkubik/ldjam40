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
    money: 0,
    hddSize: 10
  }

  iconTypes = {
    file: "📃",
    folder: "📁",
    appStore: "🏦"
  }

  componentDidMount() {
    this.createNewDesktopIcon(this.iconTypes.folder, {x: 200, y: 150});
    this.createNewDesktopIcon(this.iconTypes.appStore, {x: 350, y: 150});
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
    if (this.state.desktopIcons.length > this.state.hddSize) {
      this.gameOver();
      return;
    }

    this.setState((prevState) => {
      const {nextIconId, desktopIcons} = prevState;

      return { 
        desktopIcons: [
          ...desktopIcons,
          { 
            icon, 
            position, 
            initialPosition: position, 
            id: nextIconId 
          }
        ],
        nextIconId: nextIconId + 1
      }
    });
  }

  gameOver = () => {
    console.log("Game over! Your Hard Drive ran out of space!");
  }

  consumeDesktopIcon = (icon, position, range) => {
    const consumableDesktopIcons = this.state.desktopIcons.filter((desktopIcon) => {
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
      this.setState((prevState) => {
        const {money, desktopIcons} = prevState;
        return {
          desktopIcons: [
            ...desktopIcons.slice(0, desktopIconStateIndex),
            ...desktopIcons.slice(desktopIconStateIndex + 1)
          ],
          money: money + 1
        }
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

    this.setState((prevState) => {
      const {desktopIcons} = prevState;
      return {
            desktopIcons: [
            ...desktopIcons.slice(0, index),
            desktopIcon,
            ...desktopIcons.slice(index + 1)
          ]
        }
    });
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
            key={desktopIcon.id}
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
            key={desktopIcon.id}
            id={desktopIcon.id}
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
        <p style={{display:"inline-block", paddingLeft: "10px", paddingRight: "10px"}}>HDD Space: </p>
        <progress value={this.state.desktopIcons.length} max={this.state.hddSize} style={{display:"inline-block", paddingLeft: "10px", paddingRight: "10px"}}></progress>
      </div>
    );
  }
}

export default App;
