import DesktopIcon from './DesktopIcon';

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

    createDesktopIcon = (icon, position) => {
        let desktopIcon;
        if (this.desktopIcons.length < this.hddSize) {
            desktopIcon = new DesktopIcon(icon, position, this.getNextIconId());
            this.desktopIcons = [
                  ...this.desktopIcons,
                  desktopIcon
            ];
        }
        return desktopIcon;
    }

    removeDesktopIcon(id) {
        const index = this.findDesktopIconIndexById(id);

        this.removeDesktopIconByIndex(index);
    }

    setDesktopIconDestroyed(id) {
        const index = this.findDesktopIconIndexById(id);

        this.desktopIcons[index].destroyed = true;
    }

    removeDesktopIconByIndex(index) {
        if (index === -1) return;

        this.desktopIcons = [
          ...this.desktopIcons.slice(0, index),
          ...this.desktopIcons.slice(index + 1)
        ];
    }

    findDesktopIconIndexById(id) {
        return this.desktopIcons.findIndex((desktopIcon) => {
            return desktopIcon.id === id;
        });
    }

    updateDesktopIconPosition = (id, position) => {
        this.desktopIcons[this.findDesktopIconIndexById(id)].position = position;
    }
}

export default GameState;
