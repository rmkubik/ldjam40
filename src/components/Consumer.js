import React from 'react';
import Draggable from 'react-draggable';

import DesktopIcon from './DesktopIcon';

class Consumer extends React.Component { 
    componentDidMount() {
        setInterval(() => { 
            // do the callback
            // set the state to be exiting
            // once animation is done call remove from state
            this.props.consumeCallback(
                this.props.consumedIcon, 
                this.props.findPosition(), 
                this.props.range
            ) 
        }, 1000);
    }

    render() {
        return (
            <DesktopIcon {...this.props}/>
        );
    }
}

export default Consumer;