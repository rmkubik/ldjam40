import React, { Component } from 'react';

import Game from './game/Game';
import DesktopIconContainer from './components/DesktopIconContainer';

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
            <DesktopIconContainer
                desktopIcons = {desktopIcons}
                updateDesktopIconPosition={this.game.state.updateDesktopIconPosition}
            />
        )
    }

}

export default RewriteApp;
