class DesktopIcon {
    
    icon;
    position;
    initialPosition;
    id;
    destroyed;
    consumed;

    constructor(icon, initialPosition, id) {
        this.icon = icon;
        this.position = initialPosition;
        this.initialPosition = initialPosition;
        this.id = id;
        this.destroyed = false;
        this.consumed = 0;
    }
}

export default DesktopIcon;
