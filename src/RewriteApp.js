import React, { Component } from 'react';

import Game from './game/Game';

class RewriteApp extends Component {

    constructor(props) {
        super(props);

        const game = new Game(this);
        game.init();
    }

    render() {
        return (
            <div></div>
        )
    }

}

export default RewriteApp;
