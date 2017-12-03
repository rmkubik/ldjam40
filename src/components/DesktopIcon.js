import React from 'react';
import Draggable from 'react-draggable';
import '../App.css';

class DesktopIcon extends React.Component {
    render() {
        const onDrag = this.props.onDrag ? (e, data) => { this.props.onDrag(this.props.id, {x: data.x, y: data.y})} : undefined;

        return (
            <Draggable onDrag={onDrag}>
                <p style = {{
                        left: this.props.initialPosition.x,
                        top: this.props.initialPosition.y
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