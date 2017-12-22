import React from 'react';
import Draggable from 'react-draggable';

import DesktopIcon from './DesktopIcon';

class Emitter extends React.Component { 
     componentDidMount() {
        this.spawner = setInterval(() => { 
            const position = this.props.findPosition();
            if (position === undefined) return;
            this.props.spawnCallback(
                this.props.spawnedIcon, 
                position
            ) 
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.spawner);
    }

    render() {
        return (
            <DesktopIcon {...this.props}/>
        );
    }
}

export default Emitter;