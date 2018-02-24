import Consumer from './Consumer';
import DesktopIcon from './DesktopIcon';
import Emitter from './Emitter';
import Game from './Game';
import GameState from './GameState';

import {consumerOnCooldown, consumerOffCooldown,
    emitterOnCooldown, emitterOffCooldown} from './TestHelpers';

let game;

beforeEach(() => {
    game = new Game();
});

it('should have state object', () => {
    expect(game.state).toEqual(expect.any(GameState));
});

it('should have icon types', () => {
    expect(game.iconTypes).toEqual(expect.anything());
});

describe('init game function', () => {
    it('should start the game with 3 icons', () => {
        game.init();

        expect(game.state.desktopIcons.length).toEqual(3);
    });
});

describe('update function', () => {
    it('should call emit on all desktopIcons in the state that have emit functions', () => {
        game.state.createDesktopIcon(game.iconTypes.folder, {x: 0, y: 0});

        Emitter(game.state.desktopIcons[0], game.state, game.iconTypes.file);
        const iconEmitSpy = jest.spyOn(game.state.desktopIcons[0], 'emit');

        game.update();

        expect(iconEmitSpy).toHaveBeenCalledTimes(1);
    });

    it('should call consume on all desktopIcons in the state that have emit functions', () => {
        game.state.createDesktopIcon(game.iconTypes.folder, {x: 0, y: 0});

        Consumer(game.state.desktopIcons[0], game.state.desktopIcons, game.iconTypes.file);
        const iconConsumeSpy = jest.spyOn(game.state.desktopIcons[0], 'consume');

        game.update();

        expect(iconConsumeSpy).toHaveBeenCalledTimes(1);
        expect(iconConsumeSpy).toBeCalledWith(game.state.desktopIcons);
    });

    it('should invoke the setState function', () => {
        const rootComponent = {};
        rootComponent.setState = jest.fn();
        game = new Game(rootComponent)

        game.update();

        expect(rootComponent.setState).toHaveBeenCalledTimes(1);
    });
});

describe('get react state function', () => {
    it('should return necessary pieces of game state', () => {
        const initialState = {
            desktopIcons: [...game.state.desktopIcons],
            money: game.state.money,
            hddSize: game.state.hddSize
        };

        const state = game.getReactState();

        expect(state).toEqual(initialState);
    });
});

describe('set desktop icon position', () => {
    it('should set posiiton of an icon', () => {
        game.state.createDesktopIcon(game.iconTypes.folder, {x: 0, y: 0});
        const desktopIcon = game.state.desktopIcons[0];
        const newPosition = { x: 100, y: 100 };

        game.state.updateDesktopIconPosition(desktopIcon.id, newPosition);

        expect(desktopIcon.position).toEqual(newPosition);
    });
});

describe('Consumer Integrations', () => {
    it('should remove consumed icon from state and increment money after second consume', () => {
        game.createAppStore({x: 0, y: 0});
        game.state.createDesktopIcon(game.iconTypes.file, {x: 0, y: 0});
        game.state.createDesktopIcon(game.iconTypes.file, {x: 0, y: 0});

        consumerOffCooldown(game.state.desktopIcons[0]);
        game.update();

        expect(game.state.desktopIcons.length).toBe(2);
        expect(game.state.money).toBe(0);

        consumerOffCooldown(game.state.desktopIcons[0]);
        game.update();

        expect(game.state.desktopIcons.length).toBe(1);
        expect(game.state.money).toBe(1);
    });
});

describe('Emitter Integrations', () => {
    it('should add spawned icon to state', () => {
        const folder = game.state.createDesktopIcon(game.iconTypes.folder, {x: 0, y: 0});

        Emitter(folder, game.iconTypes.file, 0, (spawnedIcon, position) => {
            game.state.createDesktopIcon(spawnedIcon, position);
        });

        game.update();

        expect(game.state.desktopIcons.length).toBe(2);
    });
});
