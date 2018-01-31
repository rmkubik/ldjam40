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

    createDesktopIcon(icon, position) {
        this.desktopIcons = [
              ...this.desktopIcons,
              new DesktopIcon(icon, position, this.getNextIconId())
        ];
    }

    removeDesktopIcon(id) {
        const iconIndex = this.findDesktopIconIndexById(id);

        if (iconIndex === -1) return;

        this.desktopIcons = [
          ...this.desktopIcons.slice(0, iconIndex),
          ...this.desktopIcons.slice(iconIndex + 1)
        ];
    }

    findDesktopIconIndexById(id) {
        return this.desktopIcons.findIndex((desktopIcon) => {
            return desktopIcon.id === id;
        });
    }
}

export default GameState;
