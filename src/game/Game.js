import GameState from './GameState';
import DesktopIcon from './DesktopIcon';
import Emitter from './Emitter';

class Game {

    tickLength = 30;
    state;
    loop;

    iconTypes = {
      file: "📄",
      package: "📦",
      chart: "📈",
      email: "✉️",
      book: "📓",
      folder: "📁",
      appStore: "🏦",
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

    constructor() {
        this.state = new GameState();

        this.loop = setInterval(this.update.bind(this), this.tickLength);
    }

    init() {
        this.state.createDesktopIcon(this.iconTypes.folder, {x: 200, y: 150});
        Emitter(this.state.desktopIcons[0], this.state, this.iconTypes.file);
        this.state.createDesktopIcon(this.iconTypes.appStore, {x: 350, y: 150});
    }

    update() {
        const {desktopIcons} = this.state;
        // update every icon
        desktopIcons.forEach((desktopIcon) => {
            if (desktopIcon.emit) {
                desktopIcon.emit();
            }
        });

        // render new state
    }


    // convert game state to react state
    getState() {
        return {
            desktopIcons: [...this.state.desktopIcons],
            money: this.state.money,
            hddSize: this.state.hddSize
        };
    }

    // purchase new icon

    // consume icon

    // emit new icon
}

export default Game;
