import GameState from './GameState';
import Emitter from './Emitter';
import Consumer from './Consumer';

class Game {

    tickLength = 30;
    state;
    loop;
    setReactState;
    screen = {
        width: 500,
        height: 500
    }

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
        Consumer(this.state.desktopIcons[1], this.state, this.iconTypes.file, 1000, 100);
    }

    update() {
        const {desktopIcons} = this.state;

        // update every icon
        desktopIcons.forEach((desktopIcon) => {
            if (desktopIcon.emit) {
                desktopIcon.emit();
            }
            if (desktopIcon.consume) {
                desktopIcon.consume();
            }
        });

        // render new state
        if (this.rootComponent) {
            this.rootComponent.setState(this.getReactState.bind(this));
        }

        // TODO: clean up destroyed icons after they're finished timing out
    }

    // convert game state to react state
    getReactState(prevState) {
        return {
            desktopIcons: [...this.state.desktopIcons],
            money: this.state.money,
            hddSize: this.state.hddSize
        };
    }

    purchaseDesktopIcon = (icon, cost, position) => {
        const {money, hddSize, desktopIcons} = this.state;

        if (money >= cost && desktopIcons.length < hddSize) {
            const newIcon = this.state.createDesktopIcon(icon, position);
            this.state.money = money - cost;
            this.modifyPurchasedDesktopIcon(newIcon);
        }
    }

    modifyPurchasedDesktopIcon(desktopIcon) {
        switch(desktopIcon.icon) {
            case this.iconTypes.folder:
                Emitter(desktopIcon, this.state, this.iconTypes.file, 1000);
                break;

            case this.iconTypes.appStore:
                Consumer(desktopIcon, this.state, this.iconTypes.file, 1000, 100);
                break;

            case this.iconTypes.hdd:
                this.state.hddSize += 10;
                break;

            default:
                console.log('Unimplemented Icon!');
                break;
        }
    }

    getRandomPositionOnScreen = () => {
        return {
            x: Math.floor(Math.random() * this.screen.width),
            y: Math.floor(Math.random() * this.screen.height),
        }
    }
}

export default Game;
