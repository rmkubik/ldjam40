import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import DesktopIcon from './components/DesktopIcon';
import Emitter from './components/Emitter';
import Consumer from './components/Consumer';

import fileImage from './assets/file.png';
import folderImage from './assets/folder.png';
import appStoreImage from './assets/app_store.png';

import findEuclideanDistance from './Helpers';

class App extends Component {
  state = {
    desktopIcons: [],
    nextIconId: 0,
    money: 0,
    hddSize: 10
  }

  iconTypes = {
    file: (<img src={fileImage} draggable="false"/>),
    package: "📦",
    chart: "📈",
    email: "✉️",
    book: "📓",
    folder: (<img src={folderImage} draggable="false"/>),
    appStore: (<img src={appStoreImage} draggable="false"/>),
    mailbox: "📫",
    crane: "🏗️",
    factory: "🏭",
    castle: "🏰",
    hdd: "💾",
    sdd: "💽",
    trash: "🗑️",
    firewall: "🔥",
    bug: "🐛",
    satellite: "🛰️",
    bow: "🏹",
    money: "💰"
  }

  screenMax = {
      x: 500,
      y: 400
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
    if (index === -1) return; // why are icons with ids not in state being asked to updateposition?    
    return this.state.desktopIcons[index].position;
  }

  purchaseNewDesktopIcon = (icon, cost, position) => {
    if (this.state.money >= cost) {
      if (icon === this.iconTypes.hdd) {
        this.setState((prevState) => {
          const {hddSize} = prevState;
          return {
            hddSize: hddSize + 10
          }
        });
      }
      this.createNewDesktopIcon(icon, position);
      this.setState((prevState) => {
        const {money} = prevState;
        return {
          money: money - cost
        }
      });
    }
  }

  createNewDesktopIcon = (icon, position) => {
    if (this.state.desktopIcons.length >= this.state.hddSize) {
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
            id: nextIconId,
            destroyed: false,
            consumed: 0
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

    const nearestDesktopIcon = consumableDesktopIcons.reduce((closestIcon, currentIcon) => {
      return findEuclideanDistance(currentIcon.position, position) < findEuclideanDistance(closestIcon.position, position)
        ? currentIcon
        : closestIcon
    });

    if (findEuclideanDistance(nearestDesktopIcon.position, position) <= range) {
      const desktopIconStateIndex = this.findDesktopIconIndexById(nearestDesktopIcon.id);

      nearestDesktopIcon.destroyed = true;

      this.setState((prevState) => {
        const {desktopIcons} = prevState;
        return {
          desktopIcons: [
            ...desktopIcons.slice(0, desktopIconStateIndex),
            nearestDesktopIcon,
            ...desktopIcons.slice(desktopIconStateIndex + 1)
          ]
        }
      })
    }
  }

  // validate icon should be removed -- consumeCallback
  findNearestConsumableIcon = (icon, position, range) => {
    const consumableDesktopIcons = this.state.desktopIcons.filter((desktopIcon) => {
      return desktopIcon.icon === icon;
    });

    if (consumableDesktopIcons.length === 0) return; // no icons to consume

    const nearestDesktopIcon = consumableDesktopIcons.reduce((closestIcon, currentIcon) => {
      return findEuclideanDistance(currentIcon.position, position) < findEuclideanDistance(closestIcon.position, position)
        ? currentIcon
        : closestIcon
    });

    const nearestConsumableIcon = findEuclideanDistance(nearestDesktopIcon.position, position) <= range
      ? nearestDesktopIcon
      : null

    return nearestConsumableIcon;
  }

  // start exit animation -- Set in to true
  consumerCallback = (icon, position, range, consumer) => {
    const consumedIcon = this.findNearestConsumableIcon(icon, position, range);
    if (consumedIcon !== null) {
      // consumedIcon.setState({consumed: true});
      // run animation
    }
  }

  // update state after animation successfully completed -- call old consume callback state update piece from onExit of CSSTransition
  removeDesktopIconFromState = (desktopIcon) => {
    const desktopIconStateIndex = this.findDesktopIconIndexById(desktopIcon.id);
    if (desktopIconStateIndex === -1) return; // why are icons with ids not in state being asked to updateposition?
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

  updateDesktopIconPosition = (id, position) => {
    const index = this.findDesktopIconIndexById(id);
    if (index === -1) return; // why are icons with ids not in state being asked to updateposition?
    const desktopIcon = {...this.state.desktopIcons[index]};

    desktopIcon.position = position;

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

  getRandomPositionOnScreen = () => {
      return {
          x: Math.floor(Math.random() * this.screenMax.x),
          y: Math.floor(Math.random() * this.screenMax.y),
      }
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
            destroyIcon={desktopIcon.destroyed}
            destroyIconCallback={() => this.removeDesktopIconFromState(desktopIcon)}
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
            findPosition={() => this.lookUpDesktopIconPositionById(desktopIcon.id)}
            initialPosition={desktopIcon.initialPosition}
            consumedIcon={this.iconTypes.file}
            consumeCallback={this.consumeDesktopIcon}
            onDrag={this.updateDesktopIconPosition}
            range={100}
            key={desktopIcon.id}
            id={desktopIcon.id}
          />
          break;
        case this.iconTypes.hdd:
          icon = <DesktopIcon 
            icon={desktopIcon.icon} 
            initialPosition={desktopIcon.initialPosition}
            onDrag={this.updateDesktopIconPosition}
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
        {desktopIcons}
        <p style={{display:"inline-block", paddingLeft: "10px", paddingRight: "10px"}}>${this.state.money}</p>
        <button
          style={{display:"inline-block"}}
          onClick={()=>{
            this.purchaseNewDesktopIcon(this.iconTypes.folder, 10, this.getRandomPositionOnScreen());
          }}
        >
          {this.iconTypes.folder} - $10
        </button>
        <button
          style={{display:"inline-block"}}
          onClick={()=>{
            this.purchaseNewDesktopIcon(this.iconTypes.appStore, 20, this.getRandomPositionOnScreen());
          }}
        >
          {this.iconTypes.appStore} - $20
        </button>
        <button
          style={{display:"inline-block"}}
          onClick={()=>{
            this.purchaseNewDesktopIcon(this.iconTypes.hdd, 40, this.getRandomPositionOnScreen());
          }}
        >
          {this.iconTypes.hdd} - $40
        </button>
        <p style={{display:"inline-block", paddingLeft: "10px", paddingRight: "10px"}}>HDD Space: </p>
        <progress value={this.state.desktopIcons.length} max={this.state.hddSize} style={{display:"inline-block", paddingLeft: "10px", paddingRight: "10px"}}></progress>
      </div>
    );
  }
}

export default App;
