import React from 'react';
import Draggable from 'react-draggable';

import DesktopIcon from './DesktopIcon';

class Consumer extends DesktopIcon { 
    componentDidMount() {
        setInterval(() => { 
            this.props.consumeCallback(
                this.props.consumedIcon, 
                this.props.initialPosition, 
                this.props.range
            ) 
        }, 1000);
    }
}

export default Consumer;