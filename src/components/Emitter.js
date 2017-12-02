import React from 'react';
import Draggable from 'react-draggable';

import DesktopIcon from './DesktopIcon';

class Emitter extends DesktopIcon {
    constructor() {
        super();
    }
    // render() {
    //     return (
    //         <Draggable>
    //             <p style={{fontSize: "32px", position: "absolute"}}>{this.props.icon}</p>
    //         </Draggable>
    //     )
    // }
}

export default Emitter;