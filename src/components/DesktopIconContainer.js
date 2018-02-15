import React from 'react';

import DesktopIcon from './DesktopIcon';

class DesktopIconContainer extends React.Component {

    state = {
        desktopIcons: [],
        destroyedIcons: []
    }

    componentDidMount() {
        this.setState({
            desktopIcons: this.props.desktopIcons
        })
    }

    // start the animations on the props below for when they're removed
    // have them set their own timeouts to remove themselves
    // from this components state.

    componentWillReceiveProps(nextProps) {
        // if nextProps has icon that state icons doesn't have
        // start the exit animation
        let newlyDestroyedIcons = [];
        this.state.desktopIcons.forEach((icon) => {
            const isIconAlive = nextProps.desktopIcons.some((newIcon) => {
                return icon.id === newIcon.id;
            });
            if (!isIconAlive) newlyDestroyedIcons.push(icon);
        });

        // this will still remove out destroyed icons from state...
        // somehow we need to make sure the destroyed icons stay in
        // the state until their animations are finished. Separate
        // destroyedIcons array? Insert the destroyedIcons on the
        // end of the desktopIcons array?
        this.setState({
            desktopIcons: [...nextProps.desktopIcons],
            destroyedIcons: [...this.state.destroyedIcons, ...newlyDestroyedIcons]
        });
    }

    removeIconFromDestroyedState = (id) => {
        // pass this function to DesktopIcon
        // it needs to allow the icon to notify the Container that it is
        // done with its animation
        const index = this.state.destroyedIcons.findIndex((desktopIcon) => {
            return desktopIcon.id === id;
        });

        if (index === -1) return;

        this.setState((prevState) => {
            const {destroyedIcons} = prevState;
            return {
                destroyedIcons: [
                    ...destroyedIcons.slice(0, index),
                    ...destroyedIcons.slice(index + 1)
                ]
            }
        });
    }

    render() {
        const {desktopIcons, destroyedIcons} = this.state;

        return  (
            <div>
                {desktopIcons.map(desktopIcon => <DesktopIcon
                    onDrag={this.props.updateDesktopIconPosition}
                    icon={desktopIcon.icon}
                    initialPosition={desktopIcon.initialPosition}
                    key={desktopIcon.id}
                    id={desktopIcon.id}
                />)}
                {destroyedIcons.map(desktopIcon => <DesktopIcon
                    onDrag={this.props.updateDesktopIconPosition}
                    icon={desktopIcon.icon}
                    destroyIcon={true}
                    destroyIconCallback={this.removeIconFromDestroyedState}
                    initialPosition={desktopIcon.position}
                    key={desktopIcon.id}
                    id={desktopIcon.id}
                />)}
            </div>
        )
    }
}

export default DesktopIconContainer;
