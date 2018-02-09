import GameState from './GameState';
import Emitter from './Emitter';

class Game {

    tickLength = 30;
    state;
    loop;
    setReactState;

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

    constructor(rootComponent) {
        this.state = new GameState();

        this.rootComponent = rootComponent;
    }

    init() {
        this.loop = setInterval(this.update.bind(this), this.tickLength);

        this.state.createDesktopIcon(this.iconTypes.folder, {x: 200, y: 150});
        Emitter(this.state.desktopIcons[0], this.state, this.iconTypes.file, 1000);
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
        if (this.rootComponent) {
            this.rootComponent.setState(this.getReactState.bind(this));
        }
    }

    // convert game state to react state
    getReactState(prevState) {
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
