import React from 'react';
import Draggable from 'react-draggable';

class Icon extends React.Component {
    render() {
        return (
            <Draggable>
                <p style={{fontSize: "32px"}}>📃</p>
            </Draggable>
        )
    }
}

export default Icon;