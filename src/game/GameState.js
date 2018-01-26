class GameState {

    desktopIcons = [];
    nextIconId = 0;
    money = 0;
    hddSize = 10;

    constructor() {
        Object.seal(this);
    }
}

export default GameState;
