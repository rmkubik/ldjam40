import React, { Component } from 'react';

import Game from './game/Game';

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
                {desktopIcons.map(desktopIcon => <p>{desktopIcon.icon}</p>)}
            </div>
        )
    }

}

export default RewriteApp;
