import Game from './Game';
import GameState from './GameState';
import DesktopIcon from './DesktopIcon';

const game = new Game();

it('should have state object', () => {
  expect(game.state).toEqual(expect.any(GameState));
});

describe('create desktop icon function', () => {
    it('should return a DesktopIcon', () => {
        const icon = "test";
        const position = {x: 0, y: 0};
        const desktopIcon = game.createDesktopIcon(icon, position);
        
        expect(desktopIcon).toEqual(expect.any(DesktopIcon));
        expect(desktopIcon.icon).toEqual(icon);
        expect(desktopIcon.position).toEqual(position);
    });
});
