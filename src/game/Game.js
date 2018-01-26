import GameState from './GameState'

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
        console.log('create icon test');
    }
}

export default Game;
