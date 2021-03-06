import React from 'react';
import Draggable from 'react-draggable';
import { CSSTransition } from 'react-transition-group'
import '../App.css';

const fadeTimeout = 150;

const Fade = ({ children, ...props }) => (
    <CSSTransition
      {...props}
      timeout={fadeTimeout}
      classNames="spawn"
    >
      {children}
    </CSSTransition>
  );

class DesktopIcon extends React.Component {

    state = {
        show: false
    }

    componentDidMount = () => {
        this.setState({ show: true });
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.destroyIcon === true) {
            this.setState({ show: false });
            // destroy icon after exit animation finishes
            setTimeout(() => {
                this.props.destroyIconCallback(this.props.id);
            }, fadeTimeout);
        }
    }

    render() {
        const onDrag = this.props.onDrag
            ? (e, data) => {
                this.props.onDrag(this.props.id, {
                    x: data.x,
                    y: data.y
                });
            }
            : undefined;

        return (
            <Draggable onDrag={onDrag} defaultPosition={this.props.initialPosition}>
                <div>
                    <Fade in={this.state.show}>
                        <p className={"icon"}>
                            {this.props.icon}
                        </p>
                    </Fade>
                </div>
            </Draggable>
        )
    }
}

DesktopIcon.defaultProps = {
    destroyIcon: false
}

export default DesktopIcon;
