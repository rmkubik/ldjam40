import React from 'react';
import Draggable from 'react-draggable';
import '../App.css';

class DesktopIcon extends React.Component {
    render() {
        return (
            <Draggable>
                <p style = {{
                        left: this.props.position ? this.props.position.x : 0,
                        top: this.props.position ? this.props.position.y : 0
                    }}
                    className={"icon"}
                >
                    {this.props.icon}
                </p>
            </Draggable>
        )
    }
}

export default DesktopIcon;