import React from 'react';
import Draggable from 'react-draggable';

import DesktopIcon from './DesktopIcon';

class Emitter extends DesktopIcon { 
    componentDidMount() {
        setInterval(this.props.spawnCallback, 1000);
    }
}

export default Emitter;