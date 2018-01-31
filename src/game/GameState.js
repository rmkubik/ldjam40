class GameState {

    desktopIcons = [];
    _nextIconId = 0;
    money = 0;
    hddSize = 10;

    constructor() {
        Object.seal(this);
    }

    getNextIconId() {
        return this._nextIconId++;
    }
}

export default GameState;
