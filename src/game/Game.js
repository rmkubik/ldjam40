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
        this.createDesktopIcon(this.iconTypes.folder, {x: 200, y: 150});
        this.createDesktopIcon(this.iconTypes.appStore, {x: 350, y: 150});
    }

    update() {
        // update every icon

        // render new state
    }

    createDesktopIcon(icon, position) {
        const {desktopIcons} = this.state;

        this.state.desktopIcons = [
              ...desktopIcons,
              new DesktopIcon(icon, position, this.state.getNextIconId())
        ];
    }

    findDesktopIconIndexById(id) {
        return this.state.desktopIcons.findIndex((desktopIcon) => {
            return desktopIcon.id === id;
        });
    }
}

export default Game;
