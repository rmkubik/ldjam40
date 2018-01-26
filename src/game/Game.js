import GameState from './GameState';
import DesktopIcon from './DesktopIcon';

class Game {

    tickLength = 30;
    state;
    loop;

    constructor() {
        this.state = new GameState();
        this.createDesktopIcon();
        this.createDesktopIcon();

        this.loop = setInterval(this.update, this.tickLength);
    }

    update() {
        // update every icon

        // render new state
    }

    createDesktopIcon() {
        return new DesktopIcon();
    }
}

export default Game;
