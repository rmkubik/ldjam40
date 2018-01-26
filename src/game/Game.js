class Game {
    tickLength = 30;

    state = {
      desktopIcons: [],
      nextIconId: 0,
      money: 0,
      hddSize: 10
    }

    constructor() {
        this.loop = setInterval(this.update, this.tickLength);
        this.createDesktopIcon();
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
