import React, { Component } from 'react';

import Game from './game/Game';
import DesktopIcon from './components/DesktopIcon';

class RewriteApp extends Component {

    state = {
        desktopIcons: []
    }

    constructor(props) {
        super(props);

        const game = new Game(this);
        game.init();
    }

    render() {
        const {desktopIcons} = this.state;

        return (
            <div>
                {desktopIcons.map(desktopIcon => <DesktopIcon
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
