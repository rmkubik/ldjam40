class Game {
    tickLength = 1000;
    state = {
      desktopIcons: [],
      nextIconId: 0,
      money: 0,
      hddSize: 10
    }

    constructor() {
        this.loop = setInterval(this.update, 1000);
    }

    update() {
        // update every icon

        // render new state
    }
}
