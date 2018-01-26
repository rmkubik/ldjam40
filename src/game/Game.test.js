import Game from './Game';
import GameState from './GameState';

const game = new Game();

it('should have state object', () => {
  expect(game.state).toEqual(expect.any(GameState));
});

describe('create desktop icon function', () => {
    it('should return an object', () => {
        expect(game.createDesktopIcon()).toEqual(expect.any(DesktopIcon));
    });
});
