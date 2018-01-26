import GameState from './GameState';
import DesktopIcon from './DesktopIcon';

class Game {

    tickLength = 30;
    state;
    loop;

    constructor() {
        this.state = new GameState();
        // this.createDesktopIcon();
        // this.createDesktopIcon();

        this.loop = setInterval(this.update, this.tickLength);
    }

    update() {
        // update every icon

        // render new state
    }

    createDesktopIcon(icon, position) {
        const {desktopIcons} = this.state;

        this.state.desktopIcons = [
              ...desktopIcons,
              new DesktopIcon(icon, position)
        ];
    }
}

export default Game;
