import React from 'react';
import Draggable from 'react-draggable';

import DesktopIcon from './DesktopIcon';

class ConsumerEmitter extends React.Component {
    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.props.consumeCallback) {
                this.props.consumeCallback(
                    this.props.consumedIcon,
                    this.props.findPosition(),
                    this.props.range
                )
            }

            if (
                this.props.spawnCallback &&
                this.props.consumed % this.props.spawnThreshold >= this.props.spawnThreshold
            ) {
                const position = this.props.findPosition();
                if (position === undefined) return;
                this.props.spawnCallback(
                    this.props.spawnedIcon,
                    position
                )
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <DesktopIcon {...this.props}/>
        );
    }
}

export default ConsumerEmitter;
