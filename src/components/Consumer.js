import React from 'react';
import Draggable from 'react-draggable';

import DesktopIcon from './DesktopIcon';

class Consumer extends React.Component {
    componentDidMount() {
        setInterval(() => { 
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