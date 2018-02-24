import React, { Component } from 'react';

import Game from './game/Game';
import DesktopIconContainer from './components/DesktopIconContainer';
import MenuBar from './components/MenuBar';

class RewriteApp extends Component {

    state = {
        desktopIcons: []
    }

    constructor(props) {
        super(props);

        this.game = new Game(this);
        this.game.init();
        window.game = this.game;
    }

    render() {
        const {desktopIcons, money, hddSize} = this.state;
        const hdd = {
            current: desktopIcons.length,
            max: hddSize
        }

        return (
            <div>
                <MenuBar
                    money={money}
                    createButtons={[
                        {
                            icon: this.game.iconTypes.folder,
                            price: 10
                        },
                        {
                            icon: this.game.iconTypes.appStore,
                            price: 20
                        },
                        {
                            icon: this.game.iconTypes.hdd,
                            price: 50
                        }
                    ]}
                    purchaseDesktopIcon={this.game.purchaseDesktopIcon}
                    hdd={hdd}
                />
                <DesktopIconContainer
                    desktopIcons = {desktopIcons}
                    updateDesktopIconPosition={this.game.state.updateDesktopIconPosition}
                />
            </div>
        )
    }

}

export default RewriteApp;
