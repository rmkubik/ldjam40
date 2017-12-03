import React from 'react';
import Draggable from 'react-draggable';

import DesktopIcon from './DesktopIcon';

class Emitter extends DesktopIcon { 
    componentDidMount() {
        setInterval(() => { this.props.spawnCallback(this.props.spawnedIcon, this.props.initialPosition) }, 1000);
    }
}

export default Emitter;