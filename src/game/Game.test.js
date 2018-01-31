import Game from './Game';
import GameState from './GameState';
import DesktopIcon from './DesktopIcon';

let game;

beforeEach(() => {
    game = new Game();
})

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
