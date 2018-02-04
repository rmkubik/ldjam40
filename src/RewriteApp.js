import React, { Component } from 'react';

import Game from './game/Game';

class RewriteApp extends Component {

    constructor() {
        super();
        
        const game = new Game();
        game.init();
    }

    render() {
        return (
            <div></div>
        )
    }

}

export default RewriteApp;
