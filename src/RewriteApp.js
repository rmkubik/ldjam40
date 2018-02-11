import React, { Component } from 'react';

import Game from './game/Game';
import DesktopIcon from './components/DesktopIcon';

class RewriteApp extends Component {

    state = {
        desktopIcons: []
    }

    constructor(props) {
        super(props);

        this.game = new Game(this);
        this.game.init();
    }

    render() {
        const {desktopIcons} = this.state;

        return (
            <div>
                {desktopIcons.map(desktopIcon => <DesktopIcon
                    onDrag={this.game.state.updateDesktopIconPosition}
                    icon={desktopIcon.icon}
                    initialPosition={desktopIcon.initialPosition}
                    key={desktopIcon.id}
                    id={desktopIcon.id}
                />)}
            </div>
        )
    }

}

export default RewriteApp;
