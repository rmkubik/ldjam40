import DesktopIcon from './DesktopIcon';
import Emitter from './Emitter';
import Game from './Game';
import GameState from './GameState';

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
    it('should start the game with 2 icons', () => {
        game.init();

        expect(game.state.desktopIcons.length).toEqual(2);
    });
});

describe('update function', () => {
    it('should call emit on all desktopIcons in the state that have emit functions', () => {
        game.init();

        Emitter(game.state.desktopIcons[0], game.state, game.iconTypes.file);
        const iconEmitSpy = jest.spyOn(game.state.desktopIcons[0], 'emit');

        game.update();

        expect(iconEmitSpy).toHaveBeenCalled();
    });
});
