import GameState from './GameState';
import DesktopIcon from './DesktopIcon';

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

        this.loop = setInterval(this.update, this.tickLength);
    }

    init() {
        this.state.createDesktopIcon(this.iconTypes.folder, {x: 200, y: 150});
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

    // purchase new icon

    // consume icon

    // emit new icon
}

export default Game;
