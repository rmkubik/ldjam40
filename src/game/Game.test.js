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

describe('create desktop icon function', () => {
    it('should add a correctly populated DesktopIcon to game state', () => {
        const icon = "test";
        const position = {x: 0, y: 0};

        game.createDesktopIcon(icon, position);

        const desktopIcon = game.state.desktopIcons[0];
        expect(desktopIcon).toEqual(expect.any(DesktopIcon));
        expect(desktopIcon.icon).toEqual(icon);
        expect(desktopIcon.position).toEqual(position);
    });
});
