import React from 'react';
import Draggable from 'react-draggable';

class DesktopIcon extends React.Component {
    render() {
        return (
            <Draggable>
                <p style = {{
                        fontSize: "32px", 
                        position: "absolute", 
                        left: this.props.position ? this.props.position.x : 0,
                        top: this.props.position ? this.props.position.y : 0
                    }}
                >
                    {this.props.icon}
                </p>
            </Draggable>
        )
    }
}

export default DesktopIcon;